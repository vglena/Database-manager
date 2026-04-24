import { ChatPanel } from "../chat/ChatPanel";
import { ExpedienteDetail } from "../expedientes/ExpedienteDetail";
import { ExpedienteSidebar } from "../expedientes/ExpedienteSidebar";

export function App() {
  return (
    <main className="min-h-screen bg-paper text-slateInk">
      <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
        <ExpedienteSidebar />
        <section className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(280px,38vh)] lg:grid-cols-[minmax(380px,1fr)_420px] lg:grid-rows-1">
          <ChatPanel />
          <ExpedienteDetail />
        </section>
      </div>
    </main>
  );
}
