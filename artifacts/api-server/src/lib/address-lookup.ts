const POSTCODES_IO = "https://api.postcodes.io";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const USER_AGENT = "CarpetCleaning/1.0 (address-lookup)";

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

function normalizePostcode(value: string): string {
  return value.toUpperCase().replace(/\s+/g, " ").trim();
}

function mapPostcodeResult(result: PostcodeApiResult): PostcodeLookupResult {
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

  return {
    line1,
    town,
    county,
    postcode: normalizePostcode(tags["addr:postcode"]?.trim() || fallbackPostcode),
    formatted: formatAddressParts({
      line1,
      town,
      county,
      postcode: normalizePostcode(tags["addr:postcode"]?.trim() || fallbackPostcode),
    }),
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
  const postcode = normalizePostcode(address.postcode?.trim() || fallbackPostcode);

  return {
    line1,
    town,
    county,
    postcode,
    formatted: formatAddressParts({ line1, town, county, postcode }),
  };
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

async function lookupPostcode(postcode: string): Promise<PostcodeLookupResult | null> {
  const cleaned = postcode.replace(/\s/g, "");
  const res = await fetch(`${POSTCODES_IO}/postcodes/${encodeURIComponent(cleaned)}`);
  if (!res.ok) return null;

  const data = (await res.json()) as { result?: PostcodeApiResult };
  if (!data.result) return null;

  return mapPostcodeResult(data.result);
}

async function fetchOverpassAddresses(postcode: string): Promise<AddressSuggestion[]> {
  const query = `[out:json][timeout:25];(node["addr:postcode"="${postcode}"];way["addr:postcode"="${postcode}"];relation["addr:postcode"="${postcode}"];);out tags;`;

  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: { "User-Agent": USER_AGENT },
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

  const res = await fetch(`${NOMINATIM_URL}/reverse?${params}`, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { address?: NominatimAddress };
  if (!data.address) return null;

  return parseNominatimAddress(data.address, postcode);
}

export async function lookupAddressesForPostcode(
  rawPostcode: string,
): Promise<{ postcode: PostcodeLookupResult | null; addresses: AddressSuggestion[] }> {
  let postcodeDetails: PostcodeLookupResult | null = null;

  try {
    postcodeDetails = await lookupPostcode(rawPostcode);
  } catch {
    return { postcode: null, addresses: [] };
  }

  if (!postcodeDetails) {
    return { postcode: null, addresses: [] };
  }

  const variants = [
    postcodeDetails.postcode,
    postcodeDetails.postcode.replace(/\s/g, ""),
  ].filter((value, index, array) => array.indexOf(value) === index);

  let addresses: AddressSuggestion[] = [];

  for (const variant of variants) {
    try {
      const found = await fetchOverpassAddresses(variant);
      addresses = [...addresses, ...found];
      if (addresses.length > 0) break;
    } catch {
      // Overpass unavailable — continue to fallbacks
    }
  }

  if (addresses.length === 0) {
    try {
      const reverse = await fetchReverseGeocodeAddress(
        postcodeDetails.latitude,
        postcodeDetails.longitude,
        postcodeDetails.postcode,
      );
      if (reverse) addresses = [reverse];
    } catch {
      // Nominatim unavailable — continue to area fallback
    }
  }

  if (addresses.length === 0) {
    addresses = [buildAreaFallback(postcodeDetails)];
  }

  return {
    postcode: postcodeDetails,
    addresses: sortAddresses(deduplicateAddresses(addresses)),
  };
}
