import { FolderGit2 } from "lucide-react";
import { ModelSwitcher } from "./ModelSwitcher";
import type { ContextInfo, Meta } from "../lib/types";

// shortCwd trims a path to its last two segments so the status line stays compact
// (e.g. /Users/x/projects/reasonix → …/projects/reasonix).
function shortCwd(cwd: string): string {
  const parts = cwd.split("/").filter(Boolean);
  if (parts.length <= 2) return cwd;
  return "…/" + parts.slice(-2).join("/");
}

export function StatusBar({
  meta,
  context,
  running,
  plan,
  onSwitchModel,
}: {
  meta?: Meta;
  context: ContextInfo;
  running: boolean;
  plan: boolean;
  onSwitchModel: (name: string) => void;
}) {
  const pct = context.window ? Math.min(100, Math.round((context.used / context.window) * 100)) : null;
  return (
    <div className="statusbar">
      <span className={`statusbar__dot ${running ? "statusbar__dot--busy" : ""}`} />
      <ModelSwitcher label={meta?.label ?? "connecting…"} onPick={onSwitchModel} />
      {pct !== null && (
        <>
          <span className="statusbar__sep">·</span>
          <span className="statusbar__ctx">{pct}% ctx</span>
        </>
      )}
      {meta?.cwd && (
        <>
          <span className="statusbar__sep">·</span>
          <span className="statusbar__cwd">
            <FolderGit2 size={11} />
            {shortCwd(meta.cwd)}
          </span>
        </>
      )}
      <span className="statusbar__spacer" />
      {plan && <span className="statusbar__plan">PLAN</span>}
    </div>
  );
}
