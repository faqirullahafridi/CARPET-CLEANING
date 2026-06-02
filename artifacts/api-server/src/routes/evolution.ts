import { Router } from "express";
import {
  getEvolutionHealth,
  isEvolutionConfigured,
  sendWhatsAppToAdmin,
} from "../lib/evolution-api";

const router = Router();

router.get("/evolution/status", async (_req, res) => {
  const health = await getEvolutionHealth();
  res.json(health);
});

router.post("/evolution/test", async (req, res) => {
  if (!isEvolutionConfigured()) {
    res.status(503).json({
      error: "Evolution API not configured. Set EVOLUTION_BASE_URL, EVOLUTION_API_KEY, and EVOLUTION_INSTANCE.",
    });
    return;
  }

  const testKey = process.env.EVOLUTION_TEST_KEY;
  if (testKey && req.header("x-evolution-test-key") !== testKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const text =
      typeof req.body?.text === "string" && req.body.text.trim()
        ? req.body.text.trim()
        : "Evolution API test message from Carpet Cleaning website API";

    await sendWhatsAppToAdmin(text);
    res.json({ ok: true, message: "Test WhatsApp sent to admin number" });
  } catch (err) {
    req.log.error({ err }, "Evolution test send failed");
    res.status(502).json({
      error: err instanceof Error ? err.message : "Evolution test send failed",
    });
  }
});

export default router;
