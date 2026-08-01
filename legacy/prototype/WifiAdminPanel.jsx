import { useState, useEffect } from "react";

// ─── Mock Data: All WiFi Providers (Your Customers) ─────
const MOCK_PROVIDERS = [
  { id: 1, name: "FastNet WiFi", owner: "Kamran Sheikh", email: "kamran@fastnet.pk", phone: "03001234567", plan: "pro", status: "active", trial_end: "2026-03-20", customers_count: 145, monthly_revenue: 5000, joined: "2026-01-15", last_active: "2026-04-03", city: "Karachi" },
  { id: 2, name: "SpeedLink ISP", owner: "Tariq Mehmood", email: "tariq@speedlink.pk", phone: "03119876543", plan: "basic", status: "active", trial_end: "2026-02-10", customers_count: 38, monthly_revenue: 2000, joined: "2026-02-01", last_active: "2026-04-02", city: "Lahore" },
  { id: 3, name: "CloudNet Services", owner: "Sana Fatima", email: "sana@cloudnet.pk", phone: "03215556667", plan: "enterprise", status: "active", trial_end: "2026-01-05", customers_count: 320, monthly_revenue: 10000, joined: "2025-12-20", last_active: "2026-04-03", city: "Islamabad" },
  { id: 4, name: "NetZone WiFi", owner: "Bilal Ahmed", email: "bilal@netzone.pk", phone: "03331112223", plan: "pro", status: "trial", trial_end: "2026-04-06", customers_count: 12, monthly_revenue: 0, joined: "2026-04-01", last_active: "2026-04-03", city: "Faisalabad" },
  { id: 5, name: "WaveNet", owner: "Imran Raza", email: "imran@wavenet.pk", phone: "03451239876", plan: "basic", status: "expired", trial_end: "2026-03-15", customers_count: 67, monthly_revenue: 0, joined: "2026-03-01", last_active: "2026-03-28", city: "Rawalpindi" },
  { id: 6, name: "PakFiber", owner: "Zubair Khan", email: "zubair@pakfiber.pk", phone: "03007778889", plan: "pro", status: "active", trial_end: "2026-02-20", customers_count: 89, monthly_revenue: 5000, joined: "2026-02-10", last_active: "2026-04-01", city: "Multan" },
  { id: 7, name: "QuickConnect", owner: "Ayesha Siddiqui", email: "ayesha@quickconnect.pk", phone: "03121234567", plan: "enterprise", status: "active", trial_end: "2026-01-25", customers_count: 210, monthly_revenue: 10000, joined: "2026-01-10", last_active: "2026-04-03", city: "Peshawar" },
  { id: 8, name: "LinkUp WiFi", owner: "Hassan Javed", email: "hassan@linkup.pk", phone: "03229998887", plan: "basic", status: "trial", trial_end: "2026-04-05", customers_count: 5, monthly_revenue: 0, joined: "2026-04-02", last_active: "2026-04-03", city: "Hyderabad" },
  { id: 9, name: "FiberHome PK", owner: "Omar Farooq", email: "omar@fiberhome.pk", phone: "03009991112", plan: "pro", status: "cancelled", trial_end: "2026-02-01", customers_count: 0, monthly_revenue: 0, joined: "2026-01-20", last_active: "2026-02-15", city: "Quetta" },
  { id: 10, name: "NexGen Internet", owner: "Fatima Noor", email: "fatima@nexgen.pk", phone: "03157773334", plan: "basic", status: "active", trial_end: "2026-03-01", customers_count: 42, monthly_revenue: 2000, joined: "2026-02-15", last_active: "2026-04-02", city: "Sialkot" },
];

const MOCK_MESSAGES_LOG = [
  { id: 1, provider: "FastNet WiFi", messages_sent: 432, messages_failed: 8, date: "2026-04-03" },
  { id: 2, provider: "CloudNet Services", messages_sent: 890, messages_failed: 12, date: "2026-04-03" },
  { id: 3, provider: "SpeedLink ISP", messages_sent: 98, messages_failed: 3, date: "2026-04-03" },
  { id: 4, provider: "QuickConnect", messages_sent: 567, messages_failed: 5, date: "2026-04-03" },
  { id: 5, provider: "PakFiber", messages_sent: 234, messages_failed: 2, date: "2026-04-03" },
  { id: 6, provider: "NexGen Internet", messages_sent: 112, messages_failed: 1, date: "2026-04-02" },
];

const MOCK_REVENUE_HISTORY = [
  { month: "Nov 2025", revenue: 10000, providers: 2 },
  { month: "Dec 2025", revenue: 22000, providers: 4 },
  { month: "Jan 2026", revenue: 39000, providers: 6 },
  { month: "Feb 2026", revenue: 52000, providers: 8 },
  { month: "Mar 2026", revenue: 64000, providers: 9 },
  { month: "Apr 2026", revenue: 34000, providers: 10 },
];

// ─── Helpers ─────────────────────────────────────────────
const formatDate = (d) => new Date(d).toLocaleDateString("en-PK", { day:"numeric", month:"short", year:"numeric" });
const daysUntil = (dateStr) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  return Math.ceil((d - today) / 86400000);
};

// ─── Icons ───────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const I = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2 M23 21v-2a4 4 0 00-3-3.87 M9 7a4 4 0 100-8 4 4 0 000 8 M16 3.13a4 4 0 010 7.75",
  dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18 M6 6l12 12",
  alert: "M12 9v4 M12 17h.01 M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  clock: "M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2",
  search: "M11 3a8 8 0 100 16 8 8 0 000-16z M21 21l-4.35-4.35",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  bar: "M18 20V10 M12 20V4 M6 20v-6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
  play: "M5 3l14 9-14 9V3z",
  pause: "M6 4h4v16H6V4z M14 4h4v16h-4V4z",
};

// ─── Color System ────────────────────────────────────────
const C = {
  bg: "#06080F",
  card: "#0D1117",
  cardHover: "#151C28",
  border: "#1B2332",
  accent: "#10B981",
  accentDim: "rgba(16,185,129,0.12)",
  danger: "#EF4444",
  dangerDim: "rgba(239,68,68,0.12)",
  warn: "#F59E0B",
  warnDim: "rgba(245,158,11,0.12)",
  blue: "#3B82F6",
  blueDim: "rgba(59,130,246,0.12)",
  purple: "#8B5CF6",
  purpleDim: "rgba(139,92,246,0.12)",
  cyan: "#06B6D4",
  cyanDim: "rgba(6,182,212,0.12)",
  text: "#E2E8F0",
  textDim: "#94A3B8",
  textMuted: "#64748B",
  gold: "#EAB308",
};

const font = "'Outfit', sans-serif";
const mono = "'JetBrains Mono', monospace";

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:${C.bg};color:${C.text};font-family:${font}}
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
  input,select,textarea{font-family:${font}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  .fu{animation:fadeUp .45s ease forwards;opacity:0}
  .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}
`;

// ─── Components ──────────────────────────────────────────
const Badge = ({ children, color = C.accent, bg }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:.4, color, background:bg||(color+"18"), textTransform:"uppercase" }}>{children}</span>
);

const Stat = ({ title, value, sub, icon, color, delay = 1 }) => (
  <div className={`fu d${delay}`} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", transition:"all .2s", cursor:"default" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color+"60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>
    <div>
      <p style={{ fontSize:11, color:C.textMuted, fontWeight:600, letterSpacing:.8, textTransform:"uppercase", marginBottom:6 }}>{title}</p>
      <p style={{ fontSize:28, fontWeight:800, color, fontFamily:mono, lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontSize:11, color:C.textDim, marginTop:5 }}>{sub}</p>}
    </div>
    <div style={{ width:40, height:40, borderRadius:10, background:color+"12", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Icon d={I[icon]} size={20} color={color}/>
    </div>
  </div>
);

const Input = ({ value, onChange, placeholder, icon }) => (
  <div style={{ position:"relative" }}>
    {icon && <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}><Icon d={I[icon]} size={15}/></span>}
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{ width:"100%", padding:icon?"9px 14px 9px 36px":"9px 14px", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:9, color:C.text, fontSize:13, outline:"none", transition:"border .2s" }}
      onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
  </div>
);

const Btn = ({ children, onClick, color = C.accent, small, ghost, icon, full }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, padding:small?"5px 12px":"9px 18px", borderRadius:9, fontSize:small?12:13, fontWeight:600, fontFamily:font, cursor:"pointer", transition:"all .2s", border:ghost?`1.5px solid ${color}`:"none", background:ghost?(h?color+"18":"transparent"):(h?color+"dd":color), color:ghost?color:"#000", width:full?"100%":"auto", letterSpacing:.3 }}>
      {icon && <Icon d={I[icon]} size={small?13:15}/>}
      {children}
    </button>
  );
};

// ─── Mini Revenue Chart (CSS-only bars) ──────────────────
const RevenueChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:140, padding:"0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <p style={{ fontSize:10, fontFamily:mono, color:C.accent, fontWeight:600 }}>₨{(d.revenue/1000).toFixed(0)}k</p>
          <div style={{
            width:"100%", maxWidth:48, borderRadius:6,
            height: `${(d.revenue / max) * 100}%`, minHeight:8,
            background: `linear-gradient(180deg, ${C.accent}, ${C.accent}40)`,
            transition:"height .6s ease", transitionDelay:`${i*80}ms`,
          }}/>
          <p style={{ fontSize:10, color:C.textMuted, fontWeight:500 }}>{d.month.split(" ")[0]}</p>
        </div>
      ))}
    </div>
  );
};

// ─── Sidebar ─────────────────────────────────────────────
const Sidebar = ({ active, setActive }) => {
  const items = [
    { id:"overview", icon:"home", label:"Overview" },
    { id:"providers", icon:"wifi", label:"WiFi Providers" },
    { id:"revenue", icon:"dollar", label:"Revenue" },
    { id:"messages", icon:"send", label:"Message Logs" },
    { id:"system", icon:"shield", label:"System Health" },
  ];
  return (
    <div style={{ width:230, minHeight:"100vh", background:C.card, borderRight:`1px solid ${C.border}`, padding:"20px 14px", display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 8px", marginBottom:8 }}>
        <div style={{ width:34, height:34, borderRadius:9, background:`linear-gradient(135deg, ${C.accent}, ${C.cyan})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d={I.shield} size={17} color="#fff"/>
        </div>
        <div>
          <p style={{ fontSize:15, fontWeight:800, letterSpacing:-.3 }}>WiFi<span style={{color:C.accent}}>Pro</span></p>
          <p style={{ fontSize:10, color:C.danger, fontWeight:700, letterSpacing:.5 }}>ADMIN PANEL</p>
        </div>
      </div>

      <div style={{ width:"100%", height:1, background:C.border, margin:"12px 0 16px" }}/>

      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        {items.map(it => (
          <button key={it.id} onClick={()=>setActive(it.id)} style={{
            display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:font, transition:"all .2s", textAlign:"left",
            background:active===it.id?C.accentDim:"transparent",
            color:active===it.id?C.accent:C.textDim,
          }}>
            <Icon d={I[it.icon]} size={17}/> {it.label}
          </button>
        ))}
      </div>

      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px" }}>
          <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg, ${C.danger}, ${C.warn})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff" }}>A</div>
          <div>
            <p style={{ fontSize:12, fontWeight:700 }}>Admin</p>
            <p style={{ fontSize:10, color:C.textMuted }}>Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── OVERVIEW PAGE ───────────────────────────────────────
const OverviewPage = ({ providers }) => {
  const active = providers.filter(p => p.status === "active").length;
  const trial = providers.filter(p => p.status === "trial").length;
  const expired = providers.filter(p => p.status === "expired" || p.status === "cancelled").length;
  const totalRev = providers.reduce((s, p) => s + p.monthly_revenue, 0);
  const totalClients = providers.reduce((s, p) => s + p.customers_count, 0);
  const msgToday = MOCK_MESSAGES_LOG.reduce((s, m) => s + m.messages_sent, 0);

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:13, color:C.danger, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Admin Dashboard</p>
        <h2 style={{ fontSize:28, fontWeight:900, letterSpacing:-.5 }}>System Overview</h2>
        <p style={{ color:C.textMuted, fontSize:13, marginTop:4 }}>Your SaaS business at a glance · {new Date().toLocaleDateString("en-PK", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))", gap:14, marginBottom:28 }}>
        <Stat title="Total Providers" value={providers.length} sub={`${active} active · ${trial} trial`} icon="wifi" color={C.accent} delay={1}/>
        <Stat title="Monthly Revenue" value={`₨${(totalRev/1000).toFixed(0)}k`} sub="From active subscriptions" icon="dollar" color={C.blue} delay={2}/>
        <Stat title="Total WiFi Clients" value={totalClients.toLocaleString()} sub="Across all providers" icon="users" color={C.purple} delay={3}/>
        <Stat title="Messages Today" value={msgToday.toLocaleString()} sub="WhatsApp notifications" icon="send" color={C.cyan} delay={4}/>
        <Stat title="Churned/Expired" value={expired} sub="Need follow-up" icon="alert" color={C.danger} delay={5}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:18 }}>
        {/* Revenue Chart */}
        <div className="fu d3" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <h3 style={{ fontSize:15, fontWeight:700 }}>Revenue Growth</h3>
            <Badge color={C.accent}>+23% MoM</Badge>
          </div>
          <RevenueChart data={MOCK_REVENUE_HISTORY}/>
        </div>

        {/* Recent Signups */}
        <div className="fu d4" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:22 }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Recent Signups</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {providers.sort((a,b) => new Date(b.joined) - new Date(a.joined)).slice(0,5).map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", background:C.bg, borderRadius:9 }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600 }}>{p.name}</p>
                  <p style={{ fontSize:11, color:C.textMuted }}>{p.city} · {p.owner}</p>
                </div>
                <Badge color={p.status==="trial"?C.warn:p.status==="active"?C.accent:C.danger}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fu d5" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:18 }}>
        {[
          { label:"Broadcast Message", icon:"send", color:C.cyan },
          { label:"Export Data", icon:"bar", color:C.blue },
          { label:"n8n Workflows", icon:"zap", color:C.warn },
          { label:"System Logs", icon:"shield", color:C.purple },
        ].map(a => (
          <button key={a.label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 14px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", transition:"all .2s", fontFamily:font, color:C.text }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=a.color+"60"; e.currentTarget.style.background=C.cardHover; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card; }}>
            <div style={{ width:36, height:36, borderRadius:9, background:a.color+"15", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon d={I[a.icon]} size={17} color={a.color}/>
            </div>
            <span style={{ fontSize:13, fontWeight:600 }}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── PROVIDERS PAGE ──────────────────────────────────────
const ProvidersPage = ({ providers, setProviders }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = providers.filter(p => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.owner.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleStatus = (id, newStatus) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    setSelected(null);
  };

  const statusColor = (s) => s==="active"?C.accent:s==="trial"?C.warn:s==="expired"?C.danger:C.textMuted;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <p style={{ fontSize:12, color:C.danger, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>Admin</p>
          <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-.5 }}>WiFi Providers</h2>
          <p style={{ color:C.textMuted, fontSize:13, marginTop:2 }}>{providers.length} registered providers</p>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200 }}><Input value={search} onChange={setSearch} placeholder="Search by name, owner, city..." icon="search"/></div>
        <div style={{ display:"flex", gap:5 }}>
          {[{v:"all",l:"All"},{v:"active",l:"Active"},{v:"trial",l:"Trial"},{v:"expired",l:"Expired"},{v:"cancelled",l:"Cancelled"}].map(f => (
            <button key={f.v} onClick={()=>setFilter(f.v)} style={{
              padding:"7px 14px", borderRadius:9, border:`1.5px solid ${filter===f.v?C.accent:C.border}`,
              background:filter===f.v?C.accentDim:"transparent", color:filter===f.v?C.accent:C.textDim,
              fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:font,
            }}>{f.l}</button>
          ))}
        </div>
      </div>

      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                {["Provider","Owner","City","Plan","Clients","Revenue","Status","Last Active","Actions"].map(h => (
                  <th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom:`1px solid ${C.border}`, transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.cardHover}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:8, background:C.accentDim, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon d={I.wifi} size={15} color={C.accent}/>
                      </div>
                      <div>
                        <p style={{ fontSize:13, fontWeight:700 }}>{p.name}</p>
                        <p style={{ fontSize:11, color:C.textMuted }}>{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:13 }}>{p.owner}</td>
                  <td style={{ padding:"11px 14px", fontSize:12, color:C.textDim }}>{p.city}</td>
                  <td style={{ padding:"11px 14px" }}>
                    <Badge color={p.plan==="enterprise"?C.purple:p.plan==="pro"?C.blue:C.textDim}>
                      {p.plan}
                    </Badge>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:13, fontFamily:mono, fontWeight:600 }}>{p.customers_count}</td>
                  <td style={{ padding:"11px 14px", fontSize:13, fontFamily:mono, fontWeight:600, color:p.monthly_revenue>0?C.accent:C.textMuted }}>
                    {p.monthly_revenue > 0 ? `₨${p.monthly_revenue.toLocaleString()}` : "—"}
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <Badge color={statusColor(p.status)}>
                      {p.status === "active" ? "● Active" : p.status === "trial" ? "◐ Trial" : p.status === "expired" ? "○ Expired" : "✕ Cancelled"}
                    </Badge>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:12, color:C.textMuted }}>{formatDate(p.last_active)}</td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ display:"flex", gap:5 }}>
                      <button title="View Details" onClick={()=>setSelected(p)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:5, cursor:"pointer", color:C.textMuted, transition:"all .15s" }}
                        onMouseEnter={e=>{e.currentTarget.style.color=C.accent;e.currentTarget.style.borderColor=C.accent}}
                        onMouseLeave={e=>{e.currentTarget.style.color=C.textMuted;e.currentTarget.style.borderColor=C.border}}>
                        <Icon d={I.eye} size={13}/>
                      </button>
                      {p.status === "active" ? (
                        <button title="Suspend" onClick={()=>toggleStatus(p.id,"expired")} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:5, cursor:"pointer", color:C.textMuted, transition:"all .15s" }}
                          onMouseEnter={e=>{e.currentTarget.style.color=C.danger;e.currentTarget.style.borderColor=C.danger}}
                          onMouseLeave={e=>{e.currentTarget.style.color=C.textMuted;e.currentTarget.style.borderColor=C.border}}>
                          <Icon d={I.pause} size={13}/>
                        </button>
                      ) : (
                        <button title="Activate" onClick={()=>toggleStatus(p.id,"active")} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:7, padding:5, cursor:"pointer", color:C.textMuted, transition:"all .15s" }}
                          onMouseEnter={e=>{e.currentTarget.style.color=C.accent;e.currentTarget.style.borderColor=C.accent}}
                          onMouseLeave={e=>{e.currentTarget.style.color=C.textMuted;e.currentTarget.style.borderColor=C.border}}>
                          <Icon d={I.play} size={13}/>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Detail Modal */}
      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }} onClick={()=>setSelected(null)}>
          <div onClick={e=>e.stopPropagation()} className="fu" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, padding:28, width:"90%", maxWidth:520 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:C.accentDim, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon d={I.wifi} size={22} color={C.accent}/>
                </div>
                <div>
                  <h3 style={{ fontSize:18, fontWeight:800 }}>{selected.name}</h3>
                  <p style={{ fontSize:12, color:C.textMuted }}>{selected.city} · {selected.owner}</p>
                </div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer" }}><Icon d={I.x} size={18}/></button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              {[
                { l:"Plan", v:selected.plan.toUpperCase(), c:selected.plan==="enterprise"?C.purple:selected.plan==="pro"?C.blue:C.textDim },
                { l:"Status", v:selected.status.toUpperCase(), c:statusColor(selected.status) },
                { l:"WiFi Customers", v:selected.customers_count, c:C.accent },
                { l:"Monthly Revenue", v:`₨${selected.monthly_revenue.toLocaleString()}`, c:C.blue },
                { l:"Joined", v:formatDate(selected.joined), c:C.textDim },
                { l:"Last Active", v:formatDate(selected.last_active), c:C.textDim },
              ].map(s => (
                <div key={s.l} style={{ background:C.bg, borderRadius:10, padding:"12px 14px" }}>
                  <p style={{ fontSize:11, color:C.textMuted, fontWeight:600, textTransform:"uppercase", letterSpacing:.5, marginBottom:4 }}>{s.l}</p>
                  <p style={{ fontSize:16, fontWeight:700, color:s.c, fontFamily:mono }}>{s.v}</p>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Btn icon="mail" color={C.cyan} ghost small>Email Provider</Btn>
              <Btn icon="send" color={C.accent} ghost small>Send WhatsApp</Btn>
              {selected.status !== "active" && <Btn icon="play" color={C.accent} small>Activate</Btn>}
              {selected.status === "active" && <Btn icon="pause" color={C.danger} ghost small>Suspend</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── REVENUE PAGE ────────────────────────────────────────
const RevenuePage = ({ providers }) => {
  const totalMonthly = providers.reduce((s,p) => s+p.monthly_revenue, 0);
  const byPlan = { basic: 0, pro: 0, enterprise: 0 };
  providers.forEach(p => { if(p.status==="active") byPlan[p.plan] = (byPlan[p.plan]||0) + p.monthly_revenue; });

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:12, color:C.danger, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>Admin</p>
        <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-.5 }}>Revenue Analytics</h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        <Stat title="Total MRR" value={`₨${(totalMonthly/1000).toFixed(0)}k`} sub="Monthly recurring" icon="dollar" color={C.accent} delay={1}/>
        <Stat title="ARR Projection" value={`₨${((totalMonthly*12)/1000).toFixed(0)}k`} sub="Annual forecast" icon="bar" color={C.blue} delay={2}/>
        <Stat title="Avg Revenue/Provider" value={`₨${providers.filter(p=>p.status==="active").length>0?Math.round(totalMonthly/providers.filter(p=>p.status==="active").length).toLocaleString():0}`} sub="Active providers" icon="zap" color={C.purple} delay={3}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <div className="fu d3" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:22 }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:20 }}>Monthly Revenue Trend</h3>
          <RevenueChart data={MOCK_REVENUE_HISTORY}/>
        </div>

        <div className="fu d4" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:22 }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:20 }}>Revenue by Plan</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { plan:"Enterprise", amount:byPlan.enterprise, color:C.purple, total:totalMonthly },
              { plan:"Pro", amount:byPlan.pro, color:C.blue, total:totalMonthly },
              { plan:"Basic", amount:byPlan.basic, color:C.textMuted, total:totalMonthly },
            ].map(r => (
              <div key={r.plan}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>{r.plan}</span>
                  <span style={{ fontSize:13, fontFamily:mono, fontWeight:600, color:r.color }}>₨{r.amount.toLocaleString()}</span>
                </div>
                <div style={{ height:8, background:C.bg, borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${r.total>0?(r.amount/r.total)*100:0}%`, background:r.color, borderRadius:4, transition:"width .8s ease" }}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:20, padding:"14px 16px", background:C.bg, borderRadius:10 }}>
            <p style={{ fontSize:12, color:C.textMuted, marginBottom:4 }}>Provider Breakdown</p>
            {providers.filter(p=>p.status==="active").sort((a,b)=>b.monthly_revenue-a.monthly_revenue).map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12, fontWeight:500 }}>{p.name}</span>
                <span style={{ fontSize:12, fontFamily:mono, color:C.accent }}>₨{p.monthly_revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MESSAGES PAGE ───────────────────────────────────────
const MessagesPage = () => (
  <div>
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:12, color:C.danger, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>Admin</p>
      <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-.5 }}>WhatsApp Message Logs</h2>
      <p style={{ color:C.textMuted, fontSize:13, marginTop:2 }}>Messages sent across all providers</p>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
      <Stat title="Sent Today" value={MOCK_MESSAGES_LOG.reduce((s,m)=>s+m.messages_sent,0).toLocaleString()} icon="send" color={C.accent} delay={1}/>
      <Stat title="Failed Today" value={MOCK_MESSAGES_LOG.reduce((s,m)=>s+m.messages_failed,0)} icon="alert" color={C.danger} delay={2}/>
      <Stat title="Success Rate" value={`${(100 - (MOCK_MESSAGES_LOG.reduce((s,m)=>s+m.messages_failed,0) / MOCK_MESSAGES_LOG.reduce((s,m)=>s+m.messages_sent,0) * 100)).toFixed(1)}%`} icon="check" color={C.blue} delay={3}/>
    </div>

    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ borderBottom:`1px solid ${C.border}` }}>
            {["Provider","Messages Sent","Failed","Success Rate","Date"].map(h => (
              <th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.textMuted, textTransform:"uppercase", letterSpacing:.5 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_MESSAGES_LOG.map(m => (
            <tr key={m.id} style={{ borderBottom:`1px solid ${C.border}` }}
              onMouseEnter={e=>e.currentTarget.style.background=C.cardHover}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <td style={{ padding:"11px 14px", fontSize:13, fontWeight:600 }}>{m.provider}</td>
              <td style={{ padding:"11px 14px", fontSize:14, fontFamily:mono, fontWeight:700, color:C.accent }}>{m.messages_sent}</td>
              <td style={{ padding:"11px 14px", fontSize:14, fontFamily:mono, fontWeight:600, color:m.messages_failed>5?C.danger:C.warn }}>{m.messages_failed}</td>
              <td style={{ padding:"11px 14px" }}>
                <Badge color={C.accent}>{(100-(m.messages_failed/m.messages_sent*100)).toFixed(1)}%</Badge>
              </td>
              <td style={{ padding:"11px 14px", fontSize:12, color:C.textMuted, fontFamily:mono }}>{m.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── SYSTEM HEALTH PAGE ──────────────────────────────────
const SystemPage = () => (
  <div>
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:12, color:C.danger, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:2 }}>Admin</p>
      <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-.5 }}>System Health</h2>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
      {[
        { service:"n8n Workflow Engine", status:"running", uptime:"99.8%", icon:"zap", color:C.accent, detail:"Last execution: 2 min ago" },
        { service:"WhatsApp Cloud API", status:"connected", uptime:"99.5%", icon:"send", color:C.accent, detail:"Meta verified · Phone ID: 9112..." },
        { service:"Supabase Database", status:"connected", uptime:"99.9%", icon:"shield", color:C.accent, detail:"PostgreSQL · 2.3GB used" },
        { service:"Stripe Payments", status:"connected", uptime:"100%", icon:"dollar", color:C.accent, detail:"Live mode · PKR enabled" },
        { service:"Twilio Voice", status:"warning", uptime:"97.2%", icon:"bell", color:C.warn, detail:"Balance low: $2.34 remaining" },
        { service:"Cron Scheduler", status:"running", uptime:"100%", icon:"clock", color:C.accent, detail:"Next run: 9:00 AM tomorrow" },
      ].map((s,i) => (
        <div key={s.service} className={`fu d${Math.min(i+1,5)}`} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:42, height:42, borderRadius:11, background:s.color+"12", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon d={I[s.icon]} size={20} color={s.color}/>
            </div>
            <div>
              <p style={{ fontSize:14, fontWeight:700 }}>{s.service}</p>
              <p style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>{s.detail}</p>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <Badge color={s.status==="warning"?C.warn:C.accent}>
              {s.status === "running" ? "● Running" : s.status === "connected" ? "● Connected" : "◐ Warning"}
            </Badge>
            <p style={{ fontSize:11, color:C.textDim, marginTop:4, fontFamily:mono }}>{s.uptime} uptime</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────
export default function AdminPanel() {
  const [page, setPage] = useState("overview");
  const [providers, setProviders] = useState(MOCK_PROVIDERS);

  const pages = {
    overview: <OverviewPage providers={providers}/>,
    providers: <ProvidersPage providers={providers} setProviders={setProviders}/>,
    revenue: <RevenuePage providers={providers}/>,
    messages: <MessagesPage/>,
    system: <SystemPage/>,
  };

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:C.bg }}>
        <Sidebar active={page} setActive={setPage}/>
        <div style={{ flex:1, padding:"28px 36px", overflowY:"auto", maxHeight:"100vh" }}>
          {pages[page]}
        </div>
      </div>
    </>
  );
}