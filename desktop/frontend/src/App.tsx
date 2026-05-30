import { useState } from "react";
import { SquarePen } from "lucide-react";
import { useController } from "./lib/useController";
import { Transcript } from "./components/Transcript";
import { Composer } from "./components/Composer";
import { ApprovalModal } from "./components/ApprovalModal";
import { StatusBar } from "./components/StatusBar";

export default function App() {
  const { state, send, cancel, approve, setPlan, newSession, setModel } = useController();
  const [plan, setPlanLocal] = useState(false);

  const togglePlan = () => {
    const next = !plan;
    setPlanLocal(next);
    setPlan(next);
  };

  return (
    <div className="app">
      <header className="topbar">
        <span className="topbar__model">{state.meta?.label ?? "…"}</span>
        <div className="topbar__spacer" />
        <button
          className={`chip ${plan ? "chip--on" : ""}`}
          onClick={togglePlan}
          title="Plan mode — refuse all writes"
        >
          plan
        </button>
        <button className="chip chip--icon" onClick={newSession} title="New session">
          <SquarePen size={13} />
        </button>
      </header>

      {state.meta?.startupErr && (
        <div className="banner banner--error">startup error: {state.meta.startupErr}</div>
      )}

      <main className="main">
        <Transcript items={state.items} onPrompt={send} />
      </main>

      <footer className="footer">
        <Composer running={state.running} onSend={send} onCancel={cancel} />
        <StatusBar
          meta={state.meta}
          context={state.context}
          running={state.running}
          plan={plan}
          onSwitchModel={setModel}
        />
      </footer>

      {state.approval && (
        <ApprovalModal
          approval={state.approval}
          onAnswer={(allow, session) => approve(state.approval!.id, allow, session)}
        />
      )}
    </div>
  );
}
