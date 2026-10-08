"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { telemetry } from "@/lib/telemetry";
import { ChapterHeader } from "../editorial/ChapterHeader";
import { Reveal } from "../editorial/Reveal";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string | React.ReactNode;
}

interface InteractiveTerminalProps {
  onOpenResumeModal: () => void;
}

export function InteractiveTerminal({ onOpenResumeModal }: InteractiveTerminalProps) {
  useLanguage();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      text: "satohjiro — portfolio console",
    },
    {
      id: "2",
      type: "system",
      text: "Type 'help' or pick a command from the index above.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(100);
  const nextLineId = (tag: string) => `${lineId.current++}-${tag}`;

  const quickCommands = ["help", "whoami", "skills", "experience", "projects", "awards", "contact", "hire", "resume"];

  // Scroll ONLY the inner terminal output container, never the window
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    telemetry.track("terminal_command", trimmed);

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      { id: nextLineId("in"), type: "input", text: `$ ${cmdStr}` },
    ];

    if (trimmed === "clear") {
      setLines([
        {
          id: nextLineId("init"),
          type: "system",
          text: "Terminal buffer cleared. Type 'help' for commands.",
        },
      ]);
      setInputVal("");
      return;
    }

    if (trimmed === "help") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="font-bold text-white">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-cyan-300 pt-1">
              <div><span className="text-amber-400 font-bold">whoami</span> : Profile summary & role</div>
              <div><span className="text-amber-400 font-bold">skills</span> : Core technologies & strengths</div>
              <div><span className="text-amber-400 font-bold">experience</span> : Work experience history</div>
              <div><span className="text-amber-400 font-bold">projects</span> : Key software projects</div>
              <div><span className="text-amber-400 font-bold">awards</span> : Academic & hackathon honors</div>
              <div><span className="text-amber-400 font-bold">contact</span> : Email, phone, GitHub, LinkedIn</div>
              <div><span className="text-amber-400 font-bold">resume</span> : Open ATS resume modal</div>
              <div><span className="text-amber-400 font-bold">hire</span> : Fast-track interview request [Priority]</div>
              <div><span className="text-amber-400 font-bold">clear</span> : Clear console buffer</div>
            </div>
          </div>
        ),
      });
    } else if (trimmed === "whoami") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-emerald-400 font-bold">Name: NGUYEN TRAN ANH (SatohJiro)</div>
            <div>Role: Software Engineer | Full-Stack & Frontend Developer</div>
            <div>Education: Degree of Engineer (Valedictorian Class 2019, GPA 3.6/4.0)</div>
            <div>Focus: ReactJS, Next.js, Vue.js, TypeScript, State Management, API & AI integration</div>
            <div>Location: Ho Chi Minh City, Vietnam</div>
          </div>
        ),
      });
    } else if (trimmed === "skills") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-blue-400 font-bold">Technical Skills:</div>
            <div>• Frontend Core: ReactJS, Next.js, Vue.js (2/3), TypeScript, JavaScript (ES6+), Tailwind CSS</div>
            <div>• State & Tuning: Redux Toolkit, Zustand, Context API, Re-render reduction (+30%)</div>
            <div>• Architecture & Backend: Micro-frontend (ahamo NTT Docomo), Java Spring Boot, Python FastAPI, NestJS</div>
            <div>• AI & Queues: OpenAI GPT-4 API, RabbitMQ message queues, Doc2Vec NLP</div>
            <div>• Databases & DevOps: PostgreSQL, MySQL, MongoDB, Docker, Git/GitHub, CMS Webrelease</div>
          </div>
        ),
      });
    } else if (trimmed === "experience" || trimmed === "exp") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-2 font-mono text-xs text-slate-200">
            <div>
              <span className="text-cyan-400 font-bold">[1] Hero Solutions (09/2024 - Present):</span> Frontend Developer on ahamo Platform (NTT Docomo Japan - Micro-frontend, Vue.js, ReactJS, CMS Webrelease).
            </div>
            <div>
              <span className="text-cyan-400 font-bold">[2] Nexus Zone (01/2024 - 09/2024):</span> Frontend Developer on Salesforce-CRM (+30% performance boost, Redux/Zustand, Rookie of the Year 2024).
            </div>
            <div>
              <span className="text-cyan-400 font-bold">[3] TMA Solutions (01/2023 - 12/2023):</span> Fullstack Developer (GPT Code Generator with GPT-4/FastAPI/RabbitMQ - 3rd Place AI Got Talent).
            </div>
          </div>
        ),
      });
    } else if (trimmed === "projects") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1.5 font-mono text-xs text-slate-200">
            <div><span className="text-emerald-400 font-bold">1. GPT Code Generator:</span> Natural language to code preview with GPT-4, FastAPI, RabbitMQ, Next.js.</div>
            <div><span className="text-emerald-400 font-bold">2. ahamo Docomo Platform:</span> Mobile carrier portal with Vue.js, React, Micro-frontends.</div>
            <div><span className="text-emerald-400 font-bold">3. Salesforce-CRM:</span> CRM interface optimization with Redux Toolkit and Zustand.</div>
            <div><span className="text-emerald-400 font-bold">4. Graduation Thesis Portal:</span> Role-based access + Doc2Vec duplicate detection NLP.</div>
            <div><span className="text-emerald-400 font-bold">5. Genetic Sudoku Solver:</span> Evolutionary algorithm in pure Java.</div>
          </div>
        ),
      });
    } else if (trimmed === "awards" || trimmed === "honors") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-amber-300">
            <div>[Honor] 1st Place — Valedictorian of Class 2019 (Nong Lam University - GPA 3.6/4.0)</div>
            <div>[Award] 3rd Place — AI Got Talent 2023 (TMA Solutions Corporation)</div>
            <div>[Award] Rookie of the Year 2024 (Nexus Zone Corporation)</div>
          </div>
        ),
      });
    } else if (trimmed === "contact") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div>Email: <a href="mailto:trananhq2345@gmail.com" className="text-cyan-400 underline">trananhq2345@gmail.com</a></div>
            <div>Phone: <a href="tel:+84989702459" className="text-cyan-400 underline">(+84) 98 970 2459</a></div>
            <div>GitHub: <a href="https://github.com/SatohJiro" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">https://github.com/SatohJiro</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/satohjiro/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">https://www.linkedin.com/in/satohjiro/</a></div>
          </div>
        ),
      });
    } else if (trimmed === "resume" || trimmed === "cv") {
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: <span className="text-emerald-400 font-mono text-xs">Opening Resume Viewer modal...</span>,
      });
      onOpenResumeModal();
    } else if (trimmed === "hire" || trimmed === "sudo hire") {
      import("canvas-confetti")
        .then((mod) => {
          mod.default({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        })
        .catch(() => {});
      newLines.push({
        id: nextLineId("out"),
        type: "output",
        text: (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs space-y-1">
            <div className="font-bold text-white">[Priority Direct Line] Thank you for your interest!</div>
            <div>Nguyen Tran Anh is ready to contribute to your engineering team.</div>
            <div>Feel free to connect via <a href="mailto:trananhq2345@gmail.com" className="underline font-bold text-cyan-300">trananhq2345@gmail.com</a> or phone <span className="font-bold text-white">(+84) 98 970 2459</span>.</div>
          </div>
        ),
      });
    } else {
      newLines.push({
        id: nextLineId("err"),
        type: "error",
        text: (
          <span className="font-mono text-xs text-rose-400">
            command not found: {cmdStr}. Type &apos;help&apos; for list of valid commands.
          </span>
        ),
      });
    }

    setLines(newLines);
    setInputVal("");
  };

  const handleChipClick = (e: MouseEvent, cmd: string) => {
    e.preventDefault();
    executeCommand(cmd);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <section id="terminal" className="relative scroll-mt-20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Reveal>
          <ChapterHeader id="terminal" />
        </Reveal>

        {/* Command index */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--ed-muted)]">
            {">"} try
          </span>
          {quickCommands.map((cmd, i) => (
            <React.Fragment key={cmd}>
              {i > 0 && <span className="text-[var(--ed-hairline)]">·</span>}
              <button
                type="button"
                onClick={(e) => handleChipClick(e, cmd)}
                className="text-[var(--ed-muted)] underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400 cursor-pointer"
              >
                {cmd}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Console transcript — permanent dark, no fake window chrome */}
        <div className="overflow-hidden rounded-lg border border-[var(--ed-hairline)] bg-[#0b0d12] text-slate-200">
          {/* Console title bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="font-mono text-xs text-slate-500">
              satohjiro@portfolio <span className="text-slate-600">—</span> zsh
            </span>
            <button
              type="button"
              onClick={() => executeCommand("clear")}
              className="font-mono text-xs text-slate-500 underline-offset-4 transition-colors hover:text-slate-200 hover:underline cursor-pointer"
            >
              clear
            </button>
          </div>

          {/* Console output */}
          <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="min-h-[260px] max-h-[380px] cursor-text space-y-2 overflow-y-auto bg-[#0b0d12] p-5 font-mono text-xs text-slate-200"
          >
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === "input" ? (
                  <span className="font-bold text-slate-100">{line.text}</span>
                ) : line.type === "system" ? (
                  <span className="italic text-slate-500">{line.text}</span>
                ) : line.type === "error" ? (
                  <span className="font-semibold text-rose-400">{line.text}</span>
                ) : (
                  <div>{line.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Prompt */}
          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <span className="shrink-0 font-mono text-xs font-bold text-emerald-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command…"
              className="w-full bg-transparent font-mono text-xs font-medium text-slate-100 caret-emerald-400 focus:outline-none placeholder:text-slate-600"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
            <kbd className="hidden shrink-0 rounded border border-white/10 px-1.5 font-mono text-[10px] text-slate-500 sm:inline">
              enter
            </kbd>
          </div>
        </div>
      </div>
    </section>
  );
}
