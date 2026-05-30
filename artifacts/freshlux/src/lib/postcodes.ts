const API_BASE = "https://api.postcodes.io";
const OVERPASS_URL = "/overpass";
const NOMINATIM_URL = "/nominatim";

export interface PostcodeLookupResult {
  postcode: string;
  adminDistrict: string | null;
  adminCounty: string | null;
  adminWard: string | null;
  region: string | null;
  country: string | null;
  parish: string | null;
  bua: string | null;
  latitude: number;
  longitude: number;
}

export interface AddressSuggestion {
  line1: string;
  town: string | null;
  county: string | null;
  postcode: string;
  formatted: string;
}

interface PostcodeApiResult {
  postcode: string;
  admin_district?: string | null;
  admin_county?: string | null;
  admin_ward?: string | null;
  region?: string | null;
  country?: string | null;
  parish?: string | null;
  bua?: string | null;
  latitude: number;
  longitude: number;
}

interface NominatimAddress {
  house_number?: string;
  road?: string;
  suburb?: string;
  town?: string;
  city?: string;
  village?: string;
  county?: string;
  state?: string;
  postcode?: string;
}

function cleanParish(parish: string | null | undefined): string | null {
  if (!parish) return null;
  return parish.replace(/, unparished area$/i, "").trim() || null;
}

function mapResult(result: PostcodeApiResult): PostcodeLookupResult {
  return {
    postcode: result.postcode,
    adminDistrict: result.admin_district ?? null,
    adminCounty: result.admin_county ?? null,
    adminWard: result.admin_ward ?? null,
    region: result.region ?? null,
    country: result.country ?? null,
    parish: cleanParish(result.parish),
    bua: result.bua ?? null,
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

export function normalizePostcodeInput(value: string): string {
  return value.toUpperCase().replace(/\s+/g, " ").trim();
}

export function formatPostcodeLocation(result: PostcodeLookupResult): string {
  const parts = [result.adminWard, result.adminDistrict, result.region, result.country];
  return parts.filter(Boolean).join(", ");
}

function formatAddressParts(parts: {
  line1: string;
  town?: string | null;
  county?: string | null;
  postcode: string;
}): string {
  return [parts.line1, parts.town, parts.county, parts.postcode]
    .filter(Boolean)
    .join(", ");
}

export function buildAreaFallback(result: PostcodeLookupResult): AddressSuggestion {
  const line1 =
    result.adminWard ||
    result.parish ||
    result.bua ||
    result.adminDistrict ||
    "Address in postcode area";
  const town = result.adminDistrict || result.bua || result.region;
  const county = result.adminCounty || result.region;

  return {
    line1,
    town,
    county,
    postcode: result.postcode,
    formatted: formatAddressParts({
      line1,
      town,
      county,
      postcode: result.postcode,
    }),
  };
}

function parseOsmTags(
  tags: Record<string, string>,
  fallbackPostcode: string,
): AddressSuggestion | null {
  const houseNumber = tags["addr:housenumber"]?.trim();
  const street =
    tags["addr:street"]?.trim() ||
    tags["addr:place"]?.trim() ||
    tags["addr:hamlet"]?.trim();

  let line1 = [houseNumber, street].filter(Boolean).join(" ");
  if (!line1 && tags.name) line1 = tags.name.trim();
  if (!line1) return null;

  const town =
    tags["addr:city"]?.trim() ||
    tags["addr:town"]?.trim() ||
    tags["addr:village"]?.trim() ||
    tags["addr:suburb"]?.trim() ||
    null;
  const county = tags["addr:county"]?.trim() || tags["addr:state"]?.trim() || null;
  const postcode = normalizePostcodeInput(
    tags["addr:postcode"]?.trim() || fallbackPostcode,
  );

  return {
    line1,
    town,
    county,
    postcode,
    formatted: formatAddressParts({ line1, town, county, postcode }),
  };
}

function parseNominatimAddress(
  address: NominatimAddress,
  fallbackPostcode: string,
): AddressSuggestion | null {
  const line1 = [address.house_number, address.road].filter(Boolean).join(" ");
  if (!line1) return null;

  const town =
    address.city || address.town || address.village || address.suburb || null;
  const county = address.county || address.state || null;
  const postcode = normalizePostcodeInput(
    address.postcode?.trim() || fallbackPostcode,
  );

  return {
    line1,
    town,
    county,
    postcode,
    formatted: formatAddressParts({ line1, town, county, postcode }),
  };
}

function houseNumberSortKey(line1: string): number {
  const match = line1.match(/^(\d+)/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function dedupeAddresses(addresses: AddressSuggestion[]): AddressSuggestion[] {
  const seen = new Set<string>();
  return addresses.filter((address) => {
    const key = address.formatted.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortAddresses(addresses: AddressSuggestion[]): AddressSuggestion[] {
  return [...addresses].sort((a, b) => {
    const streetCompare = a.line1.replace(/^\d+\s*/, "").localeCompare(
      b.line1.replace(/^\d+\s*/, ""),
    );
    if (streetCompare !== 0) return streetCompare;
    return houseNumberSortKey(a.line1) - houseNumberSortKey(b.line1);
  });
}

async function fetchOverpassAddresses(postcode: string): Promise<AddressSuggestion[]> {
  const query = `[out:json][timeout:25];(node["addr:postcode"="${postcode}"];way["addr:postcode"="${postcode}"];relation["addr:postcode"="${postcode}"];);out tags;`;

  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    body: query,
  });

  if (!res.ok) return [];

  const data = (await res.json()) as {
    elements?: Array<{ tags?: Record<string, string> }>;
  };

  return (data.elements ?? [])
    .map((element) => parseOsmTags(element.tags ?? {}, postcode))
    .filter((address): address is AddressSuggestion => address !== null);
}

async function fetchReverseGeocodeAddress(
  latitude: number,
  longitude: number,
  postcode: string,
): Promise<AddressSuggestion | null> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "json",
    addressdetails: "1",
    zoom: "18",
  });

  const res = await fetch(`${NOMINATIM_URL}/reverse?${params}`);
  if (!res.ok) return null;

  const data = (await res.json()) as { address?: NominatimAddress };
  if (!data.address) return null;

  const parsed = parseNominatimAddress(data.address, postcode);
  if (parsed) return parsed;

  return null;
}

async function fetchAddressesLocally(
  result: PostcodeLookupResult,
): Promise<AddressSuggestion[]> {
  const variants = [
    result.postcode,
    result.postcode.replace(/\s/g, ""),
  ].filter((value, index, array) => array.indexOf(value) === index);

  let addresses: AddressSuggestion[] = [];

  for (const variant of variants) {
    try {
      const found = await fetchOverpassAddresses(variant);
      addresses = [...addresses, ...found];
      if (addresses.length > 0) break;
    } catch {
      // try next variant / fallback
    }
  }

  if (addresses.length === 0) {
    try {
      const reverse = await fetchReverseGeocodeAddress(
        result.latitude,
        result.longitude,
        result.postcode,
      );
      if (reverse) addresses = [reverse];
    } catch {
      // fall through to area fallback
    }
  }

  if (addresses.length === 0) {
    addresses = [buildAreaFallback(result)];
  }

  return sortAddresses(deduplicateAddresses(addresses));
}

export async function fetchAddressesForPostcode(
  result: PostcodeLookupResult,
): Promise<AddressSuggestion[]> {
  try {
    const res = await fetch("/api/addresses/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    if (res.ok) {
      const data = (await res.json()) as { addresses?: AddressSuggestion[] };
      if (data.addresses?.length) return data.addresses;
    }
  } catch {
    // use local lookup below
  }

  if (import.meta.env.DEV) {
    try {
      return await fetchAddressesLocally(result);
    } catch {
      // local proxy lookup failed
    }
  }

  return [buildAreaFallback(result)];
}

export async function autocompletePostcodes(partial: string): Promise<string[]> {
  const cleaned = partial.replace(/\s/g, "");
  if (cleaned.length < 2) return [];

  const res = await fetch(
    `${API_BASE}/postcodes/${encodeURIComponent(cleaned)}/autocomplete`,
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { result?: string[] };
  return data.result ?? [];
}

export async function lookupPostcode(
  postcode: string,
): Promise<PostcodeLookupResult | null> {
  const cleaned = postcode.replace(/\s/g, "");
  if (!cleaned) return null;

  const res = await fetch(
    `${API_BASE}/postcodes/${encodeURIComponent(cleaned)}`,
  );
  if (!res.ok) return null;

  const data = (await res.json()) as { result?: PostcodeApiResult };
  if (!data.result) return null;

  return mapResult(data.result);
}
