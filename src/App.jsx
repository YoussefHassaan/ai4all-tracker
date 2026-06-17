import { useState, useEffect } from "react";

const WEEKS = [
  {
    num: 1, title: "Backend Foundations", subtitle: "REST + SQL",
    color: "#1A56DB", light: "#EFF6FF", emoji: "🏗️",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Python basics", note: "You already know this ✓", done: true },
      { label: "Command line basics", note: "cd, ls, mkdir — you need these daily" },
      { label: "VS Code installed", note: "Or any editor you're comfortable with" },
      { label: "Postman or curl", note: "To test your API endpoints" },
    ],
    learn: [
      { text: "REST APIs (requests/responses)", resources: [
        { type: "doc", label: "FastAPI official tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
        { type: "video", label: "FastAPI crash course – Traversy Media", url: "https://www.youtube.com/watch?v=0sOvCWFmrtA" },
      ]},
      { text: "HTTP methods (GET/POST/PUT/DELETE)", resources: [
        { type: "article", label: "HTTP methods explained – MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" },
      ]},
      { text: "SQL basics (tables, queries)", resources: [
        { type: "article", label: "SQLite + Python – Real Python", url: "https://realpython.com/python-sqlite-sqlalchemy/" },
        { type: "course", label: "SQL basics – SQLZoo (interactive)", url: "https://sqlzoo.net/wiki/SELECT_basics" },
      ]},
    ],
    build: ["Setup FastAPI project", "Create Employee API", "Add SQLite database", "Implement CRUD endpoints"],
    done: ["Explain how a request flows browser → API → DB", "Build a working API without copying tutorials"],
    project: { title: "Employee CRUD API", desc: "FastAPI app with 5 endpoints: GET all, GET by ID, POST create, PUT update, DELETE. Store in SQLite. Test with Postman." }
  },
  {
    num: 2, title: "Auth + FastAPI Structure", subtitle: "JWT + OAuth",
    color: "#1A56DB", light: "#EFF6FF", emoji: "🔐",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Week 1 complete", note: "Working CRUD API with SQLite", done: false },
      { label: "Basic understanding of HTTP headers", note: "You'll send the JWT in headers" },
      { label: "Postman installed", note: "Needed to test protected routes" },
    ],
    learn: [
      { text: "FastAPI structure (routers, models)", resources: [
        { type: "doc", label: "FastAPI bigger applications – official", url: "https://fastapi.tiangolo.com/tutorial/bigger-applications/" },
      ]},
      { text: "JWT authentication", resources: [
        { type: "article", label: "JWT explained – jwt.io", url: "https://jwt.io/introduction" },
        { type: "video", label: "FastAPI auth – Patrick Loeber", url: "https://www.youtube.com/watch?v=0A_GCXBCNUQ" },
      ]},
      { text: "OAuth basics (conceptual only)", resources: [
        { type: "doc", label: "FastAPI security docs", url: "https://fastapi.tiangolo.com/tutorial/security/" },
      ]},
    ],
    build: ["Add login endpoint", "Add JWT token auth", "Protect API routes"],
    done: ["Explain authentication vs authorization", "Secure an API endpoint"],
    project: { title: "Add auth to your Week 1 API", desc: "Add /login endpoint returning a JWT. Protect 3 routes so only authenticated users can access them. Test by passing token in headers." }
  },~
  {
    num: 3, title: "Software Engineering Practices", subtitle: "Clean Code + SOLID",
    color: "#7C3AED", light: "#F5F3FF", emoji: "🏛️",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Week 2 complete", note: "Auth-protected FastAPI app", done: false },
      { label: "Basic OOP in Python", note: "Classes, inheritance — you know this ✓", done: true },
      { label: "pip install pytest", note: "Run this before starting the week" },
    ],
    learn: [
      { text: "Clean Code principles", resources: [
        { type: "article", label: "Clean Code summary – gist", url: "https://gist.github.com/wojteklu/73f42606b3f93c72cb0e4b68db9b0e1d" },
      ]},
      { text: "SOLID principles (basic understanding)", resources: [
        { type: "article", label: "SOLID principles in Python – Real Python", url: "https://realpython.com/solid-principles-python/" },
      ]},
      { text: "Design patterns (Factory, Strategy)", resources: [
        { type: "article", label: "Python design patterns – Refactoring Guru", url: "https://refactoring.guru/design-patterns/python" },
      ]},
    ],
    build: ["Refactor routers/ services/ models/ database/", "Add Pytest tests"],
    done: ["Explain why we separate business logic", "Show test coverage in your API"],
    project: { title: "Refactor + test your API", desc: "Split into routers/, services/, models/, database/. Move logic out of route handlers. Write 5 pytest tests covering your endpoints." }
  },
  {
    num: 4, title: "Docker + Cloud Fundamentals", subtitle: "DevOps — you know Docker ⚡",
    color: "#7C3AED", light: "#F5F3FF", emoji: "🐳",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Docker Desktop installed", note: "You already know Docker ✓", done: true },
      { label: "Week 3 complete", note: "Refactored FastAPI app", done: false },
      { label: "Basic networking concepts", note: "Ports, IP addresses — light reading only" },
    ],
    learn: [
      { text: "FastAPI + Docker (new even if you know Docker)", resources: [
        { type: "doc", label: "FastAPI Docker guide – official", url: "https://fastapi.tiangolo.com/deployment/docker/" },
      ]},
      { text: "Docker Compose for multi-service apps", resources: [
        { type: "article", label: "Docker Compose best practices – testdriven.io", url: "https://testdriven.io/blog/docker-best-practices/" },
      ]},
      { text: "Cloud concepts: VM, Storage, Networking, IAM", resources: [
        { type: "article", label: "GCP free tier overview", url: "https://cloud.google.com/free/docs/free-cloud-features" },
        { type: "doc", label: "AWS cloud concepts – official", url: "https://aws.amazon.com/getting-started/cloud-essentials/" },
      ]},
    ],
    build: ["Dockerize FastAPI app", "Run with docker-compose", "Verify full system runs locally"],
    done: ["Explain why Docker exists", "Run your app with one command"],
    project: { title: "Dockerize your app", desc: "Write Dockerfile + docker-compose.yml. Single command: docker-compose up → full running system. Since you know Docker, target under 2h." }
  },
  {
    num: 5, title: "Generative AI Foundations", subtitle: "LLMs + Start Project",
    color: "#EA580C", light: "#FFF7ED", emoji: "🤖",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "OpenAI API key", note: "Sign up at platform.openai.com — ~$5 credit is enough" },
      { label: "pip install openai langchain pypdf2", note: "Install before starting" },
      { label: "Week 4 complete", note: "Dockerized FastAPI app" , done: false},
    ],
    learn: [
      { text: "What is an LLM", resources: [
        { type: "article", label: "RAG explained – AWS", url: "https://aws.amazon.com/what-is/retrieval-augmented-generation/" },
        { type: "video", label: "LLMs explained in 10 min – Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
      ]},
      { text: "Prompt engineering basics", resources: [
        { type: "course", label: "ChatGPT Prompt Engineering – DeepLearning.AI (free)", url: "https://learn.deeplearning.ai/courses/chatgpt-prompt-eng" },
      ]},
      { text: "RAG concept overview", resources: [
        { type: "course", label: "LangChain for LLM Apps – DeepLearning.AI (free)", url: "https://learn.deeplearning.ai/courses/langchain" },
        { type: "doc", label: "OpenAI API quickstart", url: "https://platform.openai.com/docs/quickstart" },
      ]},
    ],
    build: ["Start Engineering Knowledge Assistant backend", "Create PDF upload endpoint", "Store document metadata"],
    done: ["Explain what RAG is in simple terms", "Upload a file via API"],
    project: { title: "Start Knowledge Assistant", desc: "New FastAPI project. /upload endpoint accepts a PDF, extracts text with pdfplumber, stores filename + text in DB. Goal: file upload pipeline end to end." }
  },
  {
    num: 6, title: "Vector DB + RAG", subtitle: "ChromaDB + Embeddings",
    color: "#EA580C", light: "#FFF7ED", emoji: "🧠",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Week 5 complete", note: "PDF upload pipeline working", done: false },
      { label: "pip install chromadb", note: "Install before starting" },
      { label: "OpenAI API key active", note: "You need this for embeddings" },
    ],
    learn: [
      { text: "Embeddings", resources: [
        { type: "article", label: "What are embeddings – OpenAI", url: "https://platform.openai.com/docs/guides/embeddings" },
      ]},
      { text: "Vector databases (ChromaDB)", resources: [
        { type: "doc", label: "ChromaDB getting started", url: "https://docs.trychroma.com/getting-started" },
      ]},
      { text: "Similarity search", resources: [
        { type: "course", label: "Building Systems with ChatGPT API – DeepLearning.AI (free)", url: "https://learn.deeplearning.ai/courses/chatgpt-building-system" },
        { type: "article", label: "RAG from scratch – LangChain blog", url: "https://blog.langchain.dev/rag-from-scratch/" },
      ]},
    ],
    build: ["Chunk PDF text", "Generate embeddings", "Store in vector DB", "Add question-answer endpoint"],
    done: ["Draw full RAG pipeline from memory", "System answers questions from documents"],
    project: { title: "Full RAG pipeline", desc: "Chunk PDF → generate embeddings via OpenAI → store in ChromaDB. Add /ask endpoint: takes a question, finds relevant chunks, sends to GPT with context, returns answer." }
  },
  {
    num: 7, title: "React Frontend", subtitle: "Full-Stack",
    color: "#059669", light: "#F0FDF4", emoji: "⚛️",
    hours: { learn: 3, build: 7 },
    prerequisites: [
      { label: "Node.js + npm installed", note: "You already did this today ✓", done: true },
      { label: "Week 6 complete", note: "Working RAG backend with /ask endpoint", done: false },
      { label: "Basic JavaScript knowledge", note: "Variables, functions, promises — light reading if needed" },
    ],
    learn: [
      { text: "React basics (components, JSX)", resources: [
        { type: "doc", label: "React official tutorial – react.dev", url: "https://react.dev/learn" },
        { type: "video", label: "React in 100 seconds – Fireship", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM" },
      ]},
      { text: "Components + state (useState, useEffect)", resources: [
        { type: "video", label: "React hooks in 30 min – Fireship", url: "https://www.youtube.com/watch?v=TNhaISOUy6Q" },
      ]},
      { text: "API calls from React", resources: [
        { type: "doc", label: "Fetch API – MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
      ]},
    ],
    build: ["Upload UI", "Chat interface", "Display AI responses"],
    done: ["Use frontend to talk to backend", "Demonstrate full-stack flow"],
    project: { title: "Frontend for Knowledge Assistant", desc: "Two screens: (1) Upload — drag PDF, show progress. (2) Chat — ask question, display AI answer. Connect both to FastAPI. No fancy styling needed — functional is enough." }
  },
  {
    num: 8, title: "Deploy + Interview Prep", subtitle: "Ship It",
    color: "#059669", light: "#F0FDF4", emoji: "🚀",
    hours: { learn: 2, build: 8 },
    prerequisites: [
      { label: "All 7 weeks complete", note: "Full stack app working locally", done: false },
      { label: "GitHub account", note: "You already have this ✓", done: true },
      { label: "GCP free account (optional)", note: "For real cloud deployment — sign up at cloud.google.com" },
    ],
    learn: [
      { text: "CI/CD basics", resources: [
        { type: "doc", label: "GitHub Actions quickstart", url: "https://docs.github.com/en/actions/quickstart" },
      ]},
      { text: "Logging / monitoring basics", resources: [
        { type: "doc", label: "FastAPI logging – official", url: "https://fastapi.tiangolo.com/tutorial/handling-errors/" },
      ]},
      { text: "System design overview", resources: [
        { type: "article", label: "System design primer – GitHub", url: "https://github.com/donnemartin/system-design-primer" },
        { type: "article", label: "How to explain projects in interviews – Jordan Cutler", url: "https://read.highgrowthengineer.com/p/how-to-explain-projects-in-tech-interviews" },
      ]},
    ],
    build: ["Docker Compose final system", "Clean UI + bug fixes", "Deploy (GCP / local demo)", "Prepare demo script"],
    done: ["Present project end-to-end in 5 minutes", "Explain architecture clearly"],
    project: { title: "Final: full system + demo", desc: "Compose all services. Single docker-compose up launches everything. Write 5-minute demo script: what it does, how it's built, one technical challenge you solved." }
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

const TYPE_STYLE = {
  doc:     { bg: "#EFF6FF", color: "#1E40AF", label: "docs" },
  video:   { bg: "#FEF3C7", color: "#92400E", label: "video" },
  article: { bg: "#F0FDF4", color: "#166534", label: "article" },
  course:  { bg: "#F5F3FF", color: "#5B21B6", label: "course" },
};

const STORAGE_KEY = "ai4all_tracker_v2";

function loadState() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}
function initState() {
  const saved = loadState();
  if (saved) return saved;
  const c = {};
  WEEKS.forEach(w => {
    c[`w${w.num}_learn`] = w.learn.map(() => false);
    c[`w${w.num}_build`] = w.build.map(() => false);
    c[`w${w.num}_done`]  = w.done.map(() => false);
    c[`w${w.num}_pre`]   = w.prerequisites.map(p => p.done || false);
    c[`w${w.num}_res`]   = w.learn.map(l => l.resources.map(() => false));
  });
  Object.keys(SKILLS).forEach(cat => { c[`skill_${cat}`] = SKILLS[cat].items.map(() => false); });
  c.interview = INTERVIEW_CHECKLIST.map(() => false);
  return c;
}

function ProgressRing({ pct, color, size = 48 }) {
  const r = (size - 6) / 2, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.4s ease" }} />
    </svg>
  );
}

function Checkbox({ checked, onChange, color, size = 20 }) {
  return (
    <button onClick={onChange} style={{
      width: size, height: size, borderRadius: 4, border: `2px solid ${checked ? color : "#D1D5DB"}`,
      background: checked ? color : "white", cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s", padding: 0
    }}>
      {checked && <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M1 4L4.5 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </button>
  );
}

function ResourceBadge({ type }) {
  const s = TYPE_STYLE[type] || TYPE_STYLE.article;
  return <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: s.bg, color: s.color, flexShrink: 0 }}>{s.label}</span>;
}

export default function App() {
  const [checks, setChecks] = useState(initState);
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [weekTab, setWeekTab] = useState("learn");

  useEffect(() => { saveState(checks); }, [checks]);

  function toggle(key, idx) {
    setChecks(prev => { const a = [...(prev[key] || [])]; a[idx] = !a[idx]; return { ...prev, [key]: a }; });
  }
  function toggleRes(weekNum, learnIdx, resIdx) {
    setChecks(prev => {
      const matrix = (prev[`w${weekNum}_res`] || WEEKS.find(w=>w.num===weekNum).learn.map(l=>l.resources.map(()=>false))).map(r=>[...r]);
      matrix[learnIdx][resIdx] = !matrix[learnIdx][resIdx];
      return { ...prev, [`w${weekNum}_res`]: matrix };
    });
  }

  function weekPct(w) {
    const all = [...(checks[`w${w.num}_learn`]||[]), ...(checks[`w${w.num}_build`]||[]), ...(checks[`w${w.num}_done`]||[])];
    return all.length ? Math.round(all.filter(Boolean).length / all.length * 100) : 0;
  }
  function overallPct() {
    const all = WEEKS.flatMap(w => [...(checks[`w${w.num}_learn`]||[]), ...(checks[`w${w.num}_build`]||[]), ...(checks[`w${w.num}_done`]||[])]);
    return Math.round(all.filter(Boolean).length / all.length * 100);
  }
  function skillsPct() {
    const all = Object.keys(SKILLS).flatMap(cat => checks[`skill_${cat}`] || []);
    return Math.round(all.filter(Boolean).length / all.length * 100);
  }
  function interviewPct() {
    const arr = checks.interview || [];
    return arr.length ? Math.round(arr.filter(Boolean).length / arr.length * 100) : 0;
  }
  function resPct(weekNum) {
    const w = WEEKS.find(x => x.num === weekNum);
    const matrix = checks[`w${weekNum}_res`] || w.learn.map(l => l.resources.map(() => false));
    const all = matrix.flat();
    return all.length ? Math.round(all.filter(Boolean).length / all.length * 100) : 0;
  }
  function prePct(weekNum) {
    const arr = checks[`w${weekNum}_pre`] || [];
    return arr.length ? Math.round(arr.filter(Boolean).length / arr.length * 100) : 0;
  }

  const week = WEEKS.find(w => w.num === activeWeek);

  const WEEK_TABS = [
    { id: "prereqs", label: "Prerequisites" },
    { id: "learn",   label: "Learn" },
    { id: "build",   label: "Build" },
    { id: "done",    label: "Done When" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#F8FAFC", minHeight: "100vh", color: "#1E293B" }}>
      {/* Top nav */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "14px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🚀</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>AI4All Career Transition Plan</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>Embedded Linux → AI Application Engineer · 8 Weeks</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ProgressRing pct={overallPct()} color="#1A56DB" size={40} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1A56DB", lineHeight: 1 }}>{overallPct()}%</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>overall</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[["roadmap","📅 Roadmap"],["skills","🧠 Skills"],["interview","🧪 Interview"]].map(([id,label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                background: activeTab === id ? "#1A56DB" : "transparent", color: activeTab === id ? "white" : "#64748B"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── ROADMAP TAB ── */}
        {activeTab === "roadmap" && (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
            {/* Sidebar */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Weeks</div>
              {WEEKS.map(w => {
                const pct = weekPct(w), isActive = activeWeek === w.num;
                return (
                  <button key={w.num} onClick={() => { setActiveWeek(w.num); setWeekTab("learn"); }} style={{
                    width: "100%", textAlign: "left", padding: "9px 10px", borderRadius: 8,
                    border: isActive ? `1.5px solid ${w.color}` : "1.5px solid transparent",
                    background: isActive ? w.light : "white", cursor: "pointer", marginBottom: 3, display: "block"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 14 }}>{w.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: isActive ? w.color : "#374151" }}>Week {w.num}</div>
                        <div style={{ fontSize: 10, color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.title}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: pct === 100 ? "#059669" : isActive ? w.color : "#9CA3AF" }}>{pct}%</span>
                    </div>
                    <div style={{ marginTop: 4, height: 2, borderRadius: 1, background: "#E5E7EB" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#059669" : w.color, borderRadius: 1, transition: "width 0.3s" }} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main panel */}
            {week && (
              <div>
                {/* Week hero */}
                <div style={{ background: week.color, borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 2 }}>Week {week.num} of 8</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>{week.emoji} {week.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{week.subtitle}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "white" }}>📘 {week.hours.learn}h learning</span>
                        <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "white" }}>🛠 {week.hours.build}h building</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <div style={{ position: "relative", width: 52, height: 52 }}>
                        <ProgressRing pct={weekPct(week)} color="rgba(255,255,255,0.9)" size={52} />
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 12, fontWeight: 700, color: "white" }}>{weekPct(week)}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week sub-tabs */}
                <div style={{ display: "flex", gap: 4, marginBottom: 12, background: "white", padding: "6px", borderRadius: 10, border: "1px solid #E2E8F0" }}>
                  {WEEK_TABS.map(t => {
                    let badge = null;
                    if (t.id === "prereqs") badge = `${prePct(week.num)}%`;
                    if (t.id === "learn")   badge = `${resPct(week.num)}% read`;
                    return (
                      <button key={t.id} onClick={() => setWeekTab(t.id)} style={{
                        flex: 1, padding: "6px 8px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                        background: weekTab === t.id ? week.color : "transparent",
                        color: weekTab === t.id ? "white" : "#64748B", display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                      }}>
                        {t.label}
                        {badge && <span style={{ fontSize: 10, background: weekTab === t.id ? "rgba(255,255,255,0.25)" : "#F1F5F9", borderRadius: 10, padding: "1px 5px", color: weekTab === t.id ? "white" : "#64748B" }}>{badge}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Prerequisites */}
                {weekTab === "prereqs" && (
                  <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Before starting Week {week.num}, make sure you have:</div>
                    {week.prerequisites.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < week.prerequisites.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                        <Checkbox checked={checks[`w${week.num}_pre`]?.[i] || false} onChange={() => toggle(`w${week.num}_pre`, i)} color={week.color} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: checks[`w${week.num}_pre`]?.[i] ? "#9CA3AF" : "#1E293B",
                            textDecoration: checks[`w${week.num}_pre`]?.[i] ? "line-through" : "none" }}>{p.label}</div>
                          <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{p.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Learn + Resources */}
                {weekTab === "learn" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {week.learn.map((item, li) => {
                      const resChecks = checks[`w${week.num}_res`]?.[li] || item.resources.map(() => false);
                      const topicDone = checks[`w${week.num}_learn`]?.[li] || false;
                      return (
                        <div key={li} style={{ background: "white", borderRadius: 10, border: `1px solid ${topicDone ? week.color+"40" : "#E2E8F0"}`, padding: 14,
                          background: topicDone ? week.light : "white" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                            <Checkbox checked={topicDone} onChange={() => toggle(`w${week.num}_learn`, li)} color={week.color} />
                            <div style={{ fontSize: 14, fontWeight: 600, color: topicDone ? "#9CA3AF" : "#1E293B",
                              textDecoration: topicDone ? "line-through" : "none" }}>{item.text}</div>
                          </div>
                          <div style={{ paddingLeft: 28 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Resources</div>
                            {item.resources.map((res, ri) => (
                              <div key={ri} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "6px 8px", borderRadius: 6,
                                background: resChecks[ri] ? "#F0FDF4" : "#F8FAFC", border: "1px solid " + (resChecks[ri] ? "#BBF7D0" : "#E2E8F0") }}>
                                <Checkbox checked={resChecks[ri]} onChange={() => toggleRes(week.num, li, ri)} color="#059669" size={16} />
                                <ResourceBadge type={res.type} />
                                <a href={res.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#1A56DB", textDecoration: "none", flex: 1 }}
                                  onMouseOver={e=>e.target.style.textDecoration="underline"} onMouseOut={e=>e.target.style.textDecoration="none"}>
                                  {res.label} ↗
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Build */}
                {weekTab === "build" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>🛠 Build tasks this week:</div>
                      {week.build.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                          <Checkbox checked={checks[`w${week.num}_build`]?.[i] || false} onChange={() => toggle(`w${week.num}_build`, i)} color={week.color} />
                          <span style={{ fontSize: 13, color: checks[`w${week.num}_build`]?.[i] ? "#9CA3AF" : "#374151",
                            textDecoration: checks[`w${week.num}_build`]?.[i] ? "line-through" : "none", lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: week.light, borderRadius: 10, border: `1px solid ${week.color}30`, padding: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: week.color, marginBottom: 6 }}>🎯 Week project</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", marginBottom: 4 }}>{week.project.title}</div>
                      <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>{week.project.desc}</div>
                    </div>
                  </div>
                )}

                {/* Done when */}
                {weekTab === "done" && (
                  <div style={{ background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0", padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 12 }}>✅ You can move to next week when:</div>
                    {week.done.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0",
                        borderBottom: i < week.done.length - 1 ? "1px solid #DCFCE7" : "none" }}>
                        <Checkbox checked={checks[`w${week.num}_done`]?.[i] || false} onChange={() => toggle(`w${week.num}_done`, i)} color="#059669" />
                        <span style={{ fontSize: 13, fontWeight: 500, color: checks[`w${week.num}_done`]?.[i] ? "#9CA3AF" : "#1E293B",
                          textDecoration: checks[`w${week.num}_done`]?.[i] ? "line-through" : "none", lineHeight: 1.5 }}>{item}</span>
                        {checks[`w${week.num}_done`]?.[i] && <span style={{ marginLeft: "auto", fontSize: 16 }}>✅</span>}
                      </div>
                    ))}
                    {week.done.every((_, i) => checks[`w${week.num}_done`]?.[i]) && (
                      <div style={{ marginTop: 14, padding: "10px 14px", background: "#059669", borderRadius: 8, textAlign: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Week {week.num} complete! 🎉</div>
                        {week.num < 8 && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Move on to Week {week.num + 1}</div>}
                      </div>
                    )}
                  </div>
                )}

                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                  <button onClick={() => { setActiveWeek(Math.max(1, activeWeek-1)); setWeekTab("learn"); }} disabled={activeWeek===1}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white",
                      color: activeWeek===1 ? "#9CA3AF" : "#374151", cursor: activeWeek===1 ? "default" : "pointer", fontSize: 12 }}>
                    ← Previous
                  </button>
                  <button onClick={() => { setActiveWeek(Math.min(8, activeWeek+1)); setWeekTab("prereqs"); }} disabled={activeWeek===8}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: week.color,
                      color: "white", cursor: activeWeek===8 ? "default" : "pointer", fontSize: 12, fontWeight: 500, opacity: activeWeek===8 ? 0.5 : 1 }}>
                    Next Week →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SKILLS TAB ── */}
        {activeTab === "skills" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>🧠 Skills Progression</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>Mark skills as you learn them each week</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProgressRing pct={skillsPct()} color="#1A56DB" size={44} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1A56DB" }}>{skillsPct()}%</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Skills</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {Object.entries(SKILLS).map(([cat, { color, items }]) => {
                const catChecks = checks[`skill_${cat}`] || items.map(() => false);
                const pct = Math.round(catChecks.filter(Boolean).length / items.length * 100);
                return (
                  <div key={cat} style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color }}>{cat}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: pct===100?"#059669":color }}>{pct}%</div>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: "#E5E7EB", marginBottom: 12 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct===100?"#059669":color, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                        <Checkbox checked={catChecks[i]} onChange={() => toggle(`skill_${cat}`, i)} color={color} />
                        <span style={{ fontSize: 13, color: catChecks[i]?"#9CA3AF":"#374151", textDecoration: catChecks[i]?"line-through":"none" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div style={{ background: "white", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>🧱 Target Architecture</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {[["React Frontend","#1A56DB"],["↓","#9CA3AF"],["FastAPI Backend","#1A56DB"],["↓","#9CA3AF"],
                  ["Document Processing","#EA580C"],["↓","#9CA3AF"],["Embeddings (OpenAI)","#EA580C"],["↓","#9CA3AF"],
                  ["Vector Database (ChromaDB)","#EA580C"],["↓","#9CA3AF"],["RAG Response Engine","#059669"]
                ].map(([label,color],i) => label==="↓"
                  ? <div key={i} style={{ fontSize:16, color }}>↓</div>
                  : <div key={i} style={{ background:`${color}15`, border:`1.5px solid ${color}40`, borderRadius:7, padding:"7px 22px", fontSize:12, fontWeight:600, color }}>{label}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── INTERVIEW TAB ── */}
        {activeTab === "interview" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>🧪 Interview Readiness</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>Can you say these with confidence?</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProgressRing pct={interviewPct()} color={interviewPct()===100?"#059669":"#1A56DB"} size={44} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: interviewPct()===100?"#059669":"#1A56DB" }}>{interviewPct()}%</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Ready</div>
                </div>
              </div>
            </div>
            {interviewPct()===100 && (
              <div style={{ background:"#F0FDF4", border:"1.5px solid #86EFAC", borderRadius:12, padding:14, marginBottom:14, textAlign:"center" }}>
                <div style={{ fontSize:22, marginBottom:4 }}>🎉</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#059669" }}>You're ready for the interview!</div>
                <div style={{ fontSize:12, color:"#16A34A" }}>All boxes checked. Go get that job.</div>
              </div>
            )}
            <div style={{ background:"white", borderRadius:12, border:"1px solid #E2E8F0", padding:16, marginBottom:14 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#64748B", marginBottom:12 }}>At the end of 8 weeks, I can say:</div>
              {INTERVIEW_CHECKLIST.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 0",
                  borderBottom: i<INTERVIEW_CHECKLIST.length-1?"1px solid #F1F5F9":"none" }}>
                  <Checkbox checked={checks.interview?.[i]||false} onChange={()=>toggle("interview",i)} color="#059669" />
                  <span style={{ fontSize:13, fontWeight:500, color:checks.interview?.[i]?"#9CA3AF":"#1E293B",
                    textDecoration:checks.interview?.[i]?"line-through":"none", flex:1 }}>{item}</span>
                  {checks.interview?.[i] && <span style={{ fontSize:14 }}>✅</span>}
                </div>
              ))}
            </div>
            <div style={{ background:"#1E293B", borderRadius:12, padding:18 }}>
              <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:10 }}>🔥 Rule of Execution</div>
              <div style={{ display:"flex", gap:10 }}>
                {["3h learning","7h building","1 feature shipped"].map((r,i) => (
                  <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:800, color:"#60A5FA" }}>{r.split(" ")[0]}</div>
                    <div style={{ fontSize:11, color:"#94A3B8" }}>{r.split(" ").slice(1).join(" ")}</div>
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
