export interface ChatRequestBody {
  message: string;
  sessionId: string;
}

export interface AgentRequestBody {
  chatInput: string;
  sessionId: string;
}

export interface AgentResponse {
  text: string;
  raw: unknown;
}

export interface AgentClient {
  sendMessage(body: AgentRequestBody): Promise<AgentResponse>;
}
