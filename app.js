const app = document.getElementById("app");

const navigationLayers = [
  {
    role: "Platform Admin",
    scope: "Global platform management",
    routes: [
      ["platform-admin", "AI Control Tower", "tower"],
      ["tenants", "Tenant Management", "mission"],
      ["team-management", "Team Management", "orbit"],
      ["roles-permissions", "Roles Permissions", "shield"],
      ["ai-providers", "AI Providers", "brain"],
      ["model-routing", "Model Routing", "flow"],
      ["usage-monitoring", "Usage Monitoring", "forecast"],
      ["enterprise-ai-governance", "AI Governance", "shield"],
      ["cost-management", "Cost Management", "forecast"],
      ["enterprise-integrations", "Integrations", "schema"],
      ["enterprise-audit", "Audit Compliance", "scan"],
      ["global-knowledge", "Global Knowledge", "db"],
      ["prompt-library", "Prompt Library", "doc"]
    ]
  },
  {
    role: "Team Manager",
    scope: "Team workspace and delivery operations",
    routes: [
      ["team-workspace", "Team Workspace", "mission"],
      ["portfolio", "Portfolio Center", "forecast"],
      ["approvals", "Approval Workflows", "flow"],
      ["delivery", "Sprint Delivery", "schema"],
      ["collaboration", "Collaboration", "mission"],
      ["risk", "Risk Intelligence", "scan"],
      ["roi", "Cost ROI Center", "forecast"],
      ["knowledge-hub", "Team Knowledge", "db"]
    ]
  },
  {
    role: "Project User",
    scope: "Independent project workspace",
    routes: [
      ["project-workspace", "Project Workspace", "orbit"],
      ["command", "AI Command Center", "mission"],
      ["twin", "Project Digital Twin", "orbit"],
      ["studio", "Requirement Studio", "scan"],
      ["orchestration", "AI Orchestration", "flow"],
      ["galaxy", "Traceability Galaxy", "galaxy"],
      ["simulator", "Impact Simulator", "spark"],
      ["versions", "Requirement Versions", "doc"],
      ["impact-engine", "Impact Engine", "spark"],
      ["brain", "Knowledge Brain", "brain"],
      ["architect", "AI Architect Studio", "schema"],
      ["warroom", "Executive War Room", "forecast"],
      ["tower", "Project Control Tower", "tower"]
    ]
  }
];

const routes = navigationLayers.flatMap((layer) => layer.routes);

const icons = {
  mission: '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6"/>',
  orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="4.5"/><ellipse cx="12" cy="12" rx="4.5" ry="9" transform="rotate(42 12 12)"/><circle cx="18.5" cy="9" r="1.5"/>',
  scan: '<path d="M4 7V5a1 1 0 0 1 1-1h2"/><path d="M17 4h2a1 1 0 0 1 1 1v2"/><path d="M20 17v2a1 1 0 0 1-1 1h-2"/><path d="M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M7 12h10"/><path d="M9 8h6"/><path d="M9 16h6"/>',
  flow: '<rect x="3" y="5" width="5" height="5" rx="1.4"/><rect x="16" y="5" width="5" height="5" rx="1.4"/><rect x="9.5" y="15" width="5" height="5" rx="1.4"/><path d="M8 7.5h8"/><path d="M18.5 10v2l-4 4"/><path d="M5.5 10v2l4 4"/>',
  galaxy: '<circle cx="5.5" cy="12" r="2.5"/><circle cx="12" cy="5" r="2.5"/><circle cx="18.5" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M7.6 10.2 10.1 7"/><path d="m13.9 7 2.5 3.2"/><path d="M16.4 13.8 13.9 17"/><path d="m10.1 17-2.5-3.2"/><path d="M8 12h8"/>',
  spark: '<path d="M13 2 9.5 10H17l-6 12 1.2-8.5H7z"/>',
  brain: '<path d="M8.5 6.5A3.2 3.2 0 0 1 14 4.2 3.6 3.6 0 0 1 20 7v1.2a3.9 3.9 0 0 1-.9 7.7 3.8 3.8 0 0 1-6.8 2.1 3.8 3.8 0 0 1-6.7-2.3A3.7 3.7 0 0 1 5 8.6a3.3 3.3 0 0 1 3.5-2.1z"/><path d="M12 5v14"/><path d="M8 10h3"/><path d="M13 14h4"/>',
  schema: '<path d="M4 5h16v5H4z"/><path d="M4 14h7v5H4z"/><path d="M13 14h7v5h-7z"/><path d="M8 10v4"/><path d="M16 10v4"/>',
  forecast: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l3-4 3 2 5-7"/><path d="M18 6h-4"/><path d="M18 6v4"/>',
  tower: '<path d="M12 3 4 7v5c0 4.8 3.2 8 8 9 4.8-1 8-4.2 8-9V7z"/><path d="M8 12h8"/><path d="M10 9h4"/><path d="M10 15h4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  shield: '<path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="m8.8 12 2.2 2.2 4.8-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h7"/>',
  code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  db: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'
};

const state = {
  modal: null,
  toast: "",
  tick: 0,
  activeLayer: "Platform Admin",
  selectedTwin: "REQ-102",
  selectedGalaxy: "REQ-102",
  galaxyZoom: 1,
  galaxyPanX: 0,
  galaxyExpanded: true,
  highlightImpact: true,
  selectedBrain: "Architecture Docs",
  selectedArchitecture: "system",
  portfolioView: "grid",
  sprintView: "kanban",
  selectedApproval: "BRD-4.2",
  selectedVersion: "v3",
  selectedIntegration: "Jira"
};

const portfolio = [
  { name: "Omni-Claims", client: "Northstar", health: 94, risk: "Low", flow: 92, x: 52, y: 30, r: 86 },
  { name: "Retail Lending", client: "Cedar Bank", health: 86, risk: "Medium", flow: 78, x: 74, y: 54, r: 68 },
  { name: "Trial Workspace", client: "HelioPharma", health: 71, risk: "Elevated", flow: 64, x: 30, y: 56, r: 54 },
  { name: "Marketplace", client: "Atlas Cloud", health: 89, risk: "Low", flow: 83, x: 60, y: 76, r: 72 },
  { name: "Field Assist", client: "MetroGrid", health: 79, risk: "Medium", flow: 69, x: 22, y: 24, r: 48 }
];

const streamEvents = [
  ["Requirement Agent", "normalized REQ-102 into 4 atomic rules", "now", "live"],
  ["Security Agent", "redacted 31 PII fields before prompt routing", "12s", "secure"],
  ["QA Agent", "generated boundary cases for payment thresholds", "38s", "ready"],
  ["BRD Agent", "attached 6 citations from private RAG memory", "1m", "memory"],
  ["Cost Router", "moved PRD refinement to cached model path", "2m", "cost"]
];

const agents = [
  ["Requirement Agent", "Streaming", "GPT-4.1", "$1.42", "42.8K", "97", "01:28"],
  ["BRD Agent", "Complete", "Azure OpenAI", "$2.18", "63.4K", "94", "03:12"],
  ["PRD Agent", "Complete", "Claude", "$2.91", "58.2K", "92", "02:46"],
  ["Story Agent", "Streaming", "GPT-4.1 mini", "$0.64", "31.7K", "95", "01:06"],
  ["Architecture Agent", "Thinking", "o3", "$3.72", "26.1K", "91", "02:04"],
  ["Developer Agent", "Queued", "GPT-4.1", "$0.00", "0", "--", "00:00"],
  ["QA Agent", "Ready", "Gemini", "$1.09", "36.5K", "93", "01:54"],
  ["Security Agent", "Complete", "Claude", "$1.34", "22.8K", "96", "01:17"],
  ["DevOps Agent", "Ready", "Azure OpenAI", "$0.82", "18.9K", "90", "00:58"]
];

const twinNodes = [
  ["REQ-102", "Requirement", 90, 210, "stable", "Payment approval threshold updated with risk override."],
  ["BRD-4.2", "BRD", 270, 120, "impacted", "Business policy section awaits compliance approval."],
  ["PRD-F12", "PRD", 450, 210, "impacted", "Feature scope now includes jurisdiction policy variants."],
  ["US-88", "Stories", 630, 120, "ready", "Three stories regenerated and sprint assigned."],
  ["CODE-API", "Code", 810, 210, "queued", "Backend implementation prompt is staged."],
  ["TC-311", "Tests", 990, 120, "ready", "Boundary, abuse, and regression tests available."]
];

const galaxyNodes = [
  ["REQ-102", "Requirement", 100, 260, "source"],
  ["REQ-108", "Requirement", 100, 420, "source"],
  ["FEAT-12", "Feature", 310, 200, "impact"],
  ["FEAT-18", "Feature", 310, 360, "normal"],
  ["US-88", "Story", 520, 150, "impact"],
  ["US-94", "Story", 520, 310, "normal"],
  ["PROMPT-BE", "Prompt", 735, 230, "impact"],
  ["PROMPT-FE", "Prompt", 735, 420, "normal"],
  ["TC-311", "Test Case", 950, 150, "impact"],
  ["TC-318", "Test Case", 950, 330, "impact"],
  ["TC-340", "Test Case", 950, 500, "normal"]
];

const galaxyEdges = [
  ["REQ-102", "FEAT-12", true],
  ["REQ-108", "FEAT-18", false],
  ["FEAT-12", "US-88", true],
  ["FEAT-18", "US-94", false],
  ["US-88", "PROMPT-BE", true],
  ["US-94", "PROMPT-FE", false],
  ["PROMPT-BE", "TC-311", true],
  ["PROMPT-BE", "TC-318", true],
  ["PROMPT-FE", "TC-340", false]
];

const knowledgeSources = [
  ["BRDs", 128, 93, "Business rules, RACI, operating models"],
  ["PRDs", 172, 89, "Feature specs, personas, prioritization"],
  ["SOPs", 74, 84, "Compliance and operating procedures"],
  ["Architecture Docs", 96, 91, "Patterns, diagrams, NFR evidence"],
  ["Coding Standards", 54, 88, "Secure coding and review guidelines"]
];

const architectureViews = {
  system: [
    ["Experience Layer", "Angular 20 shell, Material 3 controls, Tailwind tokens"],
    ["AI Orchestration Layer", "Agent router, streaming events, policy gateway"],
    ["Artifact Layer", "BRD, PRD, stories, prompts, tests, trace graph"],
    ["Knowledge Layer", "RAG memory, embeddings, citations, vector search"],
    ["Governance Layer", "RBAC, audit intelligence, cost and model controls"]
  ],
  database: [
    ["requirements", "id, version, source, quality, stability_score"],
    ["artifacts", "id, type, version, trace_refs, approval_state"],
    ["agent_runs", "agent, model, cost, tokens, quality, duration"],
    ["trace_edges", "source_id, target_id, weight, impact_level"],
    ["knowledge_chunks", "doc_id, embedding_ref, citation, freshness"]
  ],
  api: [
    ["POST /requirements/analyze", "stream requirement quality and graph nodes"],
    ["POST /orchestrations/run", "launch agent chain with policy route"],
    ["GET /traceability/graph", "return impact-ready graph edges"],
    ["POST /impact/simulate", "compare versions and recommend regeneration"],
    ["GET /executive/forecast", "portfolio prediction and usage forecast"]
  ],
  deployment: [
    ["Edge", "Vercel-style shell delivery and auth handoff"],
    ["App", "Angular SSR workspace and streaming UI channel"],
    ["AI", "provider gateway, prompt vault, model router"],
    ["Data", "Postgres, object storage, vector index"],
    ["Observability", "audit stream, cost meter, quality telemetry"]
  ]
};

const phaseProjects = [
  ["Omni-Claims", "Northstar Insurance", "Active", 94, 78, "Claims Modernization", "Aug 21", "Maya Chen"],
  ["Retail Lending", "Cedar Bank", "Review", 86, 64, "Digital Lending", "Sep 04", "Arjun Patel"],
  ["Trial Workspace", "HelioPharma", "At Risk", 71, 48, "Clinical AI", "Jul 15", "Nora Ellis"],
  ["Partner Marketplace", "Atlas Cloud", "Active", 89, 83, "Platform Growth", "Oct 02", "Iris Morgan"],
  ["Field Assist", "MetroGrid", "Planning", 79, 56, "Ops Intelligence", "Nov 11", "Leo Hart"],
  ["Trade Compliance", "Mariner Logistics", "Active", 88, 69, "Regulatory Automation", "Sep 28", "Samira Reed"]
];

const approvals = [
  ["REQ-102", "Requirements", "Maya Chen", "Compliance", "Pending", "2h", "Payment threshold change needs policy owner signoff."],
  ["BRD-4.2", "BRD", "Raj Iyer", "Business Sponsor", "Escalated", "18h", "Exception process language requires executive approval."],
  ["PRD-F12", "PRD", "Arjun Patel", "Product Council", "Pending", "5h", "Feature scope expanded for jurisdiction variants."],
  ["US-88", "User Stories", "Nora Ellis", "QA Lead", "Approved", "1d", "Acceptance criteria verified against trace links."],
  ["ARCH-07", "Architecture", "Leo Hart", "Architecture Board", "Pending", "9h", "Policy engine topology awaiting security review."],
  ["TC-311", "Test Cases", "Samira Reed", "Security", "Approved", "3h", "Boundary and tampering tests accepted."]
];

const requirementVersions = [
  ["v1", "Original Upload", "10K threshold", "Approved", "Jun 02", 71],
  ["v2", "AI Normalized", "Threshold clarified, actor added", "Superseded", "Jun 08", 78],
  ["v3", "Client Revision", "25K threshold and fraud override", "Pending", "Jun 18", 87],
  ["v4", "Draft Simulation", "Jurisdiction policy matrix added", "Draft", "Jun 19", 82]
];

const deliveryColumns = [
  ["Backlog", ["EPIC-12 Claims governance", "FEAT-18 Audit evidence", "US-104 Risk score overlay"]],
  ["Ready", ["US-88 Configurable thresholds", "US-92 Supervisor queue", "TASK-41 OpenAPI contract"]],
  ["In Sprint", ["TASK-47 Policy engine adapter", "TASK-52 Exception banner", "QA-18 Boundary automation"]],
  ["Review", ["ARCH-07 Event topology", "US-96 Rule simulator"]],
  ["Done", ["US-81 Intake validation", "TC-301 Claim creation"]]
];

const modelMetrics = [
  ["GPT", "42.8M", "$8.2K", 94, 82, "Best artifact fidelity"],
  ["Claude", "19.4M", "$5.1K", 91, 76, "Strong policy reasoning"],
  ["Gemini", "14.7M", "$2.9K", 88, 89, "Efficient QA expansion"]
];

const auditEvents = [
  ["AI decision logged", "Requirement Agent", "REQ-102 split into 4 atomic requirements", "Immutable", "09:14"],
  ["Approval escalated", "Workflow Engine", "BRD-4.2 routed to executive sponsor", "SLA breach", "10:26"],
  ["Document restored", "Maya Chen", "PRD v2 restored for comparison", "Governed", "11:03"],
  ["Prompt exported", "Leo Hart", "Backend architecture prompt sent to GitHub", "Synced", "11:48"],
  ["Compliance report generated", "Audit Bot", "SOC 2 evidence pack created", "Complete", "12:20"]
];

const collaborationThreads = [
  ["Maya Chen", "@Leo can Architecture Agent include jurisdiction-specific policy routing?", "REQ-102", "Open"],
  ["Leo Hart", "Added an event topology option and linked it to ARCH-07.", "ARCH-07", "Resolved"],
  ["Nora Ellis", "@Samira please review tampering tests before release freeze.", "TC-318", "Open"],
  ["Samira Reed", "Approved with one note: redact claim amount in debug logs.", "SEC-12", "Review"]
];

const riskSignals = [
  ["Delivery risk", "Sprint 18 scope growth from requirement v3", 68, "Mitigate by regenerating story split and moving reporting cards to Sprint 19."],
  ["Requirement risk", "Jurisdiction policy source not attached", 74, "Attach SOP-PAY-17 and request compliance owner approval."],
  ["Dependency risk", "Policy engine API blocks QA automation", 61, "Create contract mock and parallelize test data setup."],
  ["Quality risk", "Security acceptance criteria thin on audit export", 56, "Run Security Agent and QA Agent in paired regeneration mode."]
];

const roiSignals = [
  ["Documentation time saved", "1,840 hrs", "BRD, PRD, stories, QA generation"],
  ["AI costs", "$16.2K", "All providers, month to date"],
  ["Resource savings", "$342K", "Analyst, QA, architecture effort avoided"],
  ["Productivity lift", "4.8x", "Artifact throughput per delivery pod"],
  ["ROI", "21.1x", "Validated by cycle-time baseline"]
];

const enterpriseKnowledge = [
  ["Past Projects", "214 programs", "Reusable patterns from insurance, banking, healthcare, logistics"],
  ["BRD Library", "128 docs", "Approved business requirement templates and examples"],
  ["PRD Library", "172 docs", "Feature specs, personas, NFRs, prioritization models"],
  ["Templates", "48 packs", "BRD, PRD, story, prompt, QA, architecture starter kits"],
  ["Best Practices", "96 playbooks", "Secure coding, review, approval, and compliance guides"]
];

const integrations = [
  ["Jira", "Connected", 98, "Stories, epics, sprint fields", "12 synced today"],
  ["Azure DevOps", "Connected", 94, "Boards, repos, test plans", "8 pipelines mapped"],
  ["GitHub", "Connected", 91, "Issues, PRs, code prompts", "16 prompt packs"],
  ["GitLab", "Ready", 72, "Issues and merge requests", "OAuth pending"],
  ["Confluence", "Connected", 88, "Knowledge pages and SOPs", "42 pages indexed"],
  ["SharePoint", "Connected", 83, "Document libraries", "18 BRDs indexed"],
  ["Slack", "Connected", 96, "Notifications and approvals", "31 mentions routed"],
  ["Teams", "Connected", 89, "Review rooms and alerts", "6 channels mapped"]
];

const tenants = [
  ["Northstar Enterprise", "6 orgs", "38 teams", "124 projects", "$42.8K", "Healthy"],
  ["Cedar Financial Group", "4 orgs", "22 teams", "76 projects", "$31.4K", "Watch"],
  ["HelioPharma Global", "3 orgs", "18 teams", "41 projects", "$18.9K", "At Risk"],
  ["MetroGrid Utilities", "5 orgs", "26 teams", "58 projects", "$24.1K", "Healthy"]
];

const enterpriseTeams = [
  ["Business Analysis Team", "Maya Chen", "$18K", "42 projects", "86%", "BRDs, PRDs, requirement quality"],
  ["Development Team", "Leo Hart", "$32K", "31 projects", "79%", "Developer prompts, APIs, code handoff"],
  ["QA Team", "Nora Ellis", "$21K", "37 projects", "92%", "Test generation, coverage, regression"],
  ["DevOps Team", "Iris Morgan", "$14K", "19 projects", "74%", "Pipelines, deployment, integration sync"],
  ["Architecture Team", "Samira Reed", "$26K", "24 projects", "88%", "Architecture, security, governance"]
];

const providers = [
  ["OpenAI", "Enabled", "GPT-4.1", "GPT-4.1 mini", "98.4%", "$8.2K"],
  ["Claude", "Enabled", "Claude Sonnet", "Claude Haiku", "96.7%", "$5.1K"],
  ["Gemini", "Enabled", "Gemini Pro", "Gemini Flash", "95.1%", "$2.9K"],
  ["Azure OpenAI", "Default", "GPT-4.1", "GPT-4.1 mini", "99.2%", "$11.7K"],
  ["Local Models", "Restricted", "Llama 3.1", "Mistral", "91.8%", "$1.4K"]
];

const modelRoutes = [
  ["Sensitive requirements", "Azure OpenAI", "OpenAI", "PII redaction required", "200K tokens/run"],
  ["Architecture reasoning", "OpenAI o-series", "Claude", "Board review required", "80K tokens/run"],
  ["Bulk user stories", "GPT-4.1 mini", "Gemini Flash", "Cost optimized", "500K tokens/day"],
  ["QA expansion", "Gemini Pro", "GPT-4.1 mini", "Coverage threshold 90%", "300K tokens/day"],
  ["Executive summaries", "Claude", "OpenAI", "Citation required", "60K tokens/run"]
];

const rolePermissions = [
  ["Platform Admin", "All tenants", "Configure providers, keys, budgets, routing, audit, security"],
  ["Organization Admin", "Assigned org", "Manage teams, projects, policies, knowledge sources"],
  ["Team Manager", "Assigned teams", "Allocate budgets, assign projects, monitor team performance"],
  ["Business Analyst", "Project artifacts", "Upload requirements, review BRDs, manage versions"],
  ["Product Owner", "Project delivery", "Approve PRDs, stories, priorities, releases"],
  ["Architect", "Technical design", "Approve architecture, APIs, deployment, NFRs"],
  ["Developer", "Implementation", "Use prompts, update tasks, sync code systems"],
  ["QA Engineer", "Quality", "Generate tests, validate coverage, approve QA evidence"],
  ["DevOps Engineer", "Operations", "Configure pipelines, deployment, integration workflows"],
  ["Viewer", "Read only", "View dashboards, artifacts, traceability, reports"]
];

const promptLibraries = [
  ["Global BRD Generator", "Global", "Business requirements", "Approved", "v7.2"],
  ["PRD Feature Decomposer", "Global", "Product requirements", "Approved", "v5.9"],
  ["Secure API Prompt", "Architecture Team", "API and security", "Review", "v3.4"],
  ["QA Boundary Matrix", "QA Team", "Test cases", "Approved", "v6.1"],
  ["Azure DevOps Story Export", "DevOps Team", "Delivery sync", "Draft", "v2.8"]
];

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
}

function route() {
  return location.hash.replace("#", "") || "platform-admin";
}

function layerForRoute(routeId) {
  return navigationLayers.find((layer) => layer.routes.some(([id]) => id === routeId)) || navigationLayers[0];
}

function activeNavigationLayer() {
  return navigationLayers.find((layer) => layer.role === state.activeLayer) || navigationLayers[0];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function tone(value) {
  if (value >= 90) return "good";
  if (value >= 78) return "watch";
  return "risk";
}

function chip(text, variant = "neutral") {
  return `<span class="chip ${variant}">${text}</span>`;
}

function metric(label, value, delta, variant = "cyan") {
  return `
    <article class="metric glass ${variant}">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${delta}</small>
      <i></i>
    </article>
  `;
}

function ring(value, label, variant = "cyan") {
  return `
    <div class="score-ring ${variant}" style="--score:${value * 3.6}deg">
      <strong>${value}%</strong>
      <span>${label}</span>
    </div>
  `;
}

function bars(items) {
  return `
    <div class="signal-bars">
      ${items
        .map(
          ([label, value, variant]) => `
            <div>
              <span>${label}</span>
              <b>${value}%</b>
              <i class="${variant}"><em style="width:${value}%"></em></i>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function streamPanel() {
  return `
    <section class="glass stream-panel">
      <div class="panel-head tight">
        <div>
          <span class="kicker">Live AI activity</span>
          <h2>Agent stream</h2>
        </div>
        <span class="live-pill"><i></i> streaming</span>
      </div>
      <div class="stream-list">
        ${streamEvents
          .map(
            ([agent, text, time, type]) => `
              <div class="stream-row ${type}">
                <span class="stream-dot"></span>
                <div><strong>${agent}</strong><p>${text}</p></div>
                <small>${time}</small>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function orbitVisualization() {
  return `
    <div class="orbit-stage">
      <svg viewBox="0 0 720 520" role="img" aria-label="Project orbit visualization">
        <defs>
          <linearGradient id="orbitGlow" x1="0" x2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="50%" stop-color="#a78bfa"/>
            <stop offset="100%" stop-color="#34d399"/>
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path class="grid-wave" d="M68 392 C160 330 240 454 342 382 C450 306 530 428 652 336"/>
        <ellipse class="orbit-line one" cx="360" cy="260" rx="262" ry="112"/>
        <ellipse class="orbit-line two" cx="360" cy="260" rx="188" ry="226" transform="rotate(34 360 260)"/>
        <ellipse class="orbit-line three" cx="360" cy="260" rx="292" ry="164" transform="rotate(-18 360 260)"/>
        <g class="core">
          <circle cx="360" cy="260" r="78"/>
          <circle cx="360" cy="260" r="46"/>
          <text x="360" y="252" text-anchor="middle">AI OS</text>
          <text x="360" y="276" text-anchor="middle">live delivery graph</text>
        </g>
        ${portfolio
          .map(
            (project, index) => `
              <g class="orbit-node ${tone(project.health)}" style="--delay:${index * 0.24}s" transform="translate(${project.x * 7.2},${project.y * 5.2})">
                <circle r="${18 + index * 1.2}"></circle>
                <text y="-31" text-anchor="middle">${project.name}</text>
                <text y="39" text-anchor="middle">${project.health}% health</text>
              </g>
            `
          )
          .join("")}
      </svg>
    </div>
  `;
}

function miniWorkflowGraph() {
  return `
    <svg class="workflow-map" viewBox="0 0 720 240" role="img" aria-label="AI workflow graph">
      <defs>
        <linearGradient id="flowLine" x1="0" x2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="55%" stop-color="#a78bfa"/>
          <stop offset="100%" stop-color="#34d399"/>
        </linearGradient>
      </defs>
      ${["REQ", "BRD", "PRD", "STORY", "CODE", "QA"]
        .map((label, index) => {
          const x = 70 + index * 116;
          return `
            <g class="flow-node" transform="translate(${x},118)">
              <rect x="-42" y="-28" width="84" height="56" rx="16"></rect>
              <text text-anchor="middle" y="5">${label}</text>
            </g>
            ${index < 5 ? `<path class="flow-edge" d="M${x + 44} 118 C${x + 72} 84 ${x + 86} 152 ${x + 112} 118"/>` : ""}
          `;
        })
        .join("")}
    </svg>
  `;
}

function shell(active, content) {
  const activeLabel = routes.find(([id]) => id === active)?.[1] || "AI Command Center";
  const currentLayer = activeNavigationLayer();
  return `
    <div class="app-frame">
      <aside class="rail glass">
        <a class="brand" href="#platform-admin">
          <span>${icon("spark")}</span>
          <strong>SDLC AI</strong>
          <small>Orchestrator OS</small>
        </a>
        <div class="layer-switcher">
          ${navigationLayers
            .map(
              (layer) => `
                <button class="${state.activeLayer === layer.role ? "active" : ""}" data-layer="${layer.role}">
                  <strong>${layer.role}</strong>
                  <span>${layer.scope}</span>
                </button>
              `
            )
            .join("")}
        </div>
        <nav>
          <p>${currentLayer.role}</p>
          ${currentLayer.routes
            .map(
              ([id, label, iconName]) => `
                <a class="${active === id ? "active" : ""}" href="#${id}">
                  ${icon(iconName)}
                  <span>${label}</span>
                </a>
              `
            )
            .join("")}
        </nav>
        <div class="rail-status">
          <span class="live-pill"><i></i> live graph</span>
          <strong>${1_247 + state.tick * 7}</strong>
          <small>artifact links monitored</small>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar glass">
          <button class="icon-button menu-button" data-modal="menu" aria-label="Open menu">${icon("mission")}</button>
          <div>
            <span class="kicker">${currentLayer.scope}</span>
            <h1>${activeLabel}</h1>
          </div>
          <div class="tenant-context">
            <span>Tenant</span>
            <strong>Northstar Enterprise</strong>
          </div>
          <label class="global-search">
            ${icon("search")}
            <input value="Ask across tenants, teams, projects, artifacts, approvals, and AI usage" readonly />
          </label>
          <button class="button quiet" data-modal="blueprint">${icon("schema")} Blueprint</button>
          <button class="button primary" data-run>${icon("play")} Simulate AI run</button>
        </header>
        <main class="canvas">${content}</main>
      </section>
    </div>
    ${state.modal ? renderModal(state.modal) : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function renderModal(type) {
  if (type === "menu") {
    const currentLayer = activeNavigationLayer();
    return `
      <div class="modal-backdrop" data-close-modal>
        <section class="modal glass">
          <header><h2>${currentLayer.role}</h2><button class="icon-button" data-close-modal>${icon("plus")}</button></header>
          <div class="mobile-layer-switcher">
            ${navigationLayers.map((layer) => `<button class="${state.activeLayer === layer.role ? "active" : ""}" data-layer="${layer.role}" data-close-modal>${layer.role}</button>`).join("")}
          </div>
          <div class="mobile-menu">
            ${currentLayer.routes.map(([id, label, iconName]) => `<a href="#${id}" data-close-modal>${icon(iconName)} ${label}</a>`).join("")}
          </div>
        </section>
      </div>
    `;
  }

  return `
    <div class="modal-backdrop" data-close-modal>
      <section class="modal blueprint glass">
        <header>
          <div><span class="kicker">Product blueprint</span><h2>AI-native operating model</h2></div>
          <button class="icon-button" data-close-modal>${icon("plus")}</button>
        </header>
        <div class="blueprint-grid">
          <article>
            <h3>Hierarchy</h3>
            <p>Platform Administration, Team Management, and Project Workspace layers with isolated tenants, teams, projects, artifacts, AI policy, and audit evidence.</p>
          </article>
          <article>
            <h3>Flow</h3>
            <p>Configure providers, create tenants and teams, allocate AI budgets, run project workflows, approve artifacts, sync delivery systems, and export governance reports.</p>
          </article>
          <article>
            <h3>Architecture</h3>
            <p>Multi-tenant Angular shell, policy-aware AI orchestration, graph traceability, RAG knowledge tiers, cost telemetry, and workflow governance services.</p>
          </article>
        </div>
      </section>
    </div>
  `;
}

function renderCommandCenter() {
  return `
    <section class="hero-grid">
      <div class="hero-copy">
        <span class="kicker">Mission control</span>
        <h2>Software delivery as a living AI graph.</h2>
        <p>Every project, requirement, agent, artifact, risk, and dollar is orchestrated through one real-time operating layer.</p>
        <div class="hero-actions">
          <a class="button primary" href="#orchestration">${icon("flow")} Open live chain</a>
          <a class="button quiet" href="#galaxy">${icon("galaxy")} Trace impact</a>
        </div>
      </div>
      ${orbitVisualization()}
    </section>
    <section class="metric-strip">
      ${metric("Cost saved", "$1.84M", "+22% QoQ", "green")}
      ${metric("AI throughput", "4.8x", "artifact velocity", "cyan")}
      ${metric("Trace coverage", "96%", "portfolio average", "violet")}
      ${metric("Delivery risk", "12%", "down 31%", "amber")}
    </section>
    <section class="os-grid">
      <div class="glass span-7">
        <div class="panel-head"><div><span class="kicker">Workflow graph</span><h2>Active delivery chain</h2></div>${chip("9 agents online", "good")}</div>
        ${miniWorkflowGraph()}
      </div>
      <div class="glass span-5">
        <div class="panel-head"><div><span class="kicker">Cost monitor</span><h2>Model spend trajectory</h2></div>${chip("$42 today", "neutral")}</div>
        ${bars([
          ["Cached routes", 78, "green"],
          ["Premium reasoning", 42, "violet"],
          ["Policy savings", 64, "cyan"],
          ["Budget consumed", 37, "amber"]
        ])}
      </div>
      <div class="glass span-4">
        <div class="panel-head tight"><div><span class="kicker">Productivity heatmap</span><h2>Team lift</h2></div></div>
        <div class="heat-grid">
          ${Array.from({ length: 49 })
            .map((_, index) => `<span class="heat-${(index * 7 + index) % 5}"></span>`)
            .join("")}
        </div>
      </div>
      <div class="glass span-4">
        <div class="panel-head tight"><div><span class="kicker">Usage timeline</span><h2>AI flow rate</h2></div></div>
        <svg class="timeline" viewBox="0 0 360 190">
          <path class="timeline-grid" d="M24 40H336M24 82H336M24 124H336M24 166H336"/>
          <path class="timeline-area" d="M24 150 C68 122 82 88 120 104 C160 122 174 42 214 66 C256 92 270 34 336 48 L336 170 L24 170Z"/>
          <path class="timeline-line" d="M24 150 C68 122 82 88 120 104 C160 122 174 42 214 66 C256 92 270 34 336 48"/>
        </svg>
      </div>
      <div class="glass span-4 insights">
        <div class="panel-head tight"><div><span class="kicker">AI insights</span><h2>Next best moves</h2></div></div>
        <div class="insight-list">
          <div>${icon("spark")} Regenerate PRD-F12 before sprint lock.</div>
          <div>${icon("shield")} Route security agent through PII policy pack.</div>
          <div>${icon("forecast")} Pull Atlas Cloud forecast forward by 6 days.</div>
        </div>
      </div>
      <div class="span-12">${streamPanel()}</div>
    </section>
  `;
}

function renderTwinGraph() {
  const map = Object.fromEntries(twinNodes.map((node) => [node[0], node]));
  const edges = [["REQ-102", "BRD-4.2"], ["BRD-4.2", "PRD-F12"], ["PRD-F12", "US-88"], ["US-88", "CODE-API"], ["CODE-API", "TC-311"]];
  return `
    <svg class="twin-graph" viewBox="0 0 1080 360" role="img" aria-label="Interactive project digital twin graph">
      <defs>
        <linearGradient id="twinFlow" x1="0" x2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="55%" stop-color="#a78bfa"/>
          <stop offset="100%" stop-color="#34d399"/>
        </linearGradient>
      </defs>
      ${edges
        .map(([from, to]) => {
          const a = map[from];
          const b = map[to];
          return `<path class="graph-edge impact-flow" d="M${a[2] + 62} ${a[3]} C${a[2] + 110} ${a[3] - 80} ${b[2] - 110} ${b[3] + 80} ${b[2] - 62} ${b[3]}"/>`;
        })
        .join("")}
      ${twinNodes
        .map(
          ([id, type, x, y, status]) => `
            <g class="artifact-node ${status} ${state.selectedTwin === id ? "selected" : ""}" data-twin-node="${id}" transform="translate(${x},${y})">
              <rect x="-66" y="-34" width="132" height="68" rx="18"></rect>
              <text y="-5" text-anchor="middle">${id}</text>
              <text y="17" text-anchor="middle">${type}</text>
            </g>
          `
        )
        .join("")}
    </svg>
  `;
}

function renderTwin() {
  const selected = twinNodes.find((node) => node[0] === state.selectedTwin) || twinNodes[0];
  return `
    <section class="screen-grid twin-layout">
      <div class="glass span-8 twin-stage">
        <div class="panel-head"><div><span class="kicker">Project digital twin</span><h2>Omni-Claims delivery graph</h2></div>${chip("stream synced", "good")}</div>
        ${renderTwinGraph()}
      </div>
      <aside class="glass span-4 twin-side">
        <div class="panel-head tight"><div><span class="kicker">${selected[1]}</span><h2>${selected[0]}</h2></div>${chip(selected[4], selected[4])}</div>
        <p>${selected[5]}</p>
        <div class="score-stack">
          ${ring(94, "Health", "green")}
          ${ring(91, "AI confidence", "cyan")}
        </div>
        ${bars([
          ["Traceability", 96, "green"],
          ["Requirement stability", 82, "cyan"],
          ["Delivery risk", 28, "amber"],
          ["Regeneration debt", 16, "violet"]
        ])}
      </aside>
      <div class="glass span-3">${metric("Health score", "94", "enterprise ready", "green")}</div>
      <div class="glass span-3">${metric("AI confidence", "91%", "with citations", "cyan")}</div>
      <div class="glass span-3">${metric("Delivery risk", "Low", "2 blockers", "amber")}</div>
      <div class="glass span-3">${metric("Stability", "82%", "v3.2 baseline", "violet")}</div>
    </section>
  `;
}

function renderStudio() {
  return `
    <section class="studio-grid">
      <div class="glass upload-studio">
        <div class="upload-core">
          ${icon("upload")}
          <h2>Drop raw client requirements</h2>
          <p>PDF, DOCX, transcripts, spreadsheets, diagrams, and legacy stories become one governed requirement graph.</p>
          <div>${chip("PDF", "neutral")} ${chip("DOCX", "neutral")} ${chip("XLSX", "neutral")} ${chip("Confluence", "neutral")}</div>
        </div>
        <div class="scan-lines"></div>
      </div>
      <div class="glass quality-panel">
        <div class="panel-head tight"><div><span class="kicker">Quality score</span><h2>Requirement intelligence</h2></div></div>
        <div class="score-stack">${ring(87, "Quality", "green")}${ring(76, "Stability", "amber")}</div>
      </div>
      <div class="glass">
        <div class="panel-head tight"><div><span class="kicker">Ambiguity detection</span><h2>Needs clarification</h2></div>${chip("8 found", "watch")}</div>
        <div class="issue-list">
          <div><strong>Approval owner unclear</strong><span>REQ-102, REQ-108</span></div>
          <div><strong>Latency target missing</strong><span>NFR payment validation</span></div>
          <div><strong>Jurisdiction policy source absent</strong><span>Compliance dependency</span></div>
        </div>
      </div>
      <div class="glass">
        <div class="panel-head tight"><div><span class="kicker">Missing alerts</span><h2>AI gap scan</h2></div>${chip("critical", "risk")}</div>
        ${bars([
          ["Non-functional coverage", 63, "amber"],
          ["Security acceptance", 54, "violet"],
          ["Data retention", 42, "amber"],
          ["Audit export", 88, "green"]
        ])}
      </div>
      <div class="glass">
        <div class="panel-head tight"><div><span class="kicker">Duplicate detection</span><h2>Semantic overlap</h2></div>${chip("11 clusters", "neutral")}</div>
        <div class="duplicate-map">
          ${Array.from({ length: 18 }).map((_, i) => `<span style="--x:${8 + (i * 17) % 82}%;--y:${14 + (i * 29) % 68}%"></span>`).join("")}
        </div>
      </div>
      <div class="glass knowledge-graph-small">
        <div class="panel-head tight"><div><span class="kicker">Requirement graph</span><h2>Extracted knowledge</h2></div></div>
        ${miniKnowledgeGraph("studio")}
      </div>
      <div class="glass recommendations-wide">
        <div class="panel-head tight"><div><span class="kicker">AI recommendations</span><h2>Next actions</h2></div></div>
        <div class="recommendation-row">
          <div>${icon("scan")} Split REQ-102 into threshold, risk override, and jurisdiction rules.</div>
          <div>${icon("brain")} Pull SOP-PAY-17 and secure logging standard into context.</div>
          <div>${icon("flow")} Trigger BRD and PRD regeneration after SME confirmation.</div>
        </div>
      </div>
    </section>
  `;
}

function renderOrchestration() {
  return `
    <section class="orchestration-layout">
      <div class="glass agent-flow-stage">
        <div class="panel-head"><div><span class="kicker">AI orchestration center</span><h2>Nine-agent delivery pipeline</h2></div>${chip("data flowing", "good")}</div>
        <div class="agent-grid">
          ${agents
            .map(
              ([name, status, model, cost, tokens, quality, duration], index) => `
                <article class="agent-tile ${status.toLowerCase()}">
                  <span class="agent-number">${index + 1}</span>
                  <header><h3>${name}</h3>${chip(status, status.toLowerCase())}</header>
                  <div class="thinking"><i></i><i></i><i></i></div>
                  <dl>
                    <div><dt>Model</dt><dd>${model}</dd></div>
                    <div><dt>Cost</dt><dd>${cost}</dd></div>
                    <div><dt>Tokens</dt><dd>${tokens}</dd></div>
                    <div><dt>Quality</dt><dd>${quality}${quality === "--" ? "" : "%"}</dd></div>
                    <div><dt>Duration</dt><dd>${duration}</dd></div>
                  </dl>
                  <div class="tile-flow"></div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <aside class="glass orchestration-side">
        <div class="panel-head tight"><div><span class="kicker">Streaming response</span><h2>Agent thought trace</h2></div></div>
        <div class="code-stream">
          <p>Analyzing REQ-102...</p>
          <p>Linking business policy to SOP-PAY-17...</p>
          <p>Generating PRD feature delta...</p>
          <p>Preparing QA boundary matrix...</p>
          <span></span>
        </div>
        ${bars([
          ["Pipeline completion", 62, "cyan"],
          ["Quality gate", 94, "green"],
          ["Cost efficiency", 81, "violet"],
          ["Review readiness", 73, "amber"]
        ])}
      </aside>
    </section>
  `;
}

function nodeMap(nodes) {
  return Object.fromEntries(nodes.map((node) => [node[0], node]));
}

function renderGalaxy() {
  const visibleNodes = state.galaxyExpanded ? galaxyNodes : galaxyNodes.filter((node) => !node[0].startsWith("TC-34") && !node[0].startsWith("REQ-108"));
  const visibleMap = nodeMap(visibleNodes);
  const visibleEdges = galaxyEdges.filter(([from, to]) => visibleMap[from] && visibleMap[to]);
  const selected = galaxyNodes.find((node) => node[0] === state.selectedGalaxy) || galaxyNodes[0];
  return `
    <section class="galaxy-layout">
      <div class="glass galaxy-stage">
        <div class="panel-head">
          <div><span class="kicker">Traceability galaxy</span><h2>Requirement to delivery evidence</h2></div>
          <div class="graph-controls">
            <button class="icon-button" data-galaxy-action="zoom-out" aria-label="Zoom out">${icon("minus")}</button>
            <button class="icon-button" data-galaxy-action="zoom-in" aria-label="Zoom in">${icon("plus")}</button>
            <button class="button quiet" data-galaxy-action="pan">${icon("arrow")} Pan</button>
            <button class="button quiet" data-galaxy-action="expand">${state.galaxyExpanded ? "Collapse" : "Expand"}</button>
            <button class="button primary" data-galaxy-action="highlight">Impact path</button>
          </div>
        </div>
        <div class="galaxy-viewport">
          <svg style="transform:translateX(${state.galaxyPanX}px) scale(${state.galaxyZoom})" class="galaxy-svg ${state.highlightImpact ? "highlight" : ""}" viewBox="0 0 1080 620" role="img" aria-label="Interactive traceability graph">
            ${visibleEdges
              .map(([from, to, impact]) => {
                const a = visibleMap[from];
                const b = visibleMap[to];
                return `<path class="galaxy-edge ${impact ? "impact" : ""}" d="M${a[2] + 64} ${a[3]} C${a[2] + 124} ${a[3] - 90} ${b[2] - 124} ${b[3] + 90} ${b[2] - 64} ${b[3]}"/>`;
              })
              .join("")}
            ${visibleNodes
              .map(
                ([id, type, x, y, kind]) => `
                  <g class="galaxy-node ${kind} ${state.selectedGalaxy === id ? "selected" : ""}" data-galaxy-node="${id}" transform="translate(${x},${y})">
                    <rect x="-66" y="-31" width="132" height="62" rx="18"></rect>
                    <text y="-4" text-anchor="middle">${id}</text>
                    <text y="17" text-anchor="middle">${type}</text>
                  </g>
                `
              )
              .join("")}
          </svg>
        </div>
      </div>
      <aside class="glass galaxy-inspector">
        <div class="panel-head tight"><div><span class="kicker">${selected[1]}</span><h2>${selected[0]}</h2></div>${chip(selected[4], selected[4])}</div>
        <p>Impact path highlighting is ${state.highlightImpact ? "active" : "paused"}. Zoom is ${Math.round(state.galaxyZoom * 100)}%.</p>
        ${bars([
          ["Upstream confidence", 93, "green"],
          ["Downstream coverage", 88, "cyan"],
          ["Regeneration urgency", selected[4] === "impact" ? 78 : 32, selected[4] === "impact" ? "amber" : "green"]
        ])}
      </aside>
    </section>
  `;
}

function renderSimulator() {
  return `
    <section class="simulator-layout">
      <div class="glass version-card">
        <div class="panel-head tight"><div><span class="kicker">Requirement V1</span><h2>Baseline rule</h2></div>${chip("stable", "neutral")}</div>
        <p>Supervisor approval required for payment adjustments above 10,000.</p>
      </div>
      <div class="glass version-card current">
        <div class="panel-head tight"><div><span class="kicker">Requirement V2</span><h2>Updated rule</h2></div>${chip("changed", "watch")}</div>
        <p>Supervisor approval required above 25,000 with fraud-risk override and jurisdiction-specific policies.</p>
      </div>
      <div class="glass change-panel">
        <div class="panel-head tight"><div><span class="kicker">Changes detected</span><h2>Semantic diff</h2></div></div>
        <div class="change-list">
          <div><strong>Threshold changed</strong><span>10,000 to 25,000</span></div>
          <div><strong>Risk condition added</strong><span>Fraud-risk override</span></div>
          <div><strong>Policy axis added</strong><span>Jurisdiction variants</span></div>
        </div>
      </div>
      <div class="glass heatmap-panel">
        <div class="panel-head"><div><span class="kicker">Dependency heatmap</span><h2>Affected artifacts</h2></div>${chip("17 updates", "risk")}</div>
        <div class="dependency-heatmap">
          ${["BRD", "PRD", "Stories", "Prompts", "Tests", "Security"]
            .flatMap((row, rowIndex) =>
              Array.from({ length: 9 }).map((_, col) => `<span class="heat-${clamp(rowIndex + col - 2, 0, 4)}">${col === 0 ? row : ""}</span>`)
            )
            .join("")}
        </div>
      </div>
      <div class="glass regen-panel">
        <div class="panel-head tight"><div><span class="kicker">Regeneration recommendations</span><h2>AI action plan</h2></div></div>
        <div class="action-list">
          <div>${icon("doc")} Regenerate BRD 4.2 and compliance RACI.</div>
          <div>${icon("schema")} Update PRD-F12 with policy variants.</div>
          <div>${icon("code")} Refresh backend and API prompts.</div>
          <div>${icon("shield")} Expand abuse, boundary, and audit tests.</div>
        </div>
      </div>
      <div class="glass risk-panel">
        <div class="panel-head tight"><div><span class="kicker">Risk indicators</span><h2>Forecast impact</h2></div></div>
        ${bars([
          ["Scope movement", 64, "amber"],
          ["QA expansion", 72, "violet"],
          ["Compliance delay", 48, "amber"],
          ["Sprint confidence", 86, "green"]
        ])}
      </div>
    </section>
  `;
}

function miniKnowledgeGraph(context = "brain") {
  const nodes = context === "studio"
    ? [["REQ", 110, 120], ["Policy", 245, 70], ["Risk", 260, 170], ["NFR", 390, 120]]
    : [["BRD", 120, 170], ["PRD", 280, 90], ["SOP", 470, 170], ["Arch", 640, 90], ["Code", 810, 170], ["Audit", 470, 310]];
  return `
    <svg class="knowledge-svg" viewBox="0 0 ${context === "studio" ? 500 : 930} 390" role="img" aria-label="Knowledge graph">
      ${nodes
        .slice(1)
        .map(([label, x, y]) => `<path class="knowledge-edge" d="M${nodes[0][1]} ${nodes[0][2]} C${x - 80} ${y - 80} ${x - 40} ${y + 80} ${x} ${y}"/>`)
        .join("")}
      ${nodes
        .map(([label, x, y], index) => `
          <g class="knowledge-node ${state.selectedBrain === label ? "selected" : ""}" data-brain-node="${label}" transform="translate(${x},${y})">
            <circle r="${index === 0 ? 42 : 34}"></circle>
            <text text-anchor="middle" y="5">${label}</text>
          </g>
        `)
        .join("")}
    </svg>
  `;
}

function renderBrain() {
  const selected = knowledgeSources.find(([name]) => name === state.selectedBrain) || knowledgeSources[3];
  return `
    <section class="brain-layout">
      <div class="glass brain-stage">
        <div class="panel-head"><div><span class="kicker">Knowledge brain</span><h2>Private SDLC memory graph</h2></div>${chip("RAG citations online", "good")}</div>
        ${miniKnowledgeGraph("brain")}
      </div>
      <aside class="glass brain-side">
        <div class="panel-head tight"><div><span class="kicker">Selected memory</span><h2>${selected[0]}</h2></div>${chip(`${selected[2]}% fresh`, "good")}</div>
        <p>${selected[3]}</p>
        ${bars([
          ["Retrieval precision", selected[2], "green"],
          ["Citation density", 86, "cyan"],
          ["Embedding freshness", 79, "amber"]
        ])}
      </aside>
      <div class="knowledge-source-row">
        ${knowledgeSources
          .map(
            ([name, count, freshness, summary]) => `
              <button class="glass source-pill ${state.selectedBrain === name ? "active" : ""}" data-brain-source="${name}">
                ${icon(name === "Coding Standards" ? "code" : name === "SOPs" ? "shield" : "doc")}
                <strong>${name}</strong>
                <span>${count} docs / ${freshness}%</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderArchitect() {
  const active = state.selectedArchitecture;
  const items = architectureViews[active];
  return `
    <section class="architect-layout">
      <div class="glass architect-stage">
        <div class="panel-head">
          <div><span class="kicker">AI architect studio</span><h2>Generated technical topology</h2></div>
          <div class="segmented">
            ${Object.keys(architectureViews)
              .map((key) => `<button class="${active === key ? "active" : ""}" data-arch-view="${key}">${key}</button>`)
              .join("")}
          </div>
        </div>
        <svg class="architecture-svg" viewBox="0 0 920 520" role="img" aria-label="Architecture visualization">
          <defs>
            <linearGradient id="archGradient" x1="0" x2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#34d399"/></linearGradient>
          </defs>
          ${items
            .map((item, index) => {
              const x = 110 + (index % 3) * 305;
              const y = 110 + Math.floor(index / 3) * 190;
              return `
                ${index ? `<path class="arch-edge" d="M${x - 120} ${y} C${x - 70} ${y - 80} ${x - 20} ${y + 80} ${x + 40} ${y}"/>` : ""}
                <g class="arch-node" transform="translate(${x},${y})">
                  <rect x="-94" y="-46" width="188" height="92" rx="20"></rect>
                  <text y="-7" text-anchor="middle">${item[0]}</text>
                  <text y="18" text-anchor="middle">${active}</text>
                </g>
              `;
            })
            .join("")}
        </svg>
      </div>
      <aside class="glass architect-side">
        <div class="panel-head tight"><div><span class="kicker">Generated artifacts</span><h2>${active} view</h2></div></div>
        <div class="architecture-list">
          ${items.map(([title, body]) => `<div><strong>${title}</strong><p>${body}</p></div>`).join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderWarRoom() {
  return `
    <section class="warroom-layout">
      <div class="warroom-hero glass">
        <div><span class="kicker">Executive war room</span><h2>Board-level software delivery intelligence.</h2><p>Forecast outcomes, quantify AI leverage, and defend enterprise controls from one premium command surface.</p></div>
        ${ring(93, "Success prediction", "green")}
      </div>
      <div class="metric-strip wide">
        ${metric("Cost savings", "$1.84M", "annualized", "green")}
        ${metric("Productivity gain", "4.8x", "BA and QA lift", "cyan")}
        ${metric("AI adoption", "87%", "active users", "violet")}
        ${metric("Forecast pull-in", "19d", "portfolio average", "amber")}
      </div>
      <div class="glass span-7 forecast-panel">
        <div class="panel-head"><div><span class="kicker">Delivery forecast</span><h2>Predicted completion confidence</h2></div>${chip("Monte Carlo + AI", "neutral")}</div>
        <svg class="forecast-chart" viewBox="0 0 720 310">
          <path class="timeline-grid" d="M36 64H684M36 128H684M36 192H684M36 256H684"/>
          <path class="forecast-band" d="M36 238 C156 214 226 122 330 146 C446 174 516 86 684 74 L684 178 C520 192 448 252 330 224 C224 198 160 268 36 280Z"/>
          <path class="timeline-line" d="M36 244 C156 220 226 146 330 158 C446 174 516 104 684 86"/>
        </svg>
      </div>
      <div class="glass span-5">
        <div class="panel-head tight"><div><span class="kicker">Resource utilization</span><h2>Human + AI capacity</h2></div></div>
        ${bars([
          ["Business analysts", 84, "cyan"],
          ["Product owners", 71, "green"],
          ["Engineers", 68, "violet"],
          ["QA specialists", 92, "amber"],
          ["AI agents", 97, "green"]
        ])}
      </div>
    </section>
  `;
}

function renderTower() {
  return `
    <section class="tower-layout">
      <div class="glass tower-stage">
        <div class="panel-head"><div><span class="kicker">Platform control tower</span><h2>Unified AI governance and forecasting</h2></div>${chip("zero critical alerts", "good")}</div>
        <div class="control-mesh">
          ${["AI Providers", "Model Routing", "Cost Controls", "Security Center", "Audit Intelligence", "Usage Forecasting"]
            .map((label, index) => `
              <article class="control-tile">
                ${icon(["brain", "flow", "forecast", "shield", "scan", "mission"][index])}
                <h3>${label}</h3>
                <p>${[
                  "Azure, OpenAI, Claude, Gemini with policy-based failover.",
                  "Prompt class, sensitivity, budget, and quality-aware routing.",
                  "Spend limits, cache policy, anomaly detection, and forecasts.",
                  "SSO, RBAC, PII redaction, prompt vault, provider allowlist.",
                  "Natural-language audit intelligence with trace evidence.",
                  "Token, cost, and adoption prediction across programs."
                ][index]}</p>
              </article>
            `)
            .join("")}
        </div>
      </div>
      <aside class="glass tower-side">
        <div class="panel-head tight"><div><span class="kicker">Routing policy</span><h2>Model mix</h2></div></div>
        <div class="model-router">
          ${["Sensitive data", "Architecture reasoning", "Bulk story generation", "QA expansion", "Executive summaries"]
            .map((item, index) => `<div><span>${item}</span><strong>${["Azure", "o3", "GPT-4.1 mini", "Gemini", "Claude"][index]}</strong><i style="width:${[92, 77, 84, 69, 73][index]}%"></i></div>`)
            .join("")}
        </div>
      </aside>
    </section>
  `;
}

function viewSwitch(name, active, values) {
  return `
    <div class="segmented">
      ${values.map((value) => `<button class="${active === value ? "active" : ""}" data-view-switch="${name}:${value}">${value}</button>`).join("")}
    </div>
  `;
}

function phaseHero(kicker, title, body, actionLabel, actionHref = "#orchestration") {
  return `
    <section class="phase-hero glass">
      <div>
        <span class="kicker">${kicker}</span>
        <h2>${title}</h2>
        <p>${body}</p>
      </div>
      <a class="button primary" href="${actionHref}">${icon("arrow")} ${actionLabel}</a>
    </section>
  `;
}

function renderPortfolioVisual() {
  if (state.portfolioView === "timeline") {
    return `
      <div class="portfolio-timeline">
        ${phaseProjects
          .map(([name, client, status, health, allocation], index) => `
            <div>
              <span>${name}</span>
              <i style="--start:${8 + index * 8}%;--width:${42 + (index % 3) * 12}%"></i>
              <b>${status}</b>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  if (state.portfolioView === "roadmap") {
    return `
      <div class="roadmap-swimlanes">
        ${["Q3 Discovery", "Q3 Build", "Q4 Pilot", "Q4 Scale"]
          .map(
            (lane, index) => `
              <section>
                <h3>${lane}</h3>
                ${phaseProjects.slice(index, index + 3).map(([name, client, status]) => `<div>${chip(status, status === "At Risk" ? "risk" : status === "Review" ? "watch" : "good")}<strong>${name}</strong><span>${client}</span></div>`).join("")}
              </section>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (state.portfolioView === "dependencies") {
    return `
      <svg class="dependency-graph" viewBox="0 0 920 420" role="img" aria-label="Project dependency visualization">
        <defs><linearGradient id="portfolioFlow" x1="0" x2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#34d399"/></linearGradient></defs>
        ${phaseProjects
          .slice(1)
          .map((project, index) => `<path class="portfolio-edge" d="M170 210 C${260 + index * 70} ${60 + index * 38} ${430 + index * 40} ${330 - index * 32} ${610 + (index % 2) * 130} ${110 + index * 58}"/>`)
          .join("")}
        ${[
          ["Omni-Claims", 170, 210],
          ["Retail Lending", 610, 110],
          ["Trial Workspace", 740, 170],
          ["Marketplace", 610, 285],
          ["Field Assist", 740, 345]
        ]
          .map(([name, x, y], index) => `
            <g class="portfolio-node" transform="translate(${x},${y})">
              <rect x="-78" y="-34" width="156" height="68" rx="18"></rect>
              <text y="-4" text-anchor="middle">${name}</text>
              <text y="17" text-anchor="middle">${index ? "dependent" : "source program"}</text>
            </g>
          `)
          .join("")}
      </svg>
    `;
  }

  return `
    <div class="portfolio-card-grid">
      ${phaseProjects
        .map(
          ([name, client, status, health, allocation, program, due, owner]) => `
            <article class="portfolio-card">
              <header><div><span>${client}</span><h3>${name}</h3></div>${chip(status, status === "At Risk" ? "risk" : status === "Review" ? "watch" : "good")}</header>
              <p>${program}</p>
              ${bars([["Health", health, health > 88 ? "green" : health > 76 ? "cyan" : "amber"], ["Allocation", allocation, "violet"]])}
              <footer><span>${owner}</span><b>${due}</b></footer>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPortfolioCenter() {
  return `
    ${phaseHero("Project portfolio center", "Portfolio operations as an AI forecast graph.", "Coordinate programs, dependencies, delivery forecasts, team allocation, and resource utilization from one executive portfolio lens.", "Open dependency graph", "#portfolio")}
    <section class="metric-strip">
      ${metric("Active projects", "28", "6 programs", "cyan")}
      ${metric("Forecast confidence", "89%", "next 90 days", "green")}
      ${metric("Utilization", "74%", "balanced pods", "violet")}
      ${metric("Dependency risk", "12", "4 critical paths", "amber")}
    </section>
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Portfolio view</span><h2>Projects, timelines, roadmaps, dependencies</h2></div>${viewSwitch("portfolio", state.portfolioView, ["grid", "timeline", "roadmap", "dependencies"])}</div>
        ${renderPortfolioVisual()}
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Cross-project analytics</span><h2>Program intelligence</h2></div></div>
        ${bars([["Team allocation", 74, "cyan"], ["Delivery forecast", 89, "green"], ["Resource utilization", 82, "violet"], ["Blocked dependency load", 31, "amber"]])}
        <div class="phase-callouts">
          <div>${icon("forecast")} Move QA automation from Trial Workspace to Marketplace for 11% faster release confidence.</div>
          <div>${icon("galaxy")} Omni-Claims policy engine is a shared dependency for three programs.</div>
        </div>
      </aside>
    </section>
  `;
}

function renderApprovals() {
  const selected = approvals.find((approval) => approval[0] === state.selectedApproval) || approvals[1];
  return `
    ${phaseHero("Approval workflow center", "Enterprise approvals with AI-aware routing.", "Route requirements, BRDs, PRDs, stories, architecture, and test cases through transparent chains with escalation intelligence.", "Review pending approvals", "#approvals")}
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Approval chain</span><h2>${selected[0]} routing path</h2></div>${chip(selected[4], selected[4] === "Escalated" ? "risk" : selected[4] === "Approved" ? "good" : "watch")}</div>
        <svg class="approval-chain" viewBox="0 0 920 260" role="img" aria-label="Approval routing chain">
          ${["Author", "AI Review", selected[3], "Governance", "Final Approval"]
            .map((step, index) => {
              const x = 96 + index * 178;
              return `
                ${index ? `<path class="flow-edge" d="M${x - 124} 132 C${x - 78} 88 ${x - 54} 176 ${x - 26} 132"/>` : ""}
                <g class="approval-node ${index < 2 ? "done" : index === 2 ? "current" : ""}" transform="translate(${x},132)">
                  <circle r="42"></circle>
                  <text text-anchor="middle" y="5">${step}</text>
                </g>
              `;
            })
            .join("")}
        </svg>
        <div class="approval-grid">
          ${approvals
            .map(
              ([id, type, owner, reviewer, status, age, note]) => `
                <button class="approval-card ${state.selectedApproval === id ? "active" : ""}" data-approval-id="${id}">
                  <header><strong>${id}</strong>${chip(status, status === "Escalated" ? "risk" : status === "Approved" ? "good" : "watch")}</header>
                  <span>${type} -> ${reviewer}</span>
                  <p>${note}</p>
                  <small>${owner} / ${age}</small>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Review comments</span><h2>Approval history</h2></div></div>
        <div class="review-thread">
          <div><strong>Compliance</strong><p>Need policy owner confirmation for fraud-risk override.</p></div>
          <div><strong>AI Reviewer</strong><p>Detected 3 downstream artifacts requiring reapproval.</p></div>
          <div><strong>Escalation workflow</strong><p>Executive sponsor notified because SLA exceeded 16 hours.</p></div>
        </div>
      </aside>
    </section>
  `;
}

function renderRequirementVersionControl() {
  const selected = requirementVersions.find(([id]) => id === state.selectedVersion) || requirementVersions[2];
  return `
    ${phaseHero("Requirement version control", "Versioned requirements with rollback confidence.", "Compare V1, V2, V3, and draft simulations with AI summaries, approval status, and governed restoration.", "Restore selected version", "#versions")}
    <section class="version-control-layout">
      <aside class="glass version-stack">
        <div class="panel-head tight"><div><span class="kicker">Versions</span><h2>Requirement history</h2></div></div>
        ${requirementVersions.map(([id, label, summary, status, date, score]) => `<button class="${state.selectedVersion === id ? "active" : ""}" data-version-id="${id}"><strong>${id} ${label}</strong><span>${date} / ${status}</span><i style="width:${score}%"></i></button>`).join("")}
      </aside>
      <div class="glass version-compare-main">
        <div class="panel-head"><div><span class="kicker">Side-by-side comparison</span><h2>${selected[0]} approval state: ${selected[3]}</h2></div>${chip(selected[3], selected[3] === "Approved" ? "good" : selected[3] === "Pending" ? "watch" : "neutral")}</div>
        <div class="compare-grid phase-compare">
          <article><span>Previous</span><h3>Supervisor approval above 10,000</h3><p>Original business statement with single threshold and no risk dimension.</p></article>
          <article><span>Selected</span><h3>${selected[2]}</h3><p>AI summary: threshold, owner, evidence, and downstream trace references updated with ${selected[5]}% confidence.</p></article>
        </div>
        <div class="action-list">
          <div>${icon("spark")} AI summary: ${selected[2]} changed 5 artifacts and 11 trace edges.</div>
          <div>${icon("doc")} Rollback restores BRD-4.2, PRD-F12, US-88, TC-311 to matching baselines.</div>
          <div>${icon("shield")} Restoration requires business owner and audit approval.</div>
        </div>
      </div>
    </section>
  `;
}

function renderImpactEngine() {
  return `
    ${phaseHero("Impact analysis engine", "Every requirement change becomes a dependency path.", "Map affected BRD sections, PRD features, user stories, test cases, and architecture components before regeneration.", "Open simulator", "#simulator")}
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Dependency tree</span><h2>Impact paths from REQ-102</h2></div>${chip("21 affected artifacts", "risk")}</div>
        <svg class="impact-tree" viewBox="0 0 980 500" role="img" aria-label="Impact dependency tree">
          <defs><linearGradient id="impactFlow" x1="0" x2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient></defs>
          ${[
            ["REQ-102", 100, 250],
            ["BRD 4.2", 300, 120],
            ["PRD F12", 300, 250],
            ["ARCH 07", 300, 380],
            ["US-88", 540, 150],
            ["Prompt BE", 540, 300],
            ["TC-311", 790, 120],
            ["TC-318", 790, 260],
            ["TC-326", 790, 400]
          ]
            .map(([label, x, y], index) => `
              ${index ? `<path class="impact-edge" d="M${index < 4 ? 158 : index < 6 ? 358 : 598} ${index < 4 ? 250 : index < 6 ? 250 : 300} C${x - 100} ${y - 80} ${x - 70} ${y + 80} ${x - 58} ${y}"/>` : ""}
              <g class="impact-node" transform="translate(${x},${y})">
                <rect x="-58" y="-28" width="116" height="56" rx="16"></rect>
                <text text-anchor="middle" y="5">${label}</text>
              </g>
            `)
            .join("")}
        </svg>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Affected domains</span><h2>Regeneration scope</h2></div></div>
        ${bars([["BRD sections", 82, "amber"], ["PRD features", 74, "violet"], ["User stories", 68, "cyan"], ["Test cases", 91, "green"], ["Architecture", 57, "amber"]])}
      </aside>
    </section>
  `;
}

function renderDeliveryManagement() {
  return `
    ${phaseHero("Sprint and delivery management", "AI-generated artifacts flow into delivery systems.", "Visualize epics, features, stories, tasks, and releases with Jira and Azure DevOps synchronization.", "Sync delivery plan", "#integrations")}
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Delivery workspace</span><h2>Kanban, sprint board, timeline, release planner</h2></div>${viewSwitch("sprint", state.sprintView, ["kanban", "sprint", "timeline", "release"])}</div>
        <div class="delivery-board">
          ${deliveryColumns
            .map(
              ([column, cards]) => `
                <section>
                  <header><h3>${column}</h3><span>${cards.length}</span></header>
                  ${cards.map((card, index) => `<article><strong>${card}</strong><p>${index % 2 ? "Azure DevOps linked" : "Jira synchronized"} / trace ready</p>${chip(index % 2 ? "ADO" : "Jira", "neutral")}</article>`).join("")}
                </section>
              `
            )
            .join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Release planner</span><h2>Sprint 18 forecast</h2></div></div>
        ${bars([["Epic completion", 64, "cyan"], ["Story readiness", 88, "green"], ["Task burnup", 57, "amber"], ["Release confidence", 81, "violet"]])}
        <div class="phase-callouts"><div>${icon("flow")} Jira and Azure DevOps are receiving story fields, acceptance criteria, and trace IDs.</div></div>
      </aside>
    </section>
  `;
}

function renderAiGovernance() {
  return `
    ${phaseHero("AI governance center", "Model intelligence, cost, quality, and prompt lineage.", "Track usage, prompt history, token consumption, model performance, and quality scoring across GPT, Claude, and Gemini.", "Inspect prompt history", "#ai-governance")}
    <section class="metric-strip">
      ${metric("Tokens", "76.9M", "month to date", "cyan")}
      ${metric("AI cost", "$16.2K", "31% under budget", "green")}
      ${metric("Quality score", "92%", "review pass rate", "violet")}
      ${metric("Prompt events", "18.4K", "audited", "amber")}
    </section>
    <section class="governance-grid">
      ${modelMetrics
        .map(
          ([model, tokens, cost, quality, efficiency, note]) => `
            <article class="glass model-card">
              <header><h3>${model}</h3>${chip(`${quality}% quality`, quality > 92 ? "good" : "watch")}</header>
              <p>${note}</p>
              ${bars([["Tokens", Number(tokens.replace("M", "")) * 2, "cyan"], ["Efficiency", efficiency, "green"], ["Quality", quality, "violet"]])}
              <footer><span>${tokens}</span><strong>${cost}</strong></footer>
            </article>
          `
        )
        .join("")}
      <div class="glass prompt-history">
        <div class="panel-head tight"><div><span class="kicker">Prompt history</span><h2>Recent governed prompts</h2></div></div>
        <div class="audit-log compact">
          ${["REQ-102 ambiguity resolution", "BRD-4.2 policy rewrite", "PRD-F12 feature variant", "TC-318 security abuse tests"].map((item, index) => `<div><span>${item}</span><strong>${["GPT", "Claude", "GPT", "Gemini"][index]}</strong><small>${["42.8K", "16.2K", "22.4K", "31.7K"][index]} tokens</small></div>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAuditCompliance() {
  return `
    ${phaseHero("Audit and compliance hub", "Every action, AI decision, approval, and export is evidence.", "Inspect user activity, workflow history, document history, AI decisions, approval logs, compliance reports, and audit exports.", "Export evidence pack", "#audit")}
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Audit intelligence</span><h2>Immutable workflow history</h2></div>${chip("SOC 2 evidence ready", "good")}</div>
        <div class="audit-log">
          ${auditEvents.map(([event, actor, detail, status, time]) => `<div><span>${time}</span><strong>${event}</strong><p>${actor}: ${detail}</p>${chip(status, status === "SLA breach" ? "risk" : status === "Complete" ? "good" : "neutral")}</div>`).join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Governance dashboards</span><h2>Compliance posture</h2></div></div>
        ${bars([["Approval coverage", 94, "green"], ["Document lineage", 98, "cyan"], ["AI decision trace", 91, "violet"], ["Export readiness", 87, "amber"]])}
        <div class="phase-callouts"><div>${icon("shield")} Available reports: SOC 2, ISO 27001, internal SDLC governance, AI usage audit.</div></div>
      </aside>
    </section>
  `;
}

function renderCollaboration() {
  return `
    ${phaseHero("Team collaboration workspace", "Document reviews become live, trace-linked conversations.", "Support comments, mentions, discussions, reviews, assignments, and notifications inside AI-generated artifacts.", "Open review room", "#collaboration")}
    <section class="collab-layout">
      <div class="glass doc-review">
        <div class="panel-head"><div><span class="kicker">Collaborative document review</span><h2>BRD 4.2 Payment approval threshold</h2></div>${chip("4 active reviewers", "good")}</div>
        <div class="review-document">
          <h3>Business Rule</h3>
          <p>Payment adjustments above 25,000 require supervisor approval. Fraud-risk override and jurisdiction-specific policies must be evaluated before settlement.</p>
          <mark>AI detected downstream changes in PRD-F12, US-88, ARCH-07, TC-311.</mark>
        </div>
      </div>
      <aside class="glass comment-panel">
        <div class="panel-head tight"><div><span class="kicker">Threads</span><h2>Mentions and assignments</h2></div></div>
        <div class="review-thread">
          ${collaborationThreads.map(([name, text, artifact, status]) => `<div><strong>${name}</strong><p>${text}</p><span>${artifact} / ${status}</span></div>`).join("")}
        </div>
      </aside>
      <div class="glass notification-strip">
        ${["Nora assigned QA review", "Samira mentioned in SEC-12", "Architecture board requested update", "Jira story sync complete"].map((item) => `<div>${icon("mission")} ${item}</div>`).join("")}
      </div>
    </section>
  `;
}

function renderRiskIntelligence() {
  return `
    ${phaseHero("Risk intelligence center", "AI detects delivery, requirement, dependency, and quality risk before it hurts the plan.", "Prioritize risks, explain root causes, and generate mitigation recommendations from trace and workflow signals.", "Generate mitigation plan", "#risk")}
    <section class="risk-layout">
      <div class="glass risk-matrix">
        <div class="panel-head"><div><span class="kicker">Risk matrix</span><h2>Portfolio risk field</h2></div>${chip("4 high-signal risks", "watch")}</div>
        ${riskSignals.map(([type, title, score, recommendation]) => `<article class="${score > 70 ? "high" : "medium"}"><strong>${type}</strong><h3>${title}</h3><span>${score}% signal</span><p>${recommendation}</p></article>`).join("")}
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">AI recommendations</span><h2>Mitigation sequence</h2></div></div>
        <div class="action-list">
          <div>${icon("flow")} Run Impact Engine on REQ-102 before Sprint 18 lock.</div>
          <div>${icon("shield")} Add compliance owner to approval chain.</div>
          <div>${icon("schema")} Generate policy-engine contract mock.</div>
          <div>${icon("forecast")} Reforecast release after QA expansion.</div>
        </div>
      </aside>
    </section>
  `;
}

function renderCostRoi() {
  return `
    ${phaseHero("Cost and ROI center", "Translate AI automation into CFO-ready value.", "Measure documentation time saved, AI costs, resource savings, productivity lift, and ROI across programs.", "Export ROI model", "#roi")}
    <section class="metric-strip wide">
      ${roiSignals.map(([label, value, delta], index) => metric(label, value, delta, ["green", "amber", "cyan", "violet", "green"][index])).join("")}
    </section>
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">ROI waterfall</span><h2>Savings, spend, and productivity gain</h2></div>${chip("21.1x projected ROI", "good")}</div>
        <div class="roi-waterfall">
          ${[["Baseline effort", 92], ["AI generation", 38], ["Review effort", 26], ["AI spend", 12], ["Net savings", 84], ["ROI", 96]].map(([label, value], index) => `<div><span>${label}</span><i style="height:${value}%"></i><strong>${index === 3 ? "-$16K" : index === 5 ? "21.1x" : value + "%"}</strong></div>`).join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Productivity improvements</span><h2>Operating leverage</h2></div></div>
        ${bars([["BRD generation", 88, "green"], ["PRD generation", 81, "cyan"], ["Story generation", 92, "violet"], ["QA generation", 86, "amber"]])}
      </aside>
    </section>
  `;
}

function renderKnowledgeManagementHub() {
  return `
    ${phaseHero("Knowledge management hub", "Organizational memory for every delivery artifact.", "Navigate past projects, BRD and PRD libraries, templates, best practices, and AI-powered search through a graph interface.", "Search knowledge graph", "#knowledge-hub")}
    <section class="knowledge-hub-layout">
      <div class="glass knowledge-search-panel">
        <label class="global-search knowledge-search">${icon("search")}<input value="Search past payment approval patterns, BRD templates, and test strategies" readonly /></label>
        <div class="knowledge-hub-grid">
          ${enterpriseKnowledge.map(([name, count, summary]) => `<article>${icon(name.includes("PRD") ? "schema" : name.includes("Templates") ? "spark" : "doc")}<strong>${name}</strong><span>${count}</span><p>${summary}</p></article>`).join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Graph navigation</span><h2>Reusable memory</h2></div></div>
        ${miniKnowledgeGraph("studio")}
      </aside>
    </section>
  `;
}

function renderIntegrationsHub() {
  const selected = integrations.find(([name]) => name === state.selectedIntegration) || integrations[0];
  return `
    ${phaseHero("Enterprise integrations hub", "Connected delivery systems stay synchronized with the AI graph.", "Manage Jira, Azure DevOps, GitHub, GitLab, Confluence, SharePoint, Slack, and Teams sync workflows.", "Run sync workflow", "#integrations")}
    <section class="integrations-layout">
      <div class="glass integrations-main">
        <div class="panel-head"><div><span class="kicker">Connected systems</span><h2>Synchronization mesh</h2></div>${chip(`${selected[0]} selected`, "neutral")}</div>
        <div class="integration-grid">
          ${integrations.map(([name, status, score, scope, detail]) => `<button class="integration-card ${state.selectedIntegration === name ? "active" : ""}" data-integration="${name}"><header><strong>${name}</strong>${chip(status, status === "Connected" ? "good" : "watch")}</header><p>${scope}</p><i><em style="width:${score}%"></em></i><span>${detail}</span></button>`).join("")}
        </div>
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Sync status</span><h2>${selected[0]}</h2></div></div>
        ${bars([["Connection health", selected[2], selected[2] > 88 ? "green" : "amber"], ["Artifact mapping", 86, "cyan"], ["Workflow sync", 79, "violet"], ["Error rate", 12, "green"]])}
        <svg class="sync-flow" viewBox="0 0 320 220">
          ${["SDLC AI", selected[0], "Delivery System"].map((label, index) => `<g transform="translate(${60 + index * 100},110)"><circle r="34"></circle><text text-anchor="middle" y="5">${label}</text></g>${index < 2 ? `<path class="flow-edge" d="M${94 + index * 100} 110 C${125 + index * 100} 70 ${135 + index * 100} 150 ${160 + index * 100} 110"/>` : ""}`).join("")}
        </svg>
      </aside>
    </section>
  `;
}

function renderPlatformAdminDashboard() {
  return `
    ${phaseHero("Platform administration layer", "AI Control Tower for every tenant, team, project, model, and workflow.", "Configure providers, monitor usage, govern security, control cost, manage tenants, and observe AI workload distribution across the enterprise.", "Configure providers", "#ai-providers")}
    <section class="metric-strip wide">
      ${metric("Organizations", "18", "4 active tenants", "cyan")}
      ${metric("Teams", "104", "12 created this month", "green")}
      ${metric("Projects", "427", "92 active workflows", "violet")}
      ${metric("Active users", "3,842", "87% adoption", "amber")}
    </section>
    <section class="platform-admin-grid">
      <div class="glass platform-map">
        <div class="panel-head"><div><span class="kicker">Cross-project analytics</span><h2>Enterprise workload distribution</h2></div>${chip("global", "good")}</div>
        <svg class="admin-topology" viewBox="0 0 980 440" role="img" aria-label="Multi-tenant platform topology">
          <defs><linearGradient id="adminFlow" x1="0" x2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#34d399"/></linearGradient></defs>
          ${tenants.map((tenant, index) => `<path class="admin-edge" d="M170 220 C${310 + index * 64} ${70 + index * 42} ${500 + index * 30} ${340 - index * 36} ${720} ${100 + index * 76}"/>`).join("")}
          <g class="admin-node hub" transform="translate(170,220)"><circle r="64"></circle><text text-anchor="middle" y="-2">Platform</text><text text-anchor="middle" y="20">Admin</text></g>
          ${tenants.map(([name, orgs, teams, projects], index) => `<g class="admin-node" transform="translate(720,${100 + index * 76})"><rect x="-104" y="-28" width="208" height="56" rx="16"></rect><text text-anchor="middle" y="-3">${name}</text><text text-anchor="middle" y="16">${teams} / ${projects}</text></g>`).join("")}
        </svg>
      </div>
      <aside class="glass phase-side" style="width: max-content;">
        <div class="panel-head tight"><div><span class="kicker">Platform activity stream</span><h2>Global operations</h2></div></div>
        <div class="audit-log compact">
          ${["Azure OpenAI key rotated", "Northstar budget alert resolved", "QA Team model access updated", "Global prompt v7.2 approved"].map((item, index) => `<div><span>${item}</span><strong>${["Security", "Cost", "Access", "Prompt"][index]}</strong><small>${["now", "11m", "28m", "1h"][index]}</small></div>`).join("")}
        </div>
        ${bars([["AI usage", 86, "cyan"], ["Token consumption", 72, "violet"], ["Cost trend", 61, "amber"], ["Provider health", 97, "green"]])}
      </aside>
    </section>
  `;
}

function renderTenantManagement() {
  return `
    ${phaseHero("Tenant management", "Operate multiple organizations from one platform plane.", "Create organizations, isolate teams and projects, assign budgets, apply security policies, and monitor tenant-level AI usage.", "Create tenant", "#tenants")}
    <section class="tenant-grid">
      ${tenants.map(([name, orgs, teams, projects, spend, health]) => `<article class="glass tenant-card"><header><div><span class="kicker">${orgs}</span><h3>${name}</h3></div>${chip(health, health === "Healthy" ? "good" : health === "Watch" ? "watch" : "risk")}</header>${bars([["Teams", parseInt(teams, 10), "cyan"], ["Projects", clamp(parseInt(projects, 10), 0, 100), "violet"], ["Governance", health === "Healthy" ? 94 : health === "Watch" ? 78 : 61, health === "Healthy" ? "green" : "amber"]])}<footer><span>Monthly spend</span><strong>${spend}</strong></footer></article>`).join("")}
    </section>
  `;
}

function renderTeamManagementLayer() {
  return `
    ${phaseHero("Team management layer", "Create teams, assign managers, allocate budgets, and monitor performance.", "Business Analysis, Development, QA, DevOps, and Architecture teams each get AI resources, assigned projects, and delivery telemetry.", "Create team", "#team-management")}
    <section class="team-management-grid">
      ${enterpriseTeams.map(([name, manager, budget, projects, performance, focus]) => `<article class="glass team-card"><header><div><span class="kicker">${manager}</span><h3>${name}</h3></div>${chip(performance, Number(performance.replace("%", "")) > 84 ? "good" : "watch")}</header><p>${focus}</p>${bars([["Budget use", Number(budget.replace("$", "").replace("K", "")) * 2, "violet"], ["Performance", Number(performance.replace("%", "")), "green"], ["Project load", parseInt(projects, 10), "cyan"]])}<footer><span>${projects}</span><strong>${budget}</strong></footer></article>`).join("")}
    </section>
  `;
}

function renderRolesPermissions() {
  return `
    ${phaseHero("User role system", "Permission boundaries for platform, organization, team, and project users.", "Define what each enterprise role can configure, approve, generate, export, and observe across tenants and projects.", "Open audit center", "#enterprise-audit")}
    <section class="glass permission-matrix">
      <div class="panel-head"><div><span class="kicker">Permission matrix</span><h2>Enterprise user hierarchy</h2></div>${chip("10 roles", "neutral")}</div>
      <div class="permission-grid">
        ${rolePermissions.map(([role, scope, permissions]) => `<article><strong>${role}</strong><span>${scope}</span><p>${permissions}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function renderAiProviderManagement() {
  return `
    ${phaseHero("AI provider management", "Configure OpenAI, Claude, Gemini, Azure OpenAI, and local models.", "Enable or disable providers, set defaults, configure fallback models, control API keys, and enforce token and budget limits.", "Open model routing", "#model-routing")}
    <section class="provider-grid">
      ${providers.map(([provider, status, defaultModel, fallback, uptime, spend]) => `<article class="glass provider-card"><header><div><span class="kicker">${status}</span><h3>${provider}</h3></div>${chip(status, status === "Default" || status === "Enabled" ? "good" : "watch")}</header><div class="provider-settings"><div><span>Default</span><strong>${defaultModel}</strong></div><div><span>Fallback</span><strong>${fallback}</strong></div><div><span>Health</span><strong>${uptime}</strong></div><div><span>Spend</span><strong>${spend}</strong></div></div>${bars([["Token limit", 72, "cyan"], ["Budget limit", 64, "amber"], ["Quality", Number(uptime.replace("%", "")), "green"]])}</article>`).join("")}
    </section>
  `;
}

function renderModelRouting() {
  return `
    ${phaseHero("Model routing governance", "Route each AI workload through the right model, fallback, policy, and budget.", "Configure execution rules for sensitive requirements, architecture reasoning, bulk generation, QA expansion, and executive summarization.", "Review usage", "#usage-monitoring")}
    <section class="glass routing-table-panel">
      <div class="panel-head"><div><span class="kicker">Routing matrix</span><h2>Model access and fallback policies</h2></div>${chip("policy enforced", "good")}</div>
      <div class="routing-table">
        ${modelRoutes.map(([workload, primary, fallback, policy, limit]) => `<div><strong>${workload}</strong><span>${primary}</span><span>${fallback}</span><p>${policy}</p><b>${limit}</b></div>`).join("")}
      </div>
    </section>
  `;
}

function renderUsageMonitoring() {
  return `
    ${phaseHero("Usage monitoring", "Platform-wide AI usage, tokens, spend, quality, and workload distribution.", "Analyze consumption across organizations, teams, projects, users, providers, and agents.", "Open cost center", "#cost-management")}
    <section class="metric-strip wide">
      ${metric("AI usage", "248K", "agent runs", "cyan")}
      ${metric("Tokens", "1.92B", "monthly platform", "violet")}
      ${metric("Spend", "$128K", "forecast $146K", "amber")}
      ${metric("Quality", "93%", "review pass rate", "green")}
    </section>
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">AI workload distribution</span><h2>Provider and agent usage</h2></div>${chip("real time", "good")}</div>
        ${bars([["Requirement analysis", 86, "cyan"], ["BRD generation", 74, "green"], ["PRD generation", 68, "violet"], ["Story generation", 91, "cyan"], ["QA generation", 83, "amber"], ["Security review", 58, "violet"]])}
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Budget alerts</span><h2>Cost monitoring</h2></div></div>
        <div class="phase-callouts"><div>${icon("forecast")} Claude architecture reasoning will reach 82% of monthly allocation in 6 days.</div><div>${icon("brain")} Cached prompt routes saved $18.4K this month.</div></div>
      </aside>
    </section>
  `;
}

function renderGlobalKnowledge() {
  return `
    ${phaseHero("Knowledge management system", "Global, team, and project knowledge bases with semantic search and graphs.", "Govern SOPs, BRDs, PRDs, coding standards, architecture documents, templates, and best practices across knowledge tiers.", "Open prompt library", "#prompt-library")}
    <section class="knowledge-tier-grid">
      ${[
        ["Global Knowledge Base", "SOPs, templates, policies, approved prompt packs", 94],
        ["Team Knowledge Base", "Team playbooks, standards, reusable examples", 87],
        ["Project Knowledge Base", "Project-specific requirements, artifacts, decisions", 91]
      ].map(([title, body, score]) => `<article class="glass tier-card"><header>${icon("db")}<h3>${title}</h3>${chip(`${score}% indexed`, "good")}</header><p>${body}</p>${bars([["Freshness", score, "green"], ["Citation coverage", score - 6, "cyan"], ["Reuse", score - 12, "violet"]])}</article>`).join("")}
    </section>
  `;
}

function renderPromptLibrary() {
  return `
    ${phaseHero("Global prompt library", "Governed prompt templates for every SDLC artifact and AI agent.", "Centralize prompt versions, owners, approval status, routing rules, and quality metrics.", "Open governance", "#enterprise-ai-governance")}
    <section class="glass prompt-library-panel">
      <div class="panel-head"><div><span class="kicker">Prompt templates</span><h2>Reusable governed AI instructions</h2></div>${chip("versioned", "good")}</div>
      <div class="prompt-library-grid">
        ${promptLibraries.map(([name, scope, category, status, version]) => `<article><strong>${name}</strong><span>${scope} / ${category}</span>${chip(status, status === "Approved" ? "good" : status === "Review" ? "watch" : "neutral")}<b>${version}</b></article>`).join("")}
      </div>
    </section>
  `;
}

function renderTeamWorkspace() {
  return `
    ${phaseHero("Team workspace", "Each team gets an isolated operating layer for projects, members, budget, AI usage, and delivery.", "Team managers monitor assigned projects, sprint progress, productivity, knowledge sharing, resource allocation, and AI consumption.", "Assign projects", "#portfolio")}
    <section class="metric-strip wide">
      ${metric("Assigned projects", "42", "Business Analysis Team", "cyan")}
      ${metric("Members", "18", "4 reviewers online", "green")}
      ${metric("AI usage", "18.2M", "tokens this week", "violet")}
      ${metric("Sprint progress", "76%", "Sprint 18", "amber")}
    </section>
    <section class="phase-layout">
      <div class="glass phase-main">
        <div class="panel-head"><div><span class="kicker">Team analytics</span><h2>Performance and resource allocation</h2></div>${chip("manager view", "neutral")}</div>
        ${bars([["Team productivity", 88, "green"], ["AI utilization", 81, "cyan"], ["Review throughput", 73, "violet"], ["Delivery status", 76, "amber"]])}
      </div>
      <aside class="glass phase-side">
        <div class="panel-head tight"><div><span class="kicker">Team knowledge sharing</span><h2>Reusable assets</h2></div></div>
        <div class="phase-callouts"><div>${icon("doc")} 14 approved BRD examples reused this month.</div><div>${icon("brain")} 8 team prompt templates improved review pass rate.</div></div>
      </aside>
    </section>
  `;
}

function renderProjectWorkspace() {
  return `
    ${phaseHero("Project workspace layer", "Each project is an independent AI delivery workspace.", "Projects contain requirements, BRDs, PRDs, stories, architecture, developer prompts, test cases, traceability, impact analysis, approvals, and reports.", "Open requirement studio", "#studio")}
    <section class="project-structure-grid">
      ${["Requirements", "BRDs", "PRDs", "User Stories", "Architecture", "Developer Prompts", "Test Cases", "Traceability", "Impact Analysis", "Approvals", "Reports"].map((item, index) => `<article class="glass structure-card">${icon(["doc", "doc", "schema", "flow", "orbit", "code", "shield", "galaxy", "spark", "flow", "forecast"][index])}<strong>${item}</strong><span>${[124, 9, 7, 42, 6, 18, 86, 312, 21, 14, 11][index]} records</span></article>`).join("")}
    </section>
    <section class="metric-strip wide">
      ${metric("Project health", "94%", "green delivery", "green")}
      ${metric("Requirements", "124", "87% quality", "cyan")}
      ${metric("AI progress", "68%", "agents complete", "violet")}
      ${metric("Cost", "$8.4K", "under budget", "amber")}
    </section>
  `;
}

function renderScreen(active) {
  const screens = {
    "platform-admin": renderPlatformAdminDashboard,
    tenants: renderTenantManagement,
    "team-management": renderTeamManagementLayer,
    "roles-permissions": renderRolesPermissions,
    "ai-providers": renderAiProviderManagement,
    "model-routing": renderModelRouting,
    "usage-monitoring": renderUsageMonitoring,
    "enterprise-ai-governance": renderAiGovernance,
    "cost-management": renderCostRoi,
    "enterprise-integrations": renderIntegrationsHub,
    "enterprise-audit": renderAuditCompliance,
    "global-knowledge": renderGlobalKnowledge,
    "prompt-library": renderPromptLibrary,
    "team-workspace": renderTeamWorkspace,
    "project-workspace": renderProjectWorkspace,
    command: renderCommandCenter,
    twin: renderTwin,
    studio: renderStudio,
    orchestration: renderOrchestration,
    galaxy: renderGalaxy,
    simulator: renderSimulator,
    brain: renderBrain,
    architect: renderArchitect,
    warroom: renderWarRoom,
    tower: renderTower,
    portfolio: renderPortfolioCenter,
    approvals: renderApprovals,
    versions: renderRequirementVersionControl,
    "impact-engine": renderImpactEngine,
    delivery: renderDeliveryManagement,
    "ai-governance": renderAiGovernance,
    audit: renderAuditCompliance,
    collaboration: renderCollaboration,
    risk: renderRiskIntelligence,
    roi: renderCostRoi,
    "knowledge-hub": renderKnowledgeManagementHub,
    integrations: renderIntegrationsHub
  };
  return (screens[active] || renderCommandCenter)();
}

function render() {
  const active = route();
  document.body.className = "ai-os";
  state.modal = null;
  state.activeLayer = layerForRoute(active).role;
  app.innerHTML = shell(active, renderScreen(active));
}

document.addEventListener("click", (event) => {
  const modalButton = event.target.closest("[data-modal]");
  if (modalButton) {
    state.modal = modalButton.dataset.modal;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const layerButton = event.target.closest("[data-layer]");
  if (layerButton) {
    const layer = navigationLayers.find((item) => item.role === layerButton.dataset.layer) || navigationLayers[0];
    state.activeLayer = layer.role;
    state.modal = null;
    location.hash = layer.routes[0][0];
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const closeButton = event.target.closest(".modal [data-close-modal]");
  if (closeButton || event.target.matches(".modal-backdrop[data-close-modal]")) {
    state.modal = null;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  if (event.target.closest("[data-run]")) {
    state.toast = "AI simulation started. Streaming agents, trace links, and risk forecasts are updating.";
    state.tick += 1;
    app.innerHTML = shell(route(), renderScreen(route()));
    window.setTimeout(() => {
      state.toast = "";
      app.innerHTML = shell(route(), renderScreen(route()));
    }, 2600);
    return;
  }

  const twinNode = event.target.closest("[data-twin-node]");
  if (twinNode) {
    state.selectedTwin = twinNode.dataset.twinNode;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const galaxyNode = event.target.closest("[data-galaxy-node]");
  if (galaxyNode) {
    state.selectedGalaxy = galaxyNode.dataset.galaxyNode;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const action = event.target.closest("[data-galaxy-action]");
  if (action) {
    const type = action.dataset.galaxyAction;
    if (type === "zoom-in") state.galaxyZoom = clamp(state.galaxyZoom + 0.12, 0.72, 1.6);
    if (type === "zoom-out") state.galaxyZoom = clamp(state.galaxyZoom - 0.12, 0.72, 1.6);
    if (type === "pan") state.galaxyPanX = state.galaxyPanX > 0 ? -70 : state.galaxyPanX + 70;
    if (type === "expand") state.galaxyExpanded = !state.galaxyExpanded;
    if (type === "highlight") state.highlightImpact = !state.highlightImpact;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const brainSource = event.target.closest("[data-brain-source]");
  if (brainSource) {
    state.selectedBrain = brainSource.dataset.brainSource;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const archView = event.target.closest("[data-arch-view]");
  if (archView) {
    state.selectedArchitecture = archView.dataset.archView;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const viewSwitcher = event.target.closest("[data-view-switch]");
  if (viewSwitcher) {
    const [name, value] = viewSwitcher.dataset.viewSwitch.split(":");
    if (name === "portfolio") state.portfolioView = value;
    if (name === "sprint") state.sprintView = value;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const approval = event.target.closest("[data-approval-id]");
  if (approval) {
    state.selectedApproval = approval.dataset.approvalId;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const version = event.target.closest("[data-version-id]");
  if (version) {
    state.selectedVersion = version.dataset.versionId;
    app.innerHTML = shell(route(), renderScreen(route()));
    return;
  }

  const integration = event.target.closest("[data-integration]");
  if (integration) {
    state.selectedIntegration = integration.dataset.integration;
    app.innerHTML = shell(route(), renderScreen(route()));
  }
});

window.addEventListener("hashchange", render);
window.setInterval(() => {
  state.tick = (state.tick + 1) % 999;
  const live = document.querySelector(".rail-status strong");
  if (live) live.textContent = String(1247 + state.tick * 7);
}, 2200);

render();
