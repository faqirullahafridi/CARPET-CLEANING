import { CONTACT } from "./contact-info";
import { logger } from "./logger";

interface SendTextOptions {
  chatId: string;
  text: string;
  session?: string;
}

function getWahaConfig() {
  const baseUrl = process.env.WAHA_BASE_URL?.replace(/\/+$/, "");
  const apiKey = process.env.WAHA_API_KEY;
  const session = process.env.WAHA_SESSION || "default";
  const adminChatId =
    process.env.WAHA_ADMIN_CHAT_ID || `${CONTACT.whatsappNumber}@c.us`;

  return { baseUrl, apiKey, session, adminChatId };
}

export function isWahaConfigured(): boolean {
  const { baseUrl, apiKey } = getWahaConfig();
  return Boolean(baseUrl && apiKey);
}

export async function sendWhatsAppText({
  chatId,
  text,
  session,
}: SendTextOptions): Promise<void> {
  const { baseUrl, apiKey, session: defaultSession } = getWahaConfig();

  if (!baseUrl || !apiKey) {
    logger.warn("WAHA not configured — skipping WhatsApp send");
    return;
  }

  const response = await fetch(`${baseUrl}/api/sendText`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      chatId,
      text,
      session: session ?? defaultSession,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`WAHA sendText failed (${response.status}): ${body}`);
  }
}

export async function sendWhatsAppToAdmin(text: string): Promise<void> {
  const { adminChatId } = getWahaConfig();
  await sendWhatsAppText({ chatId: adminChatId, text });
}
