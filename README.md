# Database Manager

A web application for consulting, managing, and updating database records through an AI-powered chat assistant connected to an n8n workflow agent.

The application uses **Airtable as the hosted database**. The AI assistant does **not** connect to or manage the database directly. Instead, all database operations are routed through a controlled API layer and an n8n workflow, reducing risk and ensuring that validation, permissions, and business logic remain outside the AI model.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** Express.js (Node.js) + TypeScript
- **Database:** Airtable, accessed through its API
- **AI integration:** n8n webhook agent
- **State management:** Zustand

## Features

- AI chat panel powered by an n8n agent
- Airtable-backed expediente database
- Expediente sidebar and detail view
- Resizable split-panel layout for desktop and mobile
- Session-based conversation tracking
- Controlled database updates through API-mediated workflows

## Project structure

```txt
src/
  modules/
    app/           # Root layout and panel orchestration
    chat/          # Chat UI, store, API client, session logic
    expedientes/   # Case file list, detail view and parser

server/
  modules/
    chat/          # Express routes, controller, n8n client, validation
