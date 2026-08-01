mport { useState, useEffect, useCallback } from "react";

// ─── Mock Data ───────────────────────────────────────────
const MOCK_CUSTOMERS = [
  { id: 1, name: "Ahmed Khan", phone: "03001234567", package_name: "20 Mbps", package_price: 1500, expiry_date: "2026-04-05", status: "active" },
  { id: 2, name: "Bilal Shah", phone: "03119876543", package_name: "50 Mbps", package_price: 2500, expiry_date: "2026-04-06", status: "active" },
  { id: 3, name: "Fatima Noor", phone: "03215556667", package_name: "10 Mbps", package_price: 800, expiry_date: "2026-04-10", status: "active" },
  { id: 4, name: "Hassan Ali", phone: "03331112223", package_name: "30 Mbps", package_price: 2000, expiry_date: "2026-04-03", status: "active" },
  { id: 5, name: "Zainab Malik", phone: "03451239876", package_name: "100 Mbps", package_price: 4000, expiry_date: "2026-03-28", status: "suspended" },
  { id: 6, name: "Omar Farooq", phone: "03007778889", package_name: "20 Mbps", package_price: 1500, expiry_date: "2026-04-15", status: "active" },
  { id: 7, name: "Ayesha Raza", phone: "03121234567", package_name: "50 Mbps", package_price: 2500, expiry_date: "2026-03-30", status: "suspended" },
  { id: 8, name: "Usman Ghani", phone: "03229998887", package_name: "30 Mbps", package_price: 2000, expiry_date: "2026-04-20", status: "active" },
];

const MOCK_LOGS = [
  { id: 1, customer: "Ahmed Khan", phone: "03001234567", type: "7-day reminder", status: "sent", date: "2026-03-29 09:00" },
  { id: 2, customer: "Bilal Shah", phone: "03119876543", type: "3-day reminder", status: "sent", date: "2026-04-03 09:00" },
  { id: 3, customer: "Hassan Ali", phone: "03331112223", type: "Expiry notice", status: "sent", date: "2026-04-03 09:00" },
  { id: 4, customer: "Zainab Malik", phone: "03451239876", type: "Overdue warning", status: "sent", date: "2026-04-01 10:00" },
  { id: 5, customer: "Zainab Malik", phone: "03451239876", type: "Suspended notice", status: "sent", date: "2026-04-03 10:00" },
  { id: 6, customer: "Ayesha Raza", phone: "03121234567", type: "Overdue warning", status: "failed", date: "2026-04-02 10:00" },
  { id: 7, customer: "Omar Farooq", phone: "03007778889", type: "7-day reminder", status: "sent", date: "2026-04-02 09:00" },
];

// ─── Helpers ─────────────────────────────────────────────
const daysUntil = (dateStr) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const exp = new Date(dateStr); exp.setHours(0,0,0,0);
  return Math.ceil((exp - today) / 86400000);
};

const formatDate = (d) => new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });

// ─── Icons (inline SVG) ─────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2 M23 21v-2a4 4 0 00-3-3.87 M9 7a4 4 0 100-8 4 4 0 000 8 M16 3.13a4 4 0 010 7.75",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  credit: "M1 4h22v16H1V4z M1 10h22",
  plus: "M12 5v14 M5 12h14",
  search: "M11 3a8 8 0 100 16 8 8 0 000-16z M21 21l-4.35-4.35",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18 M6 6l12 12",
  alert: "M12 9v4 M12 17h.01 M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  clock: "M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  chevDown: "M6 9l6 6 6-6",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ─── Style Constants ─────────────────────────────────────
const C = {
  bg: "#0B0F1A",
  card: "#111827",
  cardHover: "#1a2235",
  border: "#1E293B",
  accent: "#06D6A0",
  accentDim: "rgba(6,214,160,0.12)",
  danger: "#EF4444",
  dangerDim: "rgba(239,68,68,0.12)",
  warn: "#F59E0B",
  warnDim: "rgba(245,158,11,0.12)",
  blue: "#3B82F6",
  blueDim: "rgba(59,130,246,0.12)",
  text: "#F1F5F9",
  textDim: "#94A3B8",
  textMuted: "#64748B",
  purple: "#8B5CF6",
  purpleDim: "rgba(139,92,246,0.12)",
};

const font = "'Outfit', 'Segoe UI', sans-serif";
const fontMono = "'JetBrains Mono', 'Fira Code', monospace";

// ─── Styles ──────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:${C.bg}; color:${C.text}; font-family:${font}; }
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:${C.bg}; }
  ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
  input, select, textarea { font-family:${font}; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .stagger-1 { animation-delay: 0.05s; opacity:0; }
  .stagger-2 { animation-delay: 0.1s; opacity:0; }
  .stagger-3 { animation-delay: 0.15s; opacity:0; }
  .stagger-4 { animation-delay: 0.2s; opacity:0; }
`;

// ─── Reusable Components ─────────────────────────────────
const Badge = ({ children, color = C.accent, bg }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px",
    borderRadius:20, fontSize:12, fontWeight:600, letterSpacing:0.3,
    color, background: bg || (color + "18"),
  }}>{children}</span>
);

const Button = ({ children, onClick, variant = "primary", icon, small, full, disabled }) => {
  const styles = {
    primary: { bg: C.accent, color: "#0B0F1A", hover: "#04c090" },
    danger: { bg: C.danger, color: "#fff", hover: "#dc2626" },
    ghost: { bg: "transparent", color: C.textDim, hover: C.card },
    outline: { bg: "transparent", color: C.accent, hover: C.accentDim, border: C.accent },
  };
  const s = styles[variant];
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        padding: small ? "6px 14px" : "10px 20px",
        borderRadius:10, fontSize: small ? 13 : 14, fontWeight:600, fontFamily:font,
        background: hovered ? s.hover : s.bg,
        color: s.color, border: s.border ? `1.5px solid ${s.border}` : "none",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        transition:"all 0.2s", width: full ? "100%" : "auto",
        letterSpacing: 0.3,
      }}
    >
      {icon && <Icon d={Icons[icon]} size={small ? 14 : 16} />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text", icon }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:13, fontWeight:500, color:C.textDim }}>{label}</label>}
    <div style={{ position:"relative" }}>
      {icon && <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}><Icon d={Icons[icon]} size={16}/></span>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width:"100%", padding: icon ? "10px 14px 10px 38px" : "10px 14px",
          background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:10,
          color:C.text, fontSize:14, outline:"none", transition:"border 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = C.accent}
        onBlur={e => e.target.style.borderColor = C.border}
      />
    </div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:13, fontWeight:500, color:C.textDim }}>{label}</label>}
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        width:"100%", padding:"10px 14px", background:C.bg,
        border:`1.5px solid ${C.border}`, borderRadius:10,
        color:C.text, fontSize:14, outline:"none", appearance:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394A3B8' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center",
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const StatCard = ({ title, value, subtitle, icon, color, delay }) => (
  <div className={`fade-in stagger-${delay}`} style={{
    background:C.card, border:`1px solid ${C.border}`, borderRadius:16,
    padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"flex-start",
    transition:"all 0.25s", cursor:"default",
  }}
  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-2px)"; }}
  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div>
      <p style={{ fontSize:13, color:C.textMuted, fontWeight:500, marginBottom:8, letterSpacing:0.5, textTransform:"uppercase" }}>{title}</p>
      <p style={{ fontSize:32, fontWeight:700, color, lineHeight:1, fontFamily:fontMono }}>{value}</p>
      {subtitle && <p style={{ fontSize:12, color:C.textDim, marginTop:6 }}>{subtitle}</p>}
    </div>
    <div style={{ width:44, height:44, borderRadius:12, background:color+"15", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Icon d={Icons[icon]} size={22} color={color}/>
    </div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div style={{
    position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000,
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} className="fade-in" style={{
      background:C.card, border:`1px solid ${C.border}`, borderRadius:20,
      padding:32, width:"90%", maxWidth:500, maxHeight:"85vh", overflowY:"auto",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <h3 style={{ fontSize:20, fontWeight:700 }}>{title}</h3>
        <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer", padding:4 }}>
          <Icon d={Icons.x} size={20}/>
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ─── LOGIN PAGE ──────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:`radial-gradient(ellipse at 30% 20%, rgba(6,214,160,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.04) 0%, transparent 50%), ${C.bg}` }}>
      <div className="fade-in" style={{ width:"100%", maxWidth:420, padding:20 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:64, height:64, borderRadius:18, background:`linear-gradient(135deg, ${C.accent}, ${C.blue})`, display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
            <Icon d={Icons.wifi} size={32} color="#fff"/>
          </div>
          <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:-0.5 }}>WiFi Manager<span style={{color:C.accent}}>Pro</span></h1>
          <p style={{ color:C.textMuted, fontSize:14, marginTop:6 }}>Smart automation for WiFi providers</p>
        </div>

        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:32 }}>
          <div style={{ display:"flex", background:C.bg, borderRadius:12, padding:4, marginBottom:28 }}>
            {["Login", "Sign Up"].map((t, i) => (
              <button key={t} onClick={() => setIsSignup(i === 1)} style={{
                flex:1, padding:"10px 0", borderRadius:10, border:"none", fontSize:14, fontWeight:600,
                fontFamily:font, cursor:"pointer", transition:"all 0.2s",
                background: (i===0 ? !isSignup : isSignup) ? C.accent : "transparent",
                color: (i===0 ? !isSignup : isSignup) ? C.bg : C.textMuted,
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {isSignup && <Input label="Full Name" value={name} onChange={setName} placeholder="Your name" />}
            {isSignup && <Input label="Company / ISP Name" value={company} onChange={setCompany} placeholder="e.g. FastNet WiFi" />}
            <Input label="Email" value={email} onChange={setEmail} placeholder="you@company.com" type="email" />
            <Input label="Password" value={pass} onChange={setPass} placeholder="••••••••" type="password" />
            <Button full onClick={onLogin} icon="zap">
              {isSignup ? "Start Free Trial →" : "Login →"}
            </Button>
          </div>

          {isSignup && (
            <p style={{ textAlign:"center", fontSize:12, color:C.textMuted, marginTop:16 }}>
              ✨ 3-day free trial · No credit card required
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR ─────────────────────────────────────────────
const Sidebar = ({ active, setActive }) => {
  const items = [
    { id:"dashboard", icon:"dashboard", label:"Dashboard" },
    { id:"customers", icon:"users", label:"Customers" },
    { id:"notifications", icon:"bell", label:"Notifications" },
    { id:"billing", icon:"credit", label:"Billing" },
    { id:"settings", icon:"settings", label:"Settings" },
  ];
  return (
    <div style={{
      width:240, minHeight:"100vh", background:C.card, borderRight:`1px solid ${C.border}`,
      padding:"24px 16px", display:"flex", flexDirection:"column",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 8px", marginBottom:36 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg, ${C.accent}, ${C.blue})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d={Icons.wifi} size={18} color="#fff"/>
        </div>
        <div>
          <p style={{ fontSize:16, fontWeight:700, letterSpacing:-0.3 }}>WiFi<span style={{color:C.accent}}>Pro</span></p>
          <p style={{ fontSize:11, color:C.textMuted }}>SaaS Dashboard</p>
        </div>
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display:"flex", alignItems:"center", gap:12, padding:"11px 14px",
              borderRadius:12, border:"none", cursor:"pointer", fontSize:14, fontWeight:500,
              fontFamily:font, transition:"all 0.2s", textAlign:"left",
              background: active === item.id ? C.accentDim : "transparent",
              color: active === item.id ? C.accent : C.textDim,
            }}
          >
            <Icon d={Icons[item.icon]} size={18}/>
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px" }}>
          <div style={{ width:34, height:34, borderRadius:10, background:C.purpleDim, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:C.purple }}>
            MN
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:13, fontWeight:600 }}>Muhammad</p>
            <p style={{ fontSize:11, color:C.textMuted }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── DASHBOARD PAGE ──────────────────────────────────────
const DashboardPage = ({ customers }) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const active = customers.filter(c => c.status === "active").length;
  const suspended = customers.filter(c => c.status === "suspended").length;
  const expiringIn7 = customers.filter(c => { const d = daysUntil(c.expiry_date); return d >= 0 && d <= 7 && c.status==="active"; });
  const revenue = customers.filter(c=>c.status==="active").reduce((s,c)=>s+c.package_price,0);

  return (
    <div>
      <div style={{ marginBottom:32 }}>
        <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Dashboard</h2>
        <p style={{ color:C.textMuted, fontSize:14, marginTop:4 }}>Overview of your WiFi business</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginBottom:32 }}>
        <StatCard title="Total Clients" value={customers.length} subtitle={`${active} active`} icon="users" color={C.accent} delay={1}/>
        <StatCard title="Expiring Soon" value={expiringIn7.length} subtitle="Next 7 days" icon="alert" color={C.warn} delay={2}/>
        <StatCard title="Suspended" value={suspended} subtitle="Payment overdue" icon="x" color={C.danger} delay={3}/>
        <StatCard title="Monthly Revenue" value={`₨${revenue.toLocaleString()}`} subtitle="Active packages" icon="zap" color={C.blue} delay={4}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Expiring Soon Table */}
        <div className="fade-in" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24, animationDelay:"0.25s", opacity:0 }}>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <Icon d={Icons.alert} size={18} color={C.warn}/> Expiring Soon
          </h3>
          {expiringIn7.length === 0 ? (
            <p style={{ color:C.textMuted, fontSize:14 }}>No customers expiring in 7 days</p>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {expiringIn7.slice(0,5).map(c => {
                const d = daysUntil(c.expiry_date);
                return (
                  <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:C.bg, borderRadius:10 }}>
                    <div>
                      <p style={{ fontSize:14, fontWeight:600 }}>{c.name}</p>
                      <p style={{ fontSize:12, color:C.textMuted }}>{c.package_name} · ₨{c.package_price}</p>
                    </div>
                    <Badge color={d <= 1 ? C.danger : d <= 3 ? C.warn : C.blue}>
                      {d === 0 ? "Today" : d === 1 ? "Tomorrow" : `${d} days`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="fade-in" style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24, animationDelay:"0.3s", opacity:0 }}>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <Icon d={Icons.bell} size={18} color={C.accent}/> Recent Notifications
          </h3>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {MOCK_LOGS.slice(0,5).map(log => (
              <div key={log.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:C.bg, borderRadius:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{
                    width:8, height:8, borderRadius:4,
                    background: log.status === "sent" ? C.accent : C.danger,
                  }}/>
                  <div>
                    <p style={{ fontSize:13, fontWeight:500 }}>{log.customer}</p>
                    <p style={{ fontSize:11, color:C.textMuted }}>{log.type}</p>
                  </div>
                </div>
                <p style={{ fontSize:11, color:C.textMuted, fontFamily:fontMono }}>{log.date.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CUSTOMERS PAGE ──────────────────────────────────────
const CustomersPage = ({ customers, setCustomers }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name:"", phone:"", package_name:"20 Mbps", package_price:1500, expiry_date:"" });

  const filtered = customers.filter(c => {
    if (filter === "active" && c.status !== "active") return false;
    if (filter === "suspended" && c.status !== "suspended") return false;
    if (filter === "expiring") { const d = daysUntil(c.expiry_date); if (!(d >= 0 && d <= 7 && c.status==="active")) return false; }
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false;
    return true;
  });

  const addCustomer = () => {
    if (!form.name || !form.phone || !form.expiry_date) return;
    setCustomers(prev => [...prev, { ...form, id: Date.now(), status:"active", package_price: Number(form.package_price) }]);
    setForm({ name:"", phone:"", package_name:"20 Mbps", package_price:1500, expiry_date:"" });
    setShowAdd(false);
  };

  const deleteCustomer = (id) => setCustomers(prev => prev.filter(c => c.id !== id));

  const packages = [
    { value:"10 Mbps", label:"10 Mbps - ₨800" },
    { value:"20 Mbps", label:"20 Mbps - ₨1,500" },
    { value:"30 Mbps", label:"30 Mbps - ₨2,000" },
    { value:"50 Mbps", label:"50 Mbps - ₨2,500" },
    { value:"100 Mbps", label:"100 Mbps - ₨4,000" },
  ];
  const priceMap = {"10 Mbps":800,"20 Mbps":1500,"30 Mbps":2000,"50 Mbps":2500,"100 Mbps":4000};

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Customers</h2>
          <p style={{ color:C.textMuted, fontSize:14, marginTop:4 }}>{customers.length} total customers</p>
        </div>
        <Button icon="plus" onClick={() => setShowAdd(true)}>Add Customer</Button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200 }}>
          <Input value={search} onChange={setSearch} placeholder="Search by name or phone..." icon="search"/>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {[{v:"all",l:"All"},{v:"active",l:"Active"},{v:"expiring",l:"Expiring"},{v:"suspended",l:"Suspended"}].map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)} style={{
              padding:"8px 16px", borderRadius:10, border:`1.5px solid ${filter===f.v ? C.accent : C.border}`,
              background: filter===f.v ? C.accentDim : "transparent", color: filter===f.v ? C.accent : C.textDim,
              fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:font, transition:"all 0.2s",
            }}>{f.l}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                {["Name","Phone","Package","Price","Expiry","Status","Days Left","Actions"].map(h => (
                  <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const days = daysUntil(c.expiry_date);
                return (
                  <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}`, transition:"background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.cardHover}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"12px 16px", fontSize:14, fontWeight:600 }}>{c.name}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, fontFamily:fontMono, color:C.textDim }}>{c.phone}</td>
                    <td style={{ padding:"12px 16px", fontSize:13 }}>{c.package_name}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, fontFamily:fontMono }}>₨{c.package_price.toLocaleString()}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, color:C.textDim }}>{formatDate(c.expiry_date)}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <Badge color={c.status==="active" ? C.accent : C.danger}>
                        {c.status === "active" ? "● Active" : "● Suspended"}
                      </Badge>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      {c.status === "suspended" ? (
                        <Badge color={C.danger}>Overdue</Badge>
                      ) : days < 0 ? (
                        <Badge color={C.danger}>Expired</Badge>
                      ) : days === 0 ? (
                        <Badge color={C.danger}>Today!</Badge>
                      ) : days <= 3 ? (
                        <Badge color={C.warn}>{days}d left</Badge>
                      ) : days <= 7 ? (
                        <Badge color={C.blue}>{days}d left</Badge>
                      ) : (
                        <span style={{ fontSize:13, color:C.textDim, fontFamily:fontMono }}>{days}d</span>
                      )}
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:6, cursor:"pointer", color:C.textMuted, transition:"all 0.2s" }}
                          onMouseEnter={e=>{e.currentTarget.style.color=C.accent;e.currentTarget.style.borderColor=C.accent}}
                          onMouseLeave={e=>{e.currentTarget.style.color=C.textMuted;e.currentTarget.style.borderColor=C.border}}>
                          <Icon d={Icons.send} size={14}/>
                        </button>
                        <button onClick={() => deleteCustomer(c.id)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:6, cursor:"pointer", color:C.textMuted, transition:"all 0.2s" }}
                          onMouseEnter={e=>{e.currentTarget.style.color=C.danger;e.currentTarget.style.borderColor=C.danger}}
                          onMouseLeave={e=>{e.currentTarget.style.color=C.textMuted;e.currentTarget.style.borderColor=C.border}}>
                          <Icon d={Icons.trash} size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding:40, textAlign:"center", color:C.textMuted }}>
            <Icon d={Icons.users} size={40} color={C.border}/>
            <p style={{ marginTop:12 }}>No customers found</p>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAdd && (
        <Modal title="Add New Customer" onClose={() => setShowAdd(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <Input label="Customer Name *" value={form.name} onChange={v => setForm({...form, name:v})} placeholder="e.g. Ahmed Khan"/>
            <Input label="WhatsApp Number *" value={form.phone} onChange={v => setForm({...form, phone:v})} placeholder="e.g. 03001234567"/>
            <Select label="Package" value={form.package_name} onChange={v => setForm({...form, package_name:v, package_price:priceMap[v]})} options={packages}/>
            <Input label="Expiry Date *" value={form.expiry_date} onChange={v => setForm({...form, expiry_date:v})} type="date"/>
            <div style={{ display:"flex", gap:12, marginTop:8 }}>
              <Button full onClick={addCustomer} icon="plus">Add Customer</Button>
              <Button full variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── NOTIFICATIONS PAGE ──────────────────────────────────
const NotificationsPage = () => {
  const [filter, setFilter] = useState("all");
  const filtered = MOCK_LOGS.filter(l => filter === "all" || l.status === filter);

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Notification Logs</h2>
        <p style={{ color:C.textMuted, fontSize:14, marginTop:4 }}>WhatsApp messages sent to customers</p>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:20 }}>
        {[{v:"all",l:"All"},{v:"sent",l:"Sent"},{v:"failed",l:"Failed"}].map(f => (
          <button key={f.v} onClick={() => setFilter(f.v)} style={{
            padding:"8px 16px", borderRadius:10, border:`1.5px solid ${filter===f.v ? C.accent : C.border}`,
            background: filter===f.v ? C.accentDim : "transparent", color: filter===f.v ? C.accent : C.textDim,
            fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:font,
          }}>{f.l}</button>
        ))}
      </div>

      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${C.border}` }}>
              {["Customer","Phone","Type","Status","Date & Time"].map(h => (
                <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:600, color:C.textMuted, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id} style={{ borderBottom:`1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.background=C.cardHover}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"12px 16px", fontSize:14, fontWeight:600 }}>{log.customer}</td>
                <td style={{ padding:"12px 16px", fontSize:13, fontFamily:fontMono, color:C.textDim }}>{log.phone}</td>
                <td style={{ padding:"12px 16px" }}>
                  <Badge color={
                    log.type.includes("7-day") ? C.blue :
                    log.type.includes("3-day") ? C.warn :
                    log.type.includes("Expiry") ? C.danger :
                    log.type.includes("Overdue") ? C.danger :
                    log.type.includes("Suspended") ? C.purple : C.accent
                  }>{log.type}</Badge>
                </td>
                <td style={{ padding:"12px 16px" }}>
                  <Badge color={log.status === "sent" ? C.accent : C.danger}>
                    {log.status === "sent" ? "✓ Sent" : "✕ Failed"}
                  </Badge>
                </td>
                <td style={{ padding:"12px 16px", fontSize:13, fontFamily:fontMono, color:C.textDim }}>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── BILLING PAGE ────────────────────────────────────────
const BillingPage = () => {
  const [plan, setPlan] = useState("pro");
  const plans = [
    { id:"basic", name:"Basic", price:"₨2,000", period:"/month", features:["Up to 50 customers","WhatsApp reminders","Basic dashboard","Email support"], color:C.blue },
    { id:"pro", name:"Pro", price:"₨5,000", period:"/month", features:["Unlimited customers","WhatsApp + Voice calls","Advanced analytics","Priority support","Custom messages"], color:C.accent, popular:true },
    { id:"enterprise", name:"Enterprise", price:"₨10,000", period:"/month", features:["Everything in Pro","Multi-location","MikroTik integration","API access","Dedicated support","White-label option"], color:C.purple },
  ];

  return (
    <div>
      <div style={{ marginBottom:32 }}>
        <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Billing & Subscription</h2>
        <p style={{ color:C.textMuted, fontSize:14, marginTop:4 }}>Manage your subscription plan</p>
      </div>

      {/* Current Plan Banner */}
      <div className="fade-in" style={{
        background:`linear-gradient(135deg, rgba(6,214,160,0.1), rgba(59,130,246,0.1))`,
        border:`1px solid ${C.accent}30`, borderRadius:16, padding:24, marginBottom:32,
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <div>
          <Badge color={C.accent}>CURRENT PLAN</Badge>
          <h3 style={{ fontSize:24, fontWeight:700, marginTop:8 }}>Pro Plan · ₨5,000/mo</h3>
          <p style={{ color:C.textDim, fontSize:14, marginTop:4 }}>Trial ends: April 6, 2026 · 3 days remaining</p>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <Button variant="outline">Manage</Button>
          <Button variant="ghost" icon="credit">Update Card</Button>
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20 }}>
        {plans.map(p => (
          <div key={p.id} className="fade-in" style={{
            background:C.card, border:`1.5px solid ${plan===p.id ? p.color : C.border}`,
            borderRadius:20, padding:28, position:"relative", transition:"all 0.3s",
            transform: plan===p.id ? "scale(1.02)" : "scale(1)",
          }}
          onMouseEnter={e => { if(plan!==p.id) e.currentTarget.style.borderColor=p.color+"60"; }}
          onMouseLeave={e => { if(plan!==p.id) e.currentTarget.style.borderColor=C.border; }}
          >
            {p.popular && (
              <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)" }}>
                <Badge color="#fff" bg={C.accent}>⚡ MOST POPULAR</Badge>
              </div>
            )}
            <h3 style={{ fontSize:20, fontWeight:700, color:p.color }}>{p.name}</h3>
            <div style={{ marginTop:12, marginBottom:20 }}>
              <span style={{ fontSize:36, fontWeight:800, fontFamily:fontMono }}>{p.price}</span>
              <span style={{ color:C.textMuted, fontSize:14 }}>{p.period}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {p.features.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:C.textDim }}>
                  <Icon d={Icons.check} size={16} color={p.color}/> {f}
                </div>
              ))}
            </div>
            <Button full variant={plan===p.id ? "primary" : "outline"} onClick={() => setPlan(p.id)}>
              {plan===p.id ? "Current Plan" : "Switch Plan"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SETTINGS PAGE ───────────────────────────────────────
const SettingsPage = () => (
  <div>
    <div style={{ marginBottom:32 }}>
      <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>Settings</h2>
      <p style={{ color:C.textMuted, fontSize:14, marginTop:4 }}>Configure your account</p>
    </div>
    <div style={{ display:"grid", gap:20, maxWidth:600 }}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
        <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>WhatsApp Configuration</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="WhatsApp Phone Number ID" value="" onChange={()=>{}} placeholder="e.g. 911295002071462"/>
          <Input label="WhatsApp Access Token" value="" onChange={()=>{}} placeholder="Your Meta access token" type="password"/>
          <Button icon="check" small>Save WhatsApp Settings</Button>
        </div>
      </div>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
        <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>Payment Methods (for your customers)</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="JazzCash Number" value="" onChange={()=>{}} placeholder="03XX-XXXXXXX"/>
          <Input label="EasyPaisa Number" value="" onChange={()=>{}} placeholder="03XX-XXXXXXX"/>
          <Input label="Bank Account (optional)" value="" onChange={()=>{}} placeholder="Account number"/>
          <Button icon="check" small>Save Payment Info</Button>
        </div>
      </div>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
        <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>Notification Schedule</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Select label="Reminder Days Before Expiry" value="7,3,1" onChange={()=>{}} options={[
            {value:"7,3,1",label:"7 days, 3 days, 1 day (recommended)"},
            {value:"7,3",label:"7 days, 3 days"},
            {value:"3,1",label:"3 days, 1 day"},
          ]}/>
          <Select label="Overdue Action" value="suspend-7" onChange={()=>{}} options={[
            {value:"suspend-7",label:"Auto-suspend after 7 days overdue"},
            {value:"suspend-3",label:"Auto-suspend after 3 days overdue"},
            {value:"manual",label:"Manual suspension only"},
          ]}/>
          <Button icon="check" small>Save Schedule</Button>
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [mobileMenu, setMobileMenu] = useState(false);

  const pages = {
    dashboard: <DashboardPage customers={customers}/>,
    customers: <CustomersPage customers={customers} setCustomers={setCustomers}/>,
    notifications: <NotificationsPage />,
    billing: <BillingPage />,
    settings: <SettingsPage />,
  };

  if (!loggedIn) return (
    <>
      <style>{globalStyles}</style>
      <LoginPage onLogin={() => setLoggedIn(true)}/>
    </>
  );

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:C.bg }}>
        <Sidebar active={page} setActive={(p) => { setPage(p); setMobileMenu(false); }}/>
        <div style={{ flex:1, padding:"32px 40px", overflowY:"auto", maxHeight:"100vh" }}>
          {pages[page]}
        </div>
      </div>
    </>
  );
}