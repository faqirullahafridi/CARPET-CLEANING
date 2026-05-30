import { Router } from "express";
import {
  buildAreaFallback,
  lookupAddressesForPostcode,
  type PostcodeLookupResult,
} from "../lib/address-lookup";

const router = Router();

async function resolveAddresses(postcodeDetails: PostcodeLookupResult) {
  const result = await lookupAddressesForPostcode(postcodeDetails.postcode);

  if (result.postcode && result.addresses.length > 0) {
    return result;
  }

  return {
    postcode: postcodeDetails,
    addresses: [buildAreaFallback(postcodeDetails)],
  };
}

router.post("/addresses/lookup", async (req, res) => {
  const details = req.body as PostcodeLookupResult;

  if (
    !details?.postcode?.trim() ||
    typeof details.latitude !== "number" ||
    typeof details.longitude !== "number"
  ) {
    res.status(400).json({ error: "Invalid postcode data" });
    return;
  }

  try {
    const result = await resolveAddresses(details);
    res.json(result);
  } catch {
    res.json({
      postcode: details,
      addresses: [buildAreaFallback(details)],
    });
  }
});

router.get("/addresses/:postcode", async (req, res) => {
  const { postcode } = req.params;

  if (!postcode?.trim()) {
    res.status(400).json({ error: "Postcode is required" });
    return;
  }

  try {
    const result = await lookupAddressesForPostcode(postcode);

    if (!result.postcode) {
      res.status(404).json({ error: "Postcode not found" });
      return;
    }

    res.json(result);
  } catch {
    res.status(404).json({ error: "Postcode not found" });
  }
});

export default router;
