import { FormEvent, useEffect, useRef, useState } from "react";
import { useCrmStore } from "./chat.store";
import type { ChatMessage } from "./chat.types";

export function ChatPanel() {
  const [draftMessage, setDraftMessage] = useState("");
  const messages = useCrmStore((state) => state.messages);
  const isSending = useCrmStore((state) => state.isSending);
  const sendMessage = useCrmStore((state) => state.sendMessage);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draftMessage.trim();

    if (!message) {
      return;
    }

    setDraftMessage("");
    await sendMessage(message);
  }

  return (
    <section className="flex min-h-0 flex-col border-b border-mutedLine bg-white lg:border-b-0 lg:border-r">
      <header className="flex items-center justify-between border-b border-mutedLine px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Agente n8n
          </p>
          <h1 className="text-lg font-semibold text-slate-950">Chat de tasaciones</h1>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Online
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isSending ? <LoadingBubble /> : null}
          <div ref={scrollAnchorRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-mutedLine bg-white px-4 py-3 sm:px-6"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-lg border border-mutedLine bg-slate-50 p-2 shadow-sm">
          <textarea
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            placeholder="Ej: Crea expediente para Laura Perez..."
            rows={1}
            className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isSending || !draftMessage.trim()}
            className="h-11 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUserMessage = message.role === "user";

  return (
    <article
      className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
      aria-label={isUserMessage ? "Mensaje del usuario" : "Mensaje del agente"}
    >
      <div
        className={`max-w-[86%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
          isUserMessage
            ? "bg-slate-950 text-white"
            : "border border-mutedLine bg-white text-slate-800"
        }`}
      >
        {message.content}
      </div>
    </article>
  );
}

function LoadingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-lg border border-mutedLine bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
        Procesando con el agente
      </div>
    </div>
  );
}
