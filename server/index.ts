import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createChatRouter } from "./modules/chat/chat.routes.js";
import { N8nAgentClient } from "./modules/chat/n8n-agent.client.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use(
  "/api/chat",
  createChatRouter({
    agentClient: new N8nAgentClient(n8nWebhookUrl)
  })
);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    const message =
      error instanceof Error ? error.message : "Error inesperado del servidor";

    response.status(500).json({ error: message });
  }
);

app.listen(port, () => {
  console.log(`CRM Tasaciones API escuchando en http://localhost:${port}`);
});
