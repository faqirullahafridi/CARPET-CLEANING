export interface BookingWhatsAppPayload {
  serviceName: string;
  propertyType?: string | null;
  postcode: string;
  address: string;
  items: Array<{ name: string; quantity: number }>;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string | null;
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
    data.propertyType ? `Property: ${data.propertyType}` : null,
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

function normalizePhoneDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0") && digits.length === 11) {
    if (digits.startsWith("07")) {
      digits = `44${digits.slice(1)}`;
    } else if (digits.startsWith("03")) {
      digits = `92${digits.slice(1)}`;
    }
  }

  if (digits.length < 10) return null;

  return digits;
}

/** Evolution API expects digits with country code (e.g. 447533552015). */
export function normalizeEvolutionNumber(number: string): string {
  const trimmed = number.trim();
  if (trimmed.includes("@")) {
    return trimmed.split("@")[0].replace(/\D/g, "");
  }
  return trimmed.replace(/\D/g, "");
}

export function phoneToEvolutionNumber(phone: string): string | null {
  return normalizePhoneDigits(phone);
}
