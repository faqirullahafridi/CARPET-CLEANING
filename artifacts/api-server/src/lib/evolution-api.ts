import { CONTACT } from "./contact-info";
import { logger } from "./logger";
import { normalizeEvolutionNumber } from "./whatsapp-message";

interface SendTextOptions {
  number: string;
  text: string;
  linkPreview?: boolean;
}

export interface EvolutionConnectionStatus {
  instanceName: string;
  state: string;
}

function getEvolutionConfig() {
  const baseUrl = process.env.EVOLUTION_BASE_URL?.replace(/\/+$/, "");
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_INSTANCE || "carpet-cleaning";
  const adminNumber = normalizeEvolutionNumber(
    process.env.EVOLUTION_ADMIN_NUMBER || CONTACT.phoneTel,
  );

  return { baseUrl, apiKey, instance, adminNumber };
}

export function isEvolutionConfigured(): boolean {
  const { baseUrl, apiKey, instance } = getEvolutionConfig();
  return Boolean(baseUrl && apiKey && instance);
}

export function getEvolutionAdminNumber(): string {
  return getEvolutionConfig().adminNumber;
}

async function evolutionFetch(path: string, init?: RequestInit): Promise<Response> {
  const { baseUrl, apiKey } = getEvolutionConfig();
  if (!baseUrl || !apiKey) {
    throw new Error("Evolution API is not configured");
  }

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apikey: apiKey,
      ...init?.headers,
    },
  });
}

/** GET /instance/connectionState/{instanceName} */
export async function getEvolutionConnectionStatus(): Promise<EvolutionConnectionStatus | null> {
  if (!isEvolutionConfigured()) {
    return null;
  }

  const { instance } = getEvolutionConfig();
  const response = await evolutionFetch(
    `/instance/connectionState/${encodeURIComponent(instance)}`,
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Evolution connection check failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as {
    instance?: { instanceName?: string; state?: string };
  };

  if (!data.instance?.state) {
    return null;
  }

  return {
    instanceName: data.instance.instanceName ?? instance,
    state: data.instance.state,
  };
}

/**
 * POST /message/sendText/{instanceName}
 * @see https://docs.evolutionfoundation.com.br/evolution-api/send-text-message
 */
export async function sendWhatsAppText({
  number,
  text,
  linkPreview = false,
}: SendTextOptions): Promise<void> {
  const { instance } = getEvolutionConfig();

  if (!isEvolutionConfigured()) {
    logger.warn("Evolution API not configured — skipping WhatsApp send");
    return;
  }

  const response = await evolutionFetch(
    `/message/sendText/${encodeURIComponent(instance)}`,
    {
      method: "POST",
      body: JSON.stringify({
        number: normalizeEvolutionNumber(number),
        textMessage: { text },
        linkPreview,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Evolution sendText failed (${response.status}): ${body}`);
  }
}

export async function sendWhatsAppToAdmin(text: string): Promise<void> {
  const { adminNumber } = getEvolutionConfig();
  await sendWhatsAppText({ number: adminNumber, text });
}

export async function getEvolutionHealth(): Promise<{
  configured: boolean;
  instance: string;
  connection: EvolutionConnectionStatus | null;
  adminNumber: string;
}> {
  const { instance, adminNumber } = getEvolutionConfig();

  if (!isEvolutionConfigured()) {
    return { configured: false, instance, connection: null, adminNumber };
  }

  try {
    const connection = await getEvolutionConnectionStatus();
    return { configured: true, instance, connection, adminNumber };
  } catch (err) {
    logger.warn({ err }, "Evolution health check failed");
    return { configured: true, instance, connection: null, adminNumber };
  }
}
