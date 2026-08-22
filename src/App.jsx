import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight, Check, ChevronRight, CircleAlert, Clock3, Download, FileWarning, Globe2,
  Link2, LockKeyhole, Menu, MousePointer2, Radar, ScanSearch, Shield,
  ShieldAlert, ShieldCheck, TimerReset, TriangleAlert, X, Zap,
} from 'lucide-react'

const nav = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Extension', href: '/extension' },
  { label: 'Portal', href: '/portal' },
  { label: 'Protection', href: '/protection' },
]

const securityStates = {
  safe: { score: 94, label: 'Safe to browse', host: 'northstar-studio.com', note: 'No active threats found' },
  scan: { score: 71, label: 'Analyzing site', host: 'northstar-studio.com', note: 'Reviewing 18 security signals' },
  danger: { score: 28, label: 'Danger detected', host: 'paypa1-account.com', note: '3 threats need your attention' },
}

function useSecurityCycle() {
  const [state, setState] = useState('safe')
  useEffect(() => {
    const order = ['safe', 'scan', 'danger']
    let index = 0
    const timer = setInterval(() => {
      index = (index + 1) % order.length
      setState(order[index])
    }, 3500)
    return () => clearInterval(timer)
  }, [])
  return state
}

function GuardianMark({ size = 22 }) {
  return <span className="guardian-mark" style={{ width: size, height: size }}><ShieldCheck size={size * 0.62} strokeWidth={2.7} /></span>
}

function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const mode = useSecurityCycle()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const openInstall = () => setInstallOpen(true)
  const page = location.pathname === '/portal' || location.pathname === '/portal/admin' ? <Portal adminRoute={location.pathname === '/portal/admin'} /> : location.pathname === '/extension' ? <ExtensionPage onInstall={openInstall} /> : location.pathname === '/features' ? <FeaturePage /> : location.pathname === '/how-it-works' ? <HowItWorksPage mode={mode} /> : location.pathname === '/protection' ? <ProtectionPage /> : <Landing mode={mode} onInstall={openInstall} />

  return (
    <main>
      <div className="page-grid" />
      <div className="ambient glow-left" /><div className="ambient glow-right" />
      <svg className="network" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 652C171 538 252 685 423 578s299-48 404 25 221 44 362-107 216-91 307-47" /><path d="M872-10c-72 181 146 165 196 284s179 81 397-31" /><circle cx="423" cy="578" r="3" /><circle cx="827" cy="603" r="3" /><circle cx="1189" cy="496" r="3" /></svg>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />
      {page}
      <InstallModal open={installOpen} onClose={() => setInstallOpen(false)} />
    </main>
  )
}

function AddToChromeButton({ children = 'Download Guardian Extension', className = 'button primary', onClick }) {
  return <button className={className} onClick={onClick}>{children}<ArrowRight size={16} /></button>
}

function Landing({ mode, onInstall }) { return <><Hero mode={mode} onInstall={onInstall} /><TrustStrip /><ProductShowcase /><FeaturePreview /><HowItWorksPreview mode={mode} /><ExtensionPreview mode={mode} /><FinalCta onInstall={onInstall} /></> }

function Navbar({ menuOpen, setMenuOpen, scrolled }) {
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <nav className="shell navbar" aria-label="Main navigation">
      <Link className="brand" to="/"><GuardianMark size={25} /><span>Guardian</span></Link>
      <div className="nav-links">{nav.map(item => <Link key={item.label} to={item.href}>{item.label}</Link>)}</div>
      <div className="nav-actions"><AddToChromeButton className="extension-link" /><Link className="portal-button" to="/portal">Open Portal <ArrowRight size={14} /></Link></div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button>
    </nav>
    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu shell" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      {nav.map(item => <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight size={15} /></Link>)}
    </motion.div>}</AnimatePresence>
  </header>
}

function Hero({ mode, onInstall }) {
  return <section className="hero shell" id="top">
    <div className="hero-copy">
      <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><i /> Real-time code protection</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .78, delay: .08, ease: [0.16, 1, .3, 1] }}>The web isn&apos;t always<br /><span>what it looks like.</span></motion.h1>
      <motion.p className="lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .18 }}>Guardian catches malicious code, exposed secrets and vulnerable dependencies before they reach production.</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .28 }}>
        <AddToChromeButton onClick={onInstall} /><Link className="button secondary" to="/extension">Explore Extension <ChevronRight size={16} /></Link>
      </motion.div>
      <motion.ul className="proofs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}><li><Check size={14} /> Vulnerability detection</li><li><Check size={14} /> Secret scanning</li><li><Check size={14} /> Secure suggestions</li></motion.ul>
    </div>
    <motion.div className="hero-display" initial={{ opacity: 0, x: 44, y: 18 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: .9, delay: .15, ease: [0.16, 1, .3, 1] }}><ExtensionScene mode={mode} /></motion.div>
  </section>
}

function ExtensionScene({ mode }) {
  const data = securityStates[mode]
  const danger = mode === 'danger'
  const scanning = mode === 'scan'
  return <div className={`extension-scene ${mode}`}>
    <div className="visual-orb cyan" /><div className="visual-orb indigo" />
    <motion.div className="float-card verified" animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><span><Check size={14} /></span><p><small>Domain verified</small><b>Identity confirmed</b></p></motion.div>
    <motion.div className="float-card analyzed" animate={{ y: [0, 8, 0], rotate: [2, 3, 2] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}><span><Zap size={14} /></span><p><small>Live analysis</small><b>18 signals checked</b></p></motion.div>
    <div className="browser-window">
      <div className="chrome-bar"><Dots /><div className="address"><LockKeyhole size={11} /><span>{danger ? 'paypa1-account.com' : 'northstar-studio.com'}</span></div><b>N</b></div>
      <div className="clean-site"><div className="clean-nav"><strong>northstar</strong><span>Work</span><span>Studio</span><span>Contact</span></div><div className="clean-content"><div><small>Designing tomorrow</small><h2>Ideas that<br />move people.</h2><p>A forward-facing creative studio.</p></div><i /><em /></div><div className="clean-squares"><i /><i /><i /></div></div>
    </div>
    <div className={`extension-popup ${mode}`}>
      <div className="popup-header"><span><GuardianMark size={21} /> Guardian</span><i className="status-dot" /></div>
      <div className="popup-host"><Globe2 size={12} /> {data.host}</div>
      <div className="score-row"><Score value={data.score} danger={danger} scanning={scanning} /><div><small>{scanning ? 'Live analysis' : 'Security rating'}</small><h3>{data.label}</h3><p>{data.note}</p></div></div>
      <div className="check-list"><PopupLine icon={danger ? <CircleAlert size={14} /> : <Check size={14} />} label={danger ? 'Look-alike domain' : 'Domain verified'} bad={danger} /><PopupLine icon={danger ? <CircleAlert size={14} /> : <LockKeyhole size={13} />} label={danger ? 'Suspicious login form' : 'Secure connection'} bad={danger} /><PopupLine icon={danger ? <CircleAlert size={14} /> : <Link2 size={13} />} label={danger ? 'Urgency manipulation' : 'No suspicious links'} bad={danger} caution /></div>
      <button className="scan-again"><ScanSearch size={14} /> {scanning ? 'Analyzing…' : 'Scan again'}</button>
    </div>
    <motion.div className={`protected-badge ${danger ? 'bad' : ''}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>{danger ? <ShieldAlert size={15} /> : <Shield size={15} />} {danger ? 'Threat protection active' : 'Protected by Guardian'}</motion.div>
  </div>
}

function ExtensionPage({ onInstall }) {
  const mode = useSecurityCycle()
  return <section className="product-page extension-page shell">
    <div className="product-page-copy"><span className="section-kicker"><i /> Coding ecosystem protection</span><h1>Your coding workflow&apos;s <span>security layer.</span></h1><p>Guardian analyzes code, dependencies and webpage activity in real time, then gives you a clear answer before you ship.</p><AddToChromeButton onClick={onInstall}>Download Guardian Extension</AddToChromeButton></div>
    <div className="extension-page-visual"><ExtensionScene mode={mode} /></div>
    <div className="how-grid"><div><span className="section-kicker"><i /> How the extension works</span><h2>Quietly working<br /><span>between you and the web.</span></h2></div>{[['01', 'Detect', 'Guardian scans the current webpage.'], ['02', 'Analyze', 'Guardian checks domains, links, forms and suspicious patterns.'], ['03', 'Protect', 'Guardian warns you before you interact with a threat.']].map(([number, title, text]) => <article className="how-step" key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>
}

function FeaturePage() {
  const items = [['01', 'Malicious code detection', 'Detect suspicious or harmful code before execution.', <ShieldAlert size={22} />], ['02', 'Code vulnerability scanner', 'Identify SQL injection, XSS, command injection and unsafe functions.', <ScanSearch size={22} />], ['03', 'AI-generated code detection', 'Flag potentially unsafe AI-generated code before it ships.', <Zap size={22} />], ['04', 'Dependency security', 'Check imported packages and libraries for known vulnerabilities.', <FileWarning size={22} />], ['05', 'Secret and API-key detection', 'Warn when passwords, tokens, credentials or keys appear in code.', <LockKeyhole size={22} />], ['06', 'Real-time security rating', 'Convert security signals into one clear 0-100 score with safer alternatives.', <Radar size={22} />]]
  return <section className="content-page shell"><MotionIntro kicker="Guardian capabilities" title={<>Security that sees<br /><span>beyond the surface.</span></>} copy="Guardian combines intelligent code analysis, dependency intelligence and secure coding guidance to identify threats before they become problems." split /><div className="capability-grid">{items.map(([number, title, text, icon]) => <motion.article className="capability" key={number} whileHover={{ y: -5 }}><small>{number}</small><span>{icon}</span><h2>{title}</h2><p>{text}</p><div className="capability-meter"><i /><b>{number === '06' ? '92 / 100' : 'Monitor active'}</b></div></motion.article>)}</div></section>
}

function HowItWorksPage({ mode }) {
  return <section className="content-page shell"><MotionIntro kicker="The Guardian method" title={<>Protection happens<br /><span>before you ship.</span></>} copy="Six quiet steps turn complex code-security signals into decisions your team can act on." split /><div className="flow-rail">{[['01', 'Detect', 'Guardian monitors code and webpage activity on supported coding platforms.'], ['02', 'Analyze', 'Rule-based checks and AI-assisted analysis evaluate the code.'], ['03', 'Identify', 'Vulnerabilities, secrets, unsafe dependencies and suspicious links are identified.'], ['04', 'Alert', 'You receive a real-time warning with the severity of the threat.'], ['05', 'Protect', 'Guardian suggests a secure alternative or blocks dangerous actions.'], ['06', 'Report', 'Review the complete security report and score in the dashboard.']].map(([number, title, text]) => <motion.article className="flow-step" key={number} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}><b>{number}</b><h2>{title}</h2><p>{text}</p></motion.article>)}</div><div className="flow-result"><ExtensionScene mode={mode} /></div></section>
}

function ProtectionPage() {
  const threats = [['Vulnerable code', 'SQL injection, XSS, command injection and insecure functions.', <ScanSearch size={19} />], ['Exposed secrets', 'Passwords, API keys, tokens and credentials accidentally committed.', <LockKeyhole size={19} />], ['Unsafe AI code', 'Potentially dangerous generated code that needs review.', <Zap size={19} />], ['Vulnerable dependencies', 'Imported libraries with known security issues.', <FileWarning size={19} />], ['Malicious links', 'Suspicious links embedded in coding resources.', <Link2 size={19} />]]
  return <section className="content-page shell"><MotionIntro kicker="Protection surface" title={<>Threats don&apos;t always<br /><span>look dangerous.</span></>} copy="Guardian watches the code, dependencies and browser context around your work." split /><div className="threat-grid">{threats.map(([title, text, icon]) => <motion.article className="threat-card" key={title} whileHover={{ y: -5 }}><span>{icon}</span><div><h2>{title}</h2><p>{text}</p></div><div className="threat-preview"><i /><i /><i /></div></motion.article>)}</div></section>
}

function FeaturePreview() { return <section className="preview-section shell"><MotionIntro kicker="Protection that thinks ahead" title={<>Security for the<br /><span>moments you can&apos;t see.</span></>} /><div className="preview-links"><Link to="/features">Explore all capabilities <ArrowRight size={15} /></Link><Link to="/protection">See what Guardian protects <ArrowRight size={15} /></Link></div></section> }
function HowItWorksPreview() { return <section className="preview-band"><div className="shell preview-band-inner"><div><span className="section-kicker"><i /> How it works</span><h2>Detect. Analyze.<br /><span>Protect.</span></h2></div><Link className="button secondary" to="/how-it-works">See the method <ArrowRight size={15} /></Link></div></section> }
function ExtensionPreview({ mode }) { return <section className="preview-section shell extension-preview"><div><MotionIntro kicker="Browser protection" title={<>Your browser&apos;s<br /><span>security layer.</span></>} copy="Guardian works quietly while you browse." /><Link className="button primary" to="/extension">Explore Extension <ArrowRight size={15} /></Link></div><div className="preview-mockup"><ExtensionScene mode={mode} /></div></section> }
function FinalCta({ onInstall }) { return <section className="final-cta shell"><span className="section-kicker"><i /> Guardian, ready when you are</span><h2>Know before<br /><span>you click.</span></h2><p>Put an intelligent security layer between you and the threats hiding in the web.</p><div><AddToChromeButton onClick={onInstall}>Download Guardian Extension</AddToChromeButton><Link className="button secondary" to="/extension">Explore Extension <ArrowRight size={15} /></Link></div></section> }

function InstallModal({ open, onClose }) {
  const [message, setMessage] = useState('')
  const [guideOpen, setGuideOpen] = useState(false)
  useEffect(() => { if (!open) setMessage('') }, [open])
  if (!open) return null
  const downloadZip = () => {
    fetch('/guardian.zip').then(response => response.blob()).then(blob => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a'); link.href = url; link.download = 'Gradient-Cybersecurity-Extension.zip'; link.click(); URL.revokeObjectURL(url)
      setMessage('Extension ready to install|Your Guardian extension package is ready. Extract the ZIP and load it through Chrome Developer Mode.')
    })
  }
  const [messageTitle, messageBody] = message.split('|')
  return <div className="install-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}><motion.div className="install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }}><button className="modal-close" onClick={onClose} aria-label="Close installation options"><X size={18} /></button><GuardianMark size={32} /><span className="section-kicker"><i /> Secure installation</span><h2 id="install-title">Add Gradient to Chrome</h2><p className="modal-note">Choose the installation method that works best for your browser.</p><div className="install-options"><InstallOption icon={<Download size={20} />} title="Download ZIP" text="Download the complete Gradient extension package for manual installation." action="Download ZIP" onClick={downloadZip} /><InstallOption icon={<Globe2 size={20} />} title="Chrome Web Store" text="Install Gradient directly from the official Chrome Web Store." action="Install from Chrome Web Store" onClick={() => window.open('https://chromewebstore.google.com/', '_blank', 'noopener,noreferrer')} /><InstallOption icon={<ShieldCheck size={20} />} title="Install Extension" text="Follow the installation flow for users who already have the extension package." action="Install Gradient" onClick={() => setMessage('Installation guidance|Chrome does not allow websites to install extensions silently. Use Chrome Web Store or Developer Mode -> Load unpacked.')}/></div>{message && <motion.div className="install-message" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}><Check size={15} /><div><strong>✓ {messageTitle}</strong><br />{messageBody}<br /><button className="guide-button" onClick={() => setGuideOpen(!guideOpen)}>View Installation Guide</button>{guideOpen && <ol><li>Extract the ZIP file.</li><li>Open <code>chrome://extensions</code>.</li><li>Enable Developer mode.</li><li>Select Load unpacked.</li></ol>}</div></motion.div>}</motion.div></div>
}
function InstallOption({ icon, title, text, action, onClick }) { return <article className="install-option"><span className="install-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action}<ArrowRight size={13} /></button></div></article> }

function Portal({ adminRoute = false }) {
  const [account, setAccount] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState('Ready to scan')

  const login = (event) => {
    event.preventDefault()
    const credentials = { 'admin@guardian.dev': ['admin123', 'admin'], 'customer@guardian.dev': ['customer123', 'customer'] }
    const match = credentials[email]
    if (!match || match[0] !== password) { setError('Invalid demo credentials.'); return }
    setAccount(match[1]); setError('')
  }
  const scan = () => {
    setScanning(true); setScanResult('Analyzing file signature...')
    window.setTimeout(() => { setScanning(false); setScanResult('SAFE · invoice.pdf'); }, 1100)
  }

  if (!account) return <section className="portal-auth shell"><div className="auth-panel"><GuardianMark size={38} /><span className="section-kicker"><i /> Guardian Security Portal</span><h1>Security,<br /><span>under control.</span></h1><p>Secure access to your vulnerabilities, threats, scores and protection status across coding platforms.</p><form onSubmit={login}><label>Email<input value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="you@company.com" required /></label><label>Password<input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="••••••••" required /></label>{error && <div className="form-error">{error}</div>}<button className="button primary" type="submit">Sign in <ArrowRight size={16} /></button></form><Link className="back-link" to="/">← Back to Guardian</Link><small className="demo-hint">Admin: admin@guardian.dev / admin123<br />Customer: customer@guardian.dev / customer123</small></div></section>

  if (adminRoute && account !== 'admin') return <section className="portal-auth shell"><div className="auth-panel denied-panel"><span className="denied-code">403</span><span className="section-kicker"><i /> Access control</span><h1>Access<br /><span>denied.</span></h1><p>Your account does not have permission to view this page.</p><Link className="button secondary" to="/portal">Return to portal <ArrowRight size={16} /></Link></div></section>

  if (account === 'admin') return <section className="dashboard shell"><DashboardHeader account={account} onLogout={() => setAccount(null)} /><div className="dashboard-title"><span className="section-kicker"><i /> Admin overview</span><h1>Security activity, <span>at a glance.</span></h1></div><div className="metric-grid"><Metric label="Total scans" value="1,284" /><Metric label="Critical threats" value="12" alert /><Metric label="Exposed secrets" value="27" alert /><Metric label="Vulnerable dependencies" value="46" alert /><Metric label="Protected platforms" value="8" /><Metric label="AI analyses" value="603" /></div><div className="dashboard-panel"><div className="panel-heading"><div><span className="section-kicker"><i /> Recent security activity</span><h2>All scans</h2></div><span className="live-pill"><i /> Live</span></div><div className="scan-table"><div className="table-row table-head"><span>Repository / file</span><span>Account</span><span>Status</span><span>Time</span></div>{[['guardian-api', 'customer@guardian.dev', 'SAFE', '2 min ago'], ['auth-handler.js', 'admin@guardian.dev', 'REJECTED', '18 min ago'], ['package.json', 'customer@guardian.dev', 'REVIEW', '42 min ago']].map(row => <div className="table-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><b className={row[2] === 'SAFE' ? 'safe-text' : 'danger-text'}>{row[2]}</b><span>{row[3]}</span></div>)}</div></div></section>

  return <section className="dashboard shell"><DashboardHeader account={account} onLogout={() => setAccount(null)} /><div className="dashboard-title"><span className="section-kicker"><i /> Customer overview</span><h1>Welcome back, <span>Guardian.</span></h1><p>Your code security layer is active across supported coding platforms.</p></div><div className="customer-grid"><div className="dashboard-panel scan-panel"><div className="panel-heading"><div><span className="section-kicker"><i /> File and code scanner</span><h2>Check before you ship.</h2></div><FileWarning size={20} /></div><button className={`drop-zone ${scanning ? 'is-scanning' : ''}`} onClick={scan}><ScanSearch size={25} /><strong>{scanning ? 'Analyzing code...' : 'Drag & drop file to scan'}</strong><small>JS, TS, PY, JSON up to 25 MB</small></button><div className={`scan-result ${scanResult.startsWith('SAFE') ? 'result-safe' : ''}`}><span><ShieldCheck size={16} /></span>{scanResult}</div></div><div className="dashboard-panel overview-panel"><span className="section-kicker"><i /> Overall security score</span><div className="overview-score"><b>92</b><span>/100</span></div><strong>Protection active</strong><p>8 platforms monitored today</p><div className="signal-line"><span /><span /><span /><span /><span /></div></div></div><div className="dashboard-panel history-panel"><div className="panel-heading"><div><span className="section-kicker"><i /> Scan history</span><h2>Recent security reports</h2></div><span className="muted">View all</span></div>{[['auth-handler.js', 'SAFE', 'Today, 10:42'], ['package-lock.json', 'REJECTED', 'Yesterday, 16:08'], ['config.env', 'REVIEW', 'Yesterday, 12:31']].map(row => <div className="history-row" key={row[0]}><FileWarning size={17} /><span><b>{row[0]}</b><small>{row[2]}</small></span><strong className={row[1] === 'SAFE' ? 'safe-text' : 'danger-text'}>{row[1]}</strong></div>)}</div></section>
}

function DashboardHeader({ account, onLogout }) { return <div className="dashboard-header"><Link className="brand" to="/"><GuardianMark size={25} /><span>Guardian</span></Link><span className="account-chip">{account} account</span><button onClick={onLogout}>Log out</button></div> }
function Metric({ label, value, alert }) { return <div className="metric"><small>{label}</small><b className={alert ? 'danger-text' : ''}>{value}</b><span><i /> Last 30 days</span></div> }

function Dots() { return <span className="dots"><i /><i /><i /></span> }
function Score({ value, danger, scanning }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const start = displayValue
    const difference = value - start
    const startedAt = performance.now()
    let frame
    const animate = (now) => {
      const progress = Math.min((now - startedAt) / 850, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(start + difference * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <div className={`score ${danger ? 'danger' : scanning ? 'scanning' : ''}`} style={{ '--score': `${displayValue * 3.6}deg` }}><div><motion.b key={displayValue} initial={{ opacity: .55 }} animate={{ opacity: 1 }}>{displayValue}</motion.b><small>/100</small></div></div>
}
function PopupLine({ icon, label, bad, caution }) { return <div className={`popup-line ${bad ? (caution ? 'caution' : 'bad') : ''}`}><span>{icon}</span><p>{label}</p><Check size={12} /></div> }

function TrustStrip() { return <motion.div className="trust shell" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}><span className="trust-label">Intelligent security, quietly working</span><span><Radar size={16} /> Real-time detection</span><span><Globe2 size={16} /> Phishing protection</span><span><MousePointer2 size={16} /> Pattern recognition</span><span><FileWarning size={16} /> File scanning</span></motion.div> }

function ProductShowcase() {
  return <section className="product shell" id="protection">
    <MotionIntro kicker="Guardian in action" title={<>A page can look familiar.<br /><span>Guardian sees the difference.</span></>} copy="Every visit is checked against the quiet signals fraudsters hope you’ll miss: domain details, login behaviour, links, and pressure tactics." split />
    <motion.div className="protection-stage" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }}>
      <div className="stage-grid" /><div className="stage-haze red" /><div className="stage-haze blue" />
      <div className="scam-browser"><div className="scam-bar"><Dots /><div><TriangleAlert size={12} /> http://paypa1-secure-center.com</div><span><GuardianMark size={18} /><b>3</b></span></div><div className="scam-page"><header><strong>paypa<span>1</span></strong><small>Sign in &nbsp; Help</small></header><form><div className="timer"><TimerReset size={12} /> Your account will be limited in <b>02:15</b></div><h3>Verify your account</h3><p>We noticed unusual activity. Please sign in to continue.</p><label>Email address</label><i /><label>Password</label><i /><button>Verify account <ArrowRight size={13} /></button><small>Forgot password? &nbsp;·&nbsp; Security centre</small></form></div></div>
      <motion.div className="threat-panel" animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}><div className="threat-top"><span><GuardianMark size={20} /> Guardian</span><small><i /> Live warning</small></div><div className="threat-score"><div><small>Security rating</small><b>28<span>/100</span></b></div><p><ShieldAlert size={18} /> Danger</p></div><div className="threat-total"><b>3</b><p><strong>Threats detected</strong><small>Review before continuing</small></p></div><Threat icon={<Globe2 size={14} />} title="Look-alike domain" detail="paypa1-secure-center.com" /><Threat icon={<LockKeyhole size={14} />} title="Login form on HTTP" detail="Credentials could be exposed" /><Threat icon={<Clock3 size={14} />} title="Urgency manipulation" detail="Fake 02:15 countdown" yellow /><button><Shield size={14} /> Leave this site</button></motion.div>
      <span className="scan-label domain">domain <i /></span><span className="scan-label form">form <i /></span><span className="scan-label timer-label">timer <i /></span>
    </motion.div>
    <p className="stage-caption"><ShieldAlert size={15} /> Guardian warns you before you interact with a suspicious page.</p>
  </section>
}

function MotionIntro({ kicker, title, copy, split = false }) { return <motion.div className={`section-intro ${split ? 'split' : ''}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .65, ease: 'easeOut' }}><div><span className="section-kicker"><i /> {kicker}</span><h2>{title}</h2></div>{copy && <p>{copy}</p>}</motion.div> }
function Threat({ icon, title, detail, yellow }) { return <div className={`threat ${yellow ? 'yellow' : ''}`}><span>{icon}</span><p><b>{title}</b><small>{detail}</small></p><CircleAlert size={14} /></div> }

function Features() {
  const items = [
    { no: '01', icon: <Radar size={21} />, title: 'Real-time phishing detection', text: 'Detect suspicious websites, spoofed domains and malicious links while you browse.', visual: <div className="radar-art"><i /><i /><i /><span><Radar size={18} /></span><b>Scanning</b></div> },
    { no: '02', icon: <MousePointer2 size={21} />, title: 'Dark-pattern detection', text: 'Identify fake countdowns, urgency tactics and manipulative website patterns.', visual: <div className="timer-art"><div><TimerReset size={17} /><span>Offer expires in</span><b>02:15</b></div><i /><em>Urgency detected</em></div> },
    { no: '03', icon: <FileWarning size={21} />, title: 'Malicious file scanner', text: 'Scan suspicious files before they reach your system.', visual: <div className="file-art"><div><FileWarning size={25} /><span>invoice.png</span><small>Actual type: executable</small></div><b><X size={13} /> Rejected</b></div> },
  ]
  return <section className="features shell" id="features"><MotionIntro kicker="Protection that thinks ahead" title={<>Security for the<br /><span>moments you can&apos;t see.</span></>} /> <div className="feature-grid">{items.map((item, index) => <motion.article className="feature-card" key={item.no} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: index * .1 }}><div className="feature-top"><small>{item.no}</small><span>{item.icon}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="feature-art">{item.visual}</div><a href="#protection">Explore protection <ArrowRight size={14} /></a></motion.article>)}</div><div id="how-it-works" className="continuation"><i /> Guardian is just getting started</div></section>
}

export default App
