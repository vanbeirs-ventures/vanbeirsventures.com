/* Van Beirs public website — COMPLIANT build components (exported to window).
   Differences vs. the original build are structural, not cosmetic:
   · no reserved-activity self-description (no "investment management / financial products company")
   · no instrument terms, coupons, target returns, multiples or exit values anywhere public
   · no unearned regulatory claims (Euronext / FSMA / MiCA / AIFM / SICAV-RAIF)
   · on-page regulatory-status + no-offer disclosure, not buried in a legal modal
   · en / nl / fr only; no unlicensed hero image */
const { useState } = React;

/* ci = index into the localised portfolio copy in content.js */
const WEB_PORTFOLIO = [
  { ci:0, nm:'Belinus', logo:'assets/logos/belinus.png', md:true, sc:'Energy Innovations', c:'var(--finance-ink)' },
  { ci:1, nm:'Charles Fontana', logo:'assets/logos/charles-fontana.png', lg2:true, sc:'Haute Joaillerie', c:'var(--ventures-ink)' },
  { ci:2, nm:'MINERVA Luxury Motors', logo:'assets/logos/minerva-luxury-motors.png', tall:true, sm:true, sc:'Ultra-Luxury Automotive', c:'var(--ventures-ink)' },
  { ci:3, nm:'NOUARD', logo:'assets/logos/nouard.png', sm:true, sc:'Luxury Gifting', c:'var(--finance-ink)' },
  { ci:4, nm:'Campo', sc:'Field-to-Fork', c:'var(--finance-ink)' },
  { ci:5, nm:'EBURIX', sc:'Defence · Autonomous Systems', c:'var(--realestate-ink)' },
  { ci:6, nm:'Clavoris', logo:'assets/logos/clavoris.png', square:true, sm:true, sc:'Distributed Ledger Technology', c:'var(--finance-ink)' },
  { ci:9, nm:'BelinusAI', logo:'assets/logos/belinus-ai.png', sm:true, sc:'Energy Management', c:'var(--finance-ink)' },
  { ci:10, nm:'Telepath', logo:'assets/logos/telepath.png', md:true, sc:'Application Framework · AI · IoT', c:'var(--finance-ink)' },
  { ci:16, nm:'Memorable', mark:'assets/logos/memorable.png', sc:'Wine', c:'var(--ventures-ink)' },
  { ci:15, nm:'FARALAES', logo:'assets/logos/faralaes.png', tall:true, sm:true, sc:'Olive Oil', c:'var(--ventures-ink)' },
  { ci:13, nm:'rhythm', logo:'assets/logos/rhythm.png', md:true, sc:'Mobility Platform', c:'var(--finance-ink)' },
  { ci:14, nm:'technoconstrukt', logo:'assets/logos/technoconstrukt.png', sm:true, sc:'Construction', c:'var(--realestate-ink)' },
  { ci:12, nm:'Like Watering Cans', logo:'assets/logos/like-watering-cans.png', tall:true, sm:true, sc:'Marketing Intelligence', c:'var(--ventures-ink)' },
  { ci:11, nm:'Gracia Sistemas', logo:'assets/logos/gracia-sistemas.png', sc:'Wine & Spirits Technology', c:'var(--ventures-ink)' },
  { ci:8, nm:'Van Beirs Real Estate', vbLockup:'REAL ESTATE', sc:'Prime RE · Branded Residences', c:'var(--realestate-ink)' },
];
const NAV = ['about','history','ir','investments','login'];
const langs = () => window.LANGS_C && window.LANGS_C.length ? window.LANGS_C : window.LANGS;

function VBMark({ size=30, color, className }) {
  return (
    <svg className={className} viewBox="0 0 120 120" width={size} height={size} fill="none"
         style={color ? { color } : undefined} aria-hidden="true">
      <polygon points="60,10 110,60 60,110 10,60" stroke="currentColor" strokeWidth="2.2" fill="none"/>
      <polygon points="60,34 86,60 60,86 34,60" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <polygon points="60,2 68,10 60,18 52,10" fill="currentColor"/>
      <polygon points="110,52 118,60 110,68 102,60" fill="currentColor"/>
      <polygon points="60,102 68,110 60,118 52,110" fill="currentColor"/>
      <polygon points="10,52 18,60 10,68 2,60" fill="currentColor"/>
      <text x="60" y="61" textAnchor="middle" dominantBaseline="central"
            fontFamily="var(--font-display)" fontWeight="800" fontSize="30" letterSpacing="1" fill="currentColor">VB</text>
    </svg>
  );
}

function SecHead({ eyebrow, title }) {
  return <div className="sec-head"><div className="eyebrow">{eyebrow}</div><h2 className="sec-title">{title}</h2></div>;
}

function Header({ t, lang, dark, burgerOpen, onBurger, onHome }) {
  return (
    <header className={'hd' + (dark ? ' on-dark' : '')}>
      <div className="hd-in">
        <div className="brand" onClick={onHome}>
          <VBMark size={30} color={dark ? '#ffffff' : '#0A0A0A'} className="brand-mark"/>
          <span className="bm"><span className="w">VAN BEIRS</span><span className="d">VENTURES</span></span>
        </div>
        <div className="hd-right">
          <button className={'burger'+(burgerOpen?' open':'')} onClick={onBurger} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Overlay({ open, t, lang, page, onNav, onSetLang }) {
  return (
    <div className={'ov'+(open?' open':'')}>
      <div className="ov-mark"><VBMark size={520} color="#ffffff"/></div>
      <div className="ov-tag">{t.menuTag}</div>
      <nav className="ov-nav">
        {NAV.map((id,i)=>(
          <button key={id} className={'ov-item'+(id==='login'?' login':'')+(page===id?' here':'')} onClick={()=>onNav(id)}>
            <span className="idx">0{i+1}</span>{t[id]}
          </button>
        ))}
      </nav>
      <div className="ov-langs">
        <span className="ov-langs-label">{t.langLabel}</span>
        {langs().map(l=>(
          <button key={l.code} className={'ov-lang'+(l.code===lang?' on':'')} onClick={()=>onSetLang(l.code)}>{l.label}</button>
        ))}
      </div>
    </div>
  );
}

/* Ink hero panel — replaces the watermarked stock comp (licence risk) with the
   one "mood" treatment the design system permits. */
function Hero({ t, onNav }) {
  return (
    <section className="hero" id="top">
      <div className="hero-panel"></div>
      <div className="wrap">
        <div className="eyebrow">{t.heroEyebrow}</div>
        <h1>{t.heroTitle} <em>{t.heroAccent}</em></h1>
        <p>{t.heroBody}</p>
      </div>
    </section>
  );
}

/* Non-performance facts only — no portfolio target, no target IRR. */
function GroupStats({ t }) {
  const rows = [['16',t.stat_holdings],['3',t.stat_sectors],['3',t.stat_offices],['1840',t.stat_since]];
  return (
    <div className="stats">
      {rows.map(([f,l])=>(<div className="stat" key={l}><div className="f">{f}</div><div className="l">{l}</div></div>))}
    </div>
  );
}

function Home({ t, onNav }) {
  return (
    <React.Fragment>
      <Hero t={t} onNav={onNav} />
      <section className="sec home-intro">
        <div className="wrap">
          <p className="home-lead">{t.heroTitle} <em>{t.heroAccent}</em></p>
          <GroupStats t={t} />
        </div>
      </section>
    </React.Fragment>
  );
}

function CookieBanner({ open, t, onChoose }) {
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState({ necessary:true, analytics:false, functional:false, marketing:false });
  if (!open) return null;
  const toggle = k => setPrefs(p => ({ ...p, [k]:!p[k] }));
  const cats = [
    { k:'necessary', label:t.cookieNecessary, fixed:true },
    { k:'analytics', label:t.cookieAnalytics },
    { k:'functional', label:t.cookieFunctional },
    { k:'marketing', label:t.cookieMarketing },
  ];
  return (
    <div className="cookie" role="dialog" aria-label={t.cookieTitle}>
      <div className="cookie-in">
        <div className="cookie-txt">
          <div className="cookie-h">{t.cookieTitle}</div>
          <p>{t.cookieBody}</p>
          {showPrefs && (
            <div className="cookie-cats">
              {cats.map(c => (
                <label key={c.k} className={'cookie-cat'+(c.fixed?' fixed':'')}>
                  <span className="cc-name">{c.label}</span>
                  {c.fixed ? <span className="cc-on">{t.cookieOn}</span>
                           : <input type="checkbox" checked={prefs[c.k]} onChange={()=>toggle(c.k)} />}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="cookie-btns">
          {!showPrefs && <button className="btn ghostdark sm" onClick={()=>setShowPrefs(true)}>{t.cookiePrefs}</button>}
          <button className="btn ghostdark sm" onClick={()=>onChoose({ necessary:true, analytics:false, functional:false, marketing:false })}>{t.cookieReject}</button>
          {showPrefs
            ? <button className="btn sm" onClick={()=>onChoose(prefs)}>{t.cookieSave}</button>
            : <button className="btn sm" onClick={()=>onChoose({ necessary:true, analytics:true, functional:true, marketing:true })}>{t.cookieAccept}</button>}
        </div>
      </div>
    </div>
  );
}

function LegalPage({ t, title, sections }) {
  return (
    <section className="sec">
      <div className="wrap legal">
        <SecHead eyebrow={t.legal_eyebrow} title={title} />
        {sections.map((s,i)=>(<React.Fragment key={i}><h3>{s.h}</h3><p>{s.p}</p></React.Fragment>))}
        <div className="legal-entity">
          {t.legal_entityLine}<br/>
          {t.legal_dp} <a href="mailto:legal@vanbeirsventures.com">legal@vanbeirsventures.com</a>
        </div>
        <p className="legal-note">{t.legal_updated}</p>
      </div>
    </section>
  );
}
function Privacy({ t }) { return <LegalPage t={t} title={t.privacyTitle} sections={t.privacySections} />; }
function Terms({ t })   { return <LegalPage t={t} title={t.termsTitle}   sections={t.termsSections} />; }

function About({ t }) {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SecHead eyebrow={t.e_about} title={t.t_about} />
        <div className="about-grid">
          <div>
            <p>{t.about_p1}</p>
            <p>{t.about_p2}</p>
            <p className="mandate">{t.about_mandate}</p>
          </div>
          <GroupStats t={t} />
        </div>
      </div>
    </section>
  );
}

function History({ t }) {
  const over = t.hist_over || {};
  const items = (t.histItems || []).concat(t.hist_add || [])
    .map(r => Object.assign({}, r, over[r.y] || {}))
    .sort((a,b) => a.y.localeCompare(b.y));
  return (
    <section className="sec alt" id="history">
      <div className="wrap">
        <SecHead eyebrow={t.e_history} title={t.t_history} />
        <div className="tl">
          {items.map(r=>(
            <div className="tl-row" key={r.y}>
              <div className="tl-year">{r.y}</div>
              <div><h3 className="tl-h">{r.h}</h3><p className="tl-d">{r.d}</p></div>
            </div>
          ))}
        </div>
        <p className="note">{t.history_note}</p>
      </div>
    </section>
  );
}

/* Replaces the public "Instruments" product page. No terms, no figures. */
function InvestorRelations({ t }) {
  return (
    <section className="sec" id="ir">
      <div className="wrap">
        <SecHead eyebrow={t.e_ir} title={t.t_ir} />
        <div className="ir-grid">
          <div>
            <p className="ir-lead">{t.ir_lead}</p>
            <p className="ir-body">{t.ir_p1}</p>
            <p className="ir-body">{t.ir_p2}</p>
          </div>
          <div>
            <div className="eyebrow" style={{marginBottom:14}}>{t.ir_steps}</div>
            <div className="steps">
              {(t.irSteps||[]).map((s,i)=>(
                <div className="step" key={i}>
                  <div className="n">{'0'+(i+1)}</div>
                  <div><h4>{s.h}</h4><p>{s.p}</p></div>
                </div>
              ))}
            </div>
            <div className="ir-contact">{t.ir_contact_pre}<a href="mailto:ir@vanbeirsventures.com">ir@vanbeirsventures.com</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Corporate portfolio information only — no first investment, no exit value. */
function Investments({ t }) {
  return (
    <section className="sec alt" id="investments">
      <div className="wrap">
        <SecHead eyebrow={t.e_investments} title={t.t_investments} />
        <div className="pgrid">
          {WEB_PORTFOLIO.map((p)=>{
            const base = (t.portfolio && t.portfolio[p.ci]) || {};
            const over = (t.portfolio_over && t.portfolio_over[p.ci]) || {};
            return (
              <div className="pcell" key={p.nm}>
                <div className="phead">
                  {p.vbLockup
                    ? <div className="vblock"><img className="vbmk" src="assets/vb-emblem-black.png" alt="" /><div className="vbtx"><div className="vbw">VAN BEIRS</div><div className="vbd">{p.vbLockup}</div></div></div>
                    : p.logo
                    ? <img className={'lg'+(p.tall?' tall':'')+(p.square?' square':'')+(p.sm?' sm':'')+(p.md?' md':'')+(p.lg2?' lg2':'')} src={p.logo} alt={p.nm} />
                    : p.mark
                      ? <div className="lgrow"><img className="mk" src={p.mark} alt="" /><div className="nm">{p.nm}</div></div>
                      : <div className="nm">{p.nm}</div>}
                </div>
                <div className="sc" style={{color:p.c}}>{over.sc || base.sc || p.sc}</div>
                <div className="ds">{over.desc || base.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Login({ t }) {
  const [sent,setSent]=useState(false);
  return (
    <section className="sec" id="login">
      <div className="wrap">
        <div className="login-wrap">
          <div className="login-card">
            {!sent ? (
              <React.Fragment>
                <div className="eyebrow" style={{marginBottom:14}}>{t.login}</div>
                <h2>{t.loginTitle}</h2>
                <p className="sub">{t.loginBody}</p>
                <div className="field"><label>{t.email}</label><input type="email" placeholder={t.login_email_ph}/></div>
                <div className="field"><label>{t.password}</label><input type="password" placeholder="••••••••"/></div>
                <button className="btn" style={{width:'100%',marginTop:6}} onClick={()=>setSent(true)}>{t.submit}</button>
              </React.Fragment>
            ) : (
              <div style={{textAlign:'center',padding:'12px 0'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:40,color:'var(--positive)'}}>✓</div>
                <h2 style={{marginTop:12}}>{t.loginTitle}</h2>
                <p className="sub" style={{marginTop:10}}>{t.loginBody}</p>
                <button className="btn ghostdark" style={{width:'100%'}} onClick={()=>setSent(false)}>{t.cancel}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t, lang, onNav, onSetLang, onCookies }) {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div>
            <div className="w">VAN BEIRS</div><div className="d">VENTURES</div>
            <p>{t.menuTag}<br/>St Thomasstraat 9, bus 301<br/>2018 Antwerp, Belgium<br/>info@vanbeirsventures.com</p>
            <a className="ft-social" href="https://www.linkedin.com/company/vanbeirsventures" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
          </div>
          <nav className="ft-nav">
            {NAV.map(id=>(<button key={id} onClick={()=>onNav(id)}>{t[id]}</button>))}
          </nav>
        </div>
        <div className="ft-status">
          <p>{t.reg_body} {t.ft_juris}</p>
          <p className="id">{t.ft_entity}</p>
        </div>
        <div className="ft-langs">
          <span className="ft-langs-label">{t.langLabel}</span>
          {langs().map(l=>(
            <button key={l.code} className={'ft-lang'+(l.code===lang?' on':'')} onClick={()=>onSetLang(l.code)}>{l.label}</button>
          ))}
        </div>
        <div className="ft-bar">
          <div>© 2026 Van Beirs Holding B.V.</div>
          <nav className="ft-legal">
            <button onClick={()=>onNav('privacy')}>{t.privacy}</button>
            <button onClick={onCookies}>{t.cookies}</button>
            <button onClick={()=>onNav('terms')}>{t.terms}</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Overlay, Hero, Home, About, History, InvestorRelations, Investments, Login, Footer, CookieBanner, Privacy, Terms, NAV });
