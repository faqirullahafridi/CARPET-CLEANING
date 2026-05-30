import { Router } from "express";
import { SERVICES, SERVICE_ITEMS } from "../lib/services-data";

const router = Router();

router.get("/services", (_req, res) => {
  res.json(SERVICES);
});

router.get("/services/:serviceId/items", (req, res) => {
  const { serviceId } = req.params;
  const items = SERVICE_ITEMS[serviceId];
  if (!items) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(items);
});

export default router;
