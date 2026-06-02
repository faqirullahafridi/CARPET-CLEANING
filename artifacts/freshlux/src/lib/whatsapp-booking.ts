import { CONTACT } from "./contact-info";

const WHATSAPP_BASE = `https://wa.me/${CONTACT.whatsappNumber}`;

export interface BookingWhatsAppPayload {
  serviceName: string;
  propertyType: string;
  postcode: string;
  address: string;
  items: Array<{ name: string; quantity: number }>;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  bookingNumber?: string;
}

export function buildBookingWhatsAppMessage(data: BookingWhatsAppPayload): string {
  const itemsText =
    data.items.length > 0
      ? data.items.map((item) => `- ${item.quantity}x ${item.name}`).join("\n")
      : "- No specific items selected";

  const lines = [
    "New Carpet Cleaning Booking Request",
    "",
    data.bookingNumber ? `Reference: ${data.bookingNumber}` : null,
    `Service: ${data.serviceName}`,
    `Property: ${data.propertyType}`,
    "",
    "Address:",
    data.address,
    data.postcode,
    "",
    "Items:",
    itemsText,
    "",
    `Preferred date: ${data.date}`,
    `Time slot: ${data.timeSlot}`,
    "",
    "Customer details:",
    `Name: ${data.customerName}`,
    `Phone: ${data.customerPhone}`,
    `Email: ${data.customerEmail}`,
    data.notes ? `\nNotes: ${data.notes}` : null,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

export function openWhatsAppWithMessage(message: string): void {
  window.open(
    `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function openWhatsAppChat(message?: string): void {
  if (message) {
    openWhatsAppWithMessage(message);
    return;
  }
  window.open(WHATSAPP_BASE, "_blank", "noopener,noreferrer");
}
