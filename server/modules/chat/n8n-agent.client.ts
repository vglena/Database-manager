import type { AgentClient, AgentRequestBody, AgentResponse } from "./chat.types.js";

export class N8nAgentClient implements AgentClient {
  constructor(private readonly webhookUrl?: string) {}

  async sendMessage(body: AgentRequestBody): Promise<AgentResponse> {
    if (!this.webhookUrl) {
      throw new Error("N8N_WEBHOOK_URL no está configurado en el backend.");
    }

    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createN8nWebhookBody(body))
    });

    const rawResponse = await readAgentResponse(response);

    if (!response.ok) {
      throw new Error(`n8n respondió con estado ${response.status}.`);
    }

    return {
      raw: rawResponse,
      text: extractAgentText(rawResponse)
    };
  }
}

function createN8nWebhookBody(body: AgentRequestBody): Record<string, string> {
  return {
    chatInput: body.chatInput,
    message: body.chatInput,
    sessionId: body.sessionId
  };
}

async function readAgentResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  const responseText = await response.text();

  if (!responseText.trim()) {
    return "";
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(responseText);
  }

  return responseText;
}

function extractAgentText(rawResponse: unknown): string {
  if (typeof rawResponse === "string") {
    return rawResponse;
  }

  if (!isRecord(rawResponse)) {
    return "";
  }

  const knownTextFields = ["text", "output", "response", "message", "content"];

  for (const field of knownTextFields) {
    const value = rawResponse[field];

    if (typeof value === "string") {
      return value;
    }
  }

  return JSON.stringify(rawResponse, null, 2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
