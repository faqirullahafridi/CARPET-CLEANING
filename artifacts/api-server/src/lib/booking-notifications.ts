import {
  buildBookingWhatsAppMessage,
  phoneToEvolutionNumber,
  type BookingWhatsAppPayload,
} from "./whatsapp-message";
import {
  isEvolutionConfigured,
  sendWhatsAppText,
  sendWhatsAppToAdmin,
} from "./evolution-api";

export async function notifyBookingViaWhatsApp(data: BookingWhatsAppPayload): Promise<void> {
  if (!isEvolutionConfigured()) {
    return;
  }

  const adminMessage = buildBookingWhatsAppMessage(data);
  await sendWhatsAppToAdmin(adminMessage);

  const customerNumber = phoneToEvolutionNumber(data.customerPhone);
  if (customerNumber) {
    const customerMessage = [
      `Hi ${data.customerName},`,
      "",
      "Thank you for booking with Carpet Cleaning.",
      data.bookingNumber ? `Reference: ${data.bookingNumber}` : null,
      `Service: ${data.serviceName}`,
      `Date: ${data.date}`,
      `Time: ${data.timeSlot}`,
      "",
      "We will confirm your appointment shortly. Pricing is discussed on-site.",
    ]
      .filter(Boolean)
      .join("\n");

    await sendWhatsAppText({ number: customerNumber, text: customerMessage });
  }
}

export async function notifyContactViaWhatsApp(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): Promise<void> {
  if (!isEvolutionConfigured()) {
    return;
  }

  const text = [
    "New website contact enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.subject ? `Subject: ${data.subject}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  await sendWhatsAppToAdmin(text);
}

export function fireBookingWhatsAppNotification(
  data: BookingWhatsAppPayload,
  log: { error: (obj: object, msg: string) => void },
): void {
  notifyBookingViaWhatsApp(data).catch((err) =>
    log.error({ err }, "Failed to send booking WhatsApp via Evolution API"),
  );
}

export function fireContactWhatsAppNotification(
  data: Parameters<typeof notifyContactViaWhatsApp>[0],
  log: { error: (obj: object, msg: string) => void },
): void {
  notifyContactViaWhatsApp(data).catch((err) =>
    log.error({ err }, "Failed to send contact WhatsApp via Evolution API"),
  );
}
