import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { sendContactNotification } from "../lib/email";
import { respondWithDbError } from "../lib/db-errors";
import { fireContactWhatsAppNotification } from "../lib/booking-notifications";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email and message are required" });
      return;
    }

    await db.insert(contactsTable).values({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });

    sendContactNotification({ name, email, phone, subject, message }).catch((err) =>
      req.log.error({ err }, "Failed to send contact notification")
    );

    fireContactWhatsAppNotification(
      { name, email, phone, subject, message },
      req.log,
    );

    res.json({ success: true, message: "Thank you for your enquiry. We will be in touch within 2 hours." });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact form");
    respondWithDbError(res, err);
  }
});

export default router;
