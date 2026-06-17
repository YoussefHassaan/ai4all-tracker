import { useState, useEffect } from "react";

const WEEKS = [
  {
    num: 1, title: "Backend Foundations", subtitle: "REST + SQL",
    color: "#1A56DB", light: "#EFF6FF", emoji: "🏗️",
    learn: ["REST APIs (requests/responses)", "HTTP methods (GET/POST/PUT/DELETE)", "SQL basics (tables, queries)"],
    build: ["Setup FastAPI project", "Create Employee API", "Add SQLite database", "Implement CRUD endpoints"],
    done: ["Explain how a request flows browser → API → DB", "Build a working API without copying tutorials"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 2, title: "Auth + FastAPI Structure", subtitle: "JWT + OAuth",
    color: "#1A56DB", light: "#EFF6FF", emoji: "🔐",
    learn: ["FastAPI structure (routers, models)", "JWT authentication", "OAuth basics (conceptual)"],
    build: ["Add login endpoint", "Add JWT token auth", "Protect API routes"],
    done: ["Explain authentication vs authorization", "Secure an API endpoint"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 3, title: "Software Engineering Practices", subtitle: "Clean Code + SOLID",
    color: "#7C3AED", light: "#F5F3FF", emoji: "🏛️",
    learn: ["Clean Code principles", "SOLID principles (basic understanding)", "Design patterns (Factory, Strategy)"],
    build: ["Refactor routers/ services/ models/ database/", "Add Pytest tests"],
    done: ["Explain why we separate business logic", "Show test coverage in your API"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 4, title: "Docker + Cloud Fundamentals", subtitle: "DevOps",
    color: "#7C3AED", light: "#F5F3FF", emoji: "🐳",
    learn: ["Docker basics (images, containers)", "Cloud concepts: VM, Storage, Networking", "IAM concepts"],
    build: ["Dockerize FastAPI app", "Run with docker-compose", "Verify full system runs locally"],
    done: ["Explain why Docker exists", "Run your app with one command"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 5, title: "Generative AI Foundations", subtitle: "LLMs + Start Project",
    color: "#EA580C", light: "#FFF7ED", emoji: "🤖",
    learn: ["What is an LLM", "Prompt engineering basics", "RAG concept overview"],
    build: ["Start Engineering Knowledge Assistant backend", "Create PDF upload endpoint", "Store document metadata"],
    done: ["Explain what RAG is in simple terms", "Upload a file via API"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 6, title: "Vector DB + RAG", subtitle: "ChromaDB + Embeddings",
    color: "#EA580C", light: "#FFF7ED", emoji: "🧠",
    learn: ["Embeddings", "Vector databases (ChromaDB)", "Similarity search"],
    build: ["Chunk PDF text", "Generate embeddings", "Store in vector DB", "Add question-answer endpoint"],
    done: ["Draw full RAG pipeline from memory", "System answers questions from documents"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 7, title: "React Frontend", subtitle: "Full-Stack",
    color: "#059669", light: "#F0FDF4", emoji: "⚛️",
    learn: ["React basics", "Components + state", "API calls from React"],
    build: ["Upload UI", "Chat interface", "Display AI responses"],
    done: ["Use frontend to talk to backend", "Demonstrate full-stack flow"],
    hours: { learn: 3, build: 7 }
  },
  {
    num: 8, title: "Deploy + Interview Prep", subtitle: "Ship It",
    color: "#059669", light: "#F0FDF4", emoji: "🚀",
    learn: ["CI/CD basics", "Logging / monitoring basics", "System design overview"],
    build: ["Docker Compose final system", "Clean UI + bug fixes", "Deploy (GCP / local demo)", "Prepare demo script"],
    done: ["Present project end-to-end in 5 minutes", "Explain architecture clearly"],
    hours: { learn: 2, build: 8 }
  }
];

const SKILLS = {
  Backend: { color: "#1A56DB", items: ["APIs", "FastAPI", "Authentication", "SQL"] },
  DevOps: { color: "#7C3AED", items: ["Docker", "Cloud basics", "CI/CD basics"] },
  "AI / ML": { color: "#EA580C", items: ["LLM basics", "Prompt engineering", "Embeddings", "Vector DB", "RAG"] },
  Frontend: { color: "#059669", items: ["React basics", "API integration"] }
};

const INTERVIEW_CHECKLIST = [
  "I built a full-stack AI application",
  "I used FastAPI for backend",
  "I used Docker for deployment",
  "I used vector databases for AI search",
  "I understand RAG architecture",
  "I deployed or containerized the system",
  "I understand basic cloud concepts"
];

const STORAGE_KEY = "ai4all_tracker_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function initState() {
  const saved = loadState();
  if (saved) return saved;
  const checks = {};
  WEEKS.forEach(w => {
    checks[`w${w.num}_learn`] = w.learn.map(() => false);
    checks[`w${w.num}_build`] = w.build.map(() => false);
    checks[`w${w.num}_done`] = w.done.map(() => false);
  });
  Object.keys(SKILLS).forEach(cat => {
    checks[`skill_${cat}`] = SKILLS[cat].items.map(() => false);
  });
  checks.interview = INTERVIEW_CHECKLIST.map(() => false);
  return checks;
}

function ProgressRing({ pct, color, size = 48 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.4s ease" }} />
    </svg>
  );
}

function Checkbox({ checked, onChange, color }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? color : "#D1D5DB"}`,
        background: checked ? color : "white", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
        transition: "all 0.15s ease", padding: 0
      }}
    >
      {checked && <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M1 4L4.5 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </button>
  );
}

export default function App() {
  const [checks, setChecks] = useState(initState);
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeTab, setActiveTab] = useState("roadmap");

  useEffect(() => { saveState(checks); }, [checks]);

  function toggle(key, idx) {
    setChecks(prev => {
      const arr = [...prev[key]];
      arr[idx] = !arr[idx];
      return { ...prev, [key]: arr };
    });
  }

  function weekPct(w) {
    const all = [
      ...(checks[`w${w.num}_learn`] || []),
      ...(checks[`w${w.num}_build`] || []),
      ...(checks[`w${w.num}_done`] || [])
    ];
    if (!all.length) return 0;
    return Math.round(all.filter(Boolean).length / all.length * 100);
  }

  function overallPct() {
    const all = WEEKS.flatMap(w => [
      ...(checks[`w${w.num}_learn`] || []),
      ...(checks[`w${w.num}_build`] || []),
      ...(checks[`w${w.num}_done`] || [])
    ]);
    return Math.round(all.filter(Boolean).length / all.length * 100);
  }

  function skillsPct() {
    const all = Object.keys(SKILLS).flatMap(cat => checks[`skill_${cat}`] || []);
    return Math.round(all.filter(Boolean).length / all.length * 100);
  }

  function interviewPct() {
    const arr = checks.interview || [];
    return Math.round(arr.filter(Boolean).length / arr.length * 100);
  }

  const week = WEEKS.find(w => w.num === activeWeek);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#F8FAFC", minHeight: "100vh", color: "#1E293B" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>🚀</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#1E293B" }}>AI4All Career Transition Plan</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>Embedded Linux Engineer → AI Application Engineer · 8 Weeks</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProgressRing pct={overallPct()} color="#1A56DB" size={44} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1A56DB" }}>{overallPct()}%</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Complete</div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {[["roadmap", "📅 Weekly Roadmap"], ["skills", "🧠 Skills Tracker"], ["interview", "🧪 Interview Prep"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: activeTab === id ? "#1A56DB" : "transparent",
                color: activeTab === id ? "white" : "#64748B",
                transition: "all 0.15s"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>

        {activeTab === "roadmap" && (
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
            {/* Week sidebar */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Weeks</div>
              {WEEKS.map(w => {
                const pct = weekPct(w);
                const isActive = activeWeek === w.num;
                return (
                  <button key={w.num} onClick={() => setActiveWeek(w.num)} style={{
                    width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8,
                    border: isActive ? `1.5px solid ${w.color}` : "1.5px solid transparent",
                    background: isActive ? w.light : "white",
                    cursor: "pointer", marginBottom: 4, display: "block",
                    transition: "all 0.15s"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{w.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? w.color : "#374151" }}>
                          Week {w.num}
                        </div>
                        <div style={{ fontSize: 11, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.title}</div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? "#059669" : isActive ? w.color : "#9CA3AF" }}>{pct}%</div>
                    </div>
                    <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: "#E5E7EB", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#059669" : w.color, borderRadius: 2, transition: "width 0.3s ease" }} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Week detail */}
            {week && (
              <div>
                {/* Week header */}
                <div style={{ background: week.color, borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>Week {week.num} of 8</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{week.emoji} {week.title}</div>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{week.subtitle}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <ProgressRing pct={weekPct(week)} color="white" size={56} />
                      <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginTop: -40 }}>{weekPct(week)}%</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "white" }}>📘 {week.hours.learn}h learning</span>
                    <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "white" }}>🛠 {week.hours.build}h building</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {/* Learn */}
                  <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: week.color, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                      📘 <span>Learn</span>
                    </div>
                    {week.learn.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <Checkbox
                          checked={checks[`w${week.num}_learn`]?.[i] || false}
                          onChange={() => toggle(`w${week.num}_learn`, i)}
                          color={week.color}
                        />
                        <span style={{ fontSize: 13, color: checks[`w${week.num}_learn`]?.[i] ? "#9CA3AF" : "#374151",
                          textDecoration: checks[`w${week.num}_learn`]?.[i] ? "line-through" : "none", lineHeight: 1.4 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Build */}
                  <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: week.color, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                      🛠 <span>Build</span>
                    </div>
                    {week.build.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <Checkbox
                          checked={checks[`w${week.num}_build`]?.[i] || false}
                          onChange={() => toggle(`w${week.num}_build`, i)}
                          color={week.color}
                        />
                        <span style={{ fontSize: 13, color: checks[`w${week.num}_build`]?.[i] ? "#9CA3AF" : "#374151",
                          textDecoration: checks[`w${week.num}_build`]?.[i] ? "line-through" : "none", lineHeight: 1.4 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Done when */}
                <div style={{ background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0", padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 10 }}>✅ Done when you can:</div>
                  {week.done.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <Checkbox
                        checked={checks[`w${week.num}_done`]?.[i] || false}
                        onChange={() => toggle(`w${week.num}_done`, i)}
                        color="#059669"
                      />
                      <span style={{ fontSize: 13, color: checks[`w${week.num}_done`]?.[i] ? "#9CA3AF" : "#374151",
                        textDecoration: checks[`w${week.num}_done`]?.[i] ? "line-through" : "none", lineHeight: 1.4, fontWeight: 500 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                  <button onClick={() => setActiveWeek(Math.max(1, activeWeek - 1))} disabled={activeWeek === 1}
                    style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white",
                      color: activeWeek === 1 ? "#9CA3AF" : "#374151", cursor: activeWeek === 1 ? "default" : "pointer", fontSize: 13 }}>
                    ← Previous Week
                  </button>
                  <button onClick={() => setActiveWeek(Math.min(8, activeWeek + 1))} disabled={activeWeek === 8}
                    style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: week.color,
                      color: "white", cursor: activeWeek === 8 ? "default" : "pointer", fontSize: 13, fontWeight: 500,
                      opacity: activeWeek === 8 ? 0.5 : 1 }}>
                    Next Week →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>🧠 Skills Progression Tracker</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>Track your skill development across all domains</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProgressRing pct={skillsPct()} color="#1A56DB" size={48} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1A56DB" }}>{skillsPct()}%</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Skills learned</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {Object.entries(SKILLS).map(([cat, { color, items }]) => {
                const catChecks = checks[`skill_${cat}`] || items.map(() => false);
                const pct = Math.round(catChecks.filter(Boolean).length / items.length * 100);
                return (
                  <div key={cat} style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color }}>{cat}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: pct === 100 ? "#059669" : color }}>{pct}%</div>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "#E5E7EB", marginBottom: 14, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#059669" : color, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Checkbox checked={catChecks[i]} onChange={() => toggle(`skill_${cat}`, i)} color={color} />
                        <span style={{ fontSize: 13, color: catChecks[i] ? "#9CA3AF" : "#374151",
                          textDecoration: catChecks[i] ? "line-through" : "none" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Architecture diagram */}
            <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20, marginTop: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🧱 Target Architecture</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                {[
                  ["React Frontend", "#1A56DB"], ["↓", "#9CA3AF"],
                  ["FastAPI Backend", "#1A56DB"], ["↓", "#9CA3AF"],
                  ["Document Processing", "#EA580C"], ["↓", "#9CA3AF"],
                  ["Embeddings (OpenAI)", "#EA580C"], ["↓", "#9CA3AF"],
                  ["Vector Database (ChromaDB)", "#EA580C"], ["↓", "#9CA3AF"],
                  ["RAG Response Engine", "#059669"]
                ].map(([label, color], i) => (
                  label === "↓"
                    ? <div key={i} style={{ fontSize: 18, color }}>↓</div>
                    : <div key={i} style={{ background: `${color}15`, border: `1.5px solid ${color}40`,
                        borderRadius: 8, padding: "8px 24px", fontSize: 13, fontWeight: 600, color }}>{label}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "interview" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>🧪 Interview Readiness Checklist</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>Can you say these with confidence?</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProgressRing pct={interviewPct()} color={interviewPct() === 100 ? "#059669" : "#1A56DB"} size={48} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: interviewPct() === 100 ? "#059669" : "#1A56DB" }}>{interviewPct()}%</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Ready</div>
                </div>
              </div>
            </div>

            {interviewPct() === 100 && (
              <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🎉</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>You're ready for the interview!</div>
                <div style={{ fontSize: 13, color: "#16A34A" }}>All boxes checked. Go get that job.</div>
              </div>
            )}

            <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#64748B", marginBottom: 14 }}>At the end of 8 weeks, I can say:</div>
              {INTERVIEW_CHECKLIST.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0",
                  borderBottom: i < INTERVIEW_CHECKLIST.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <Checkbox
                    checked={checks.interview?.[i] || false}
                    onChange={() => toggle("interview", i)}
                    color="#059669"
                  />
                  <span style={{ fontSize: 14, color: checks.interview?.[i] ? "#9CA3AF" : "#1E293B",
                    textDecoration: checks.interview?.[i] ? "line-through" : "none", fontWeight: 500 }}>
                    {item}
                  </span>
                  {checks.interview?.[i] && <span style={{ marginLeft: "auto", fontSize: 16 }}>✅</span>}
                </div>
              ))}
            </div>

            {/* Rule of execution */}
            <div style={{ background: "#1E293B", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 12 }}>🔥 Rule of Execution</div>
              <div style={{ display: "flex", gap: 12 }}>
                {["3h learning", "7h building", "1 feature shipped"].map((r, i) => (
                  <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#60A5FA" }}>{r.split(" ")[0]}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>{r.split(" ").slice(1).join(" ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
