interface ChatApiResponse {
  text: string;
  raw: unknown;
}

export async function sendChatMessage(message: string, sessionId: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, sessionId })
  });

  const body = (await response.json()) as Partial<ChatApiResponse> & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(body.error ?? "No se pudo contactar con el agente.");
  }

  return body.text ?? "";
}
