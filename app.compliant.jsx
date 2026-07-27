/* Van Beirs website — COMPLIANT build app shell (hash routing). */
const { useState, useEffect, useCallback } = React;

const PAGES = { home:'Home', about:'About', history:'History', ir:'InvestorRelations', investments:'Investments', login:'Login', privacy:'Privacy', terms:'Terms' };
const ALLOWED_LANGS = ['en','nl','fr'];

function pageFromHash() {
  const h = (location.hash || '').replace(/^#\/?/, '');
  return PAGES[h] ? h : 'home';
}

function App() {
  const stored = localStorage.getItem('vb_lang');
  const [lang, setLang] = useState(() => ALLOWED_LANGS.indexOf(stored) > -1 ? stored : 'en');
  const [page, setPage] = useState(pageFromHash);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [scrolledDark, setScrolledDark] = useState(true);
  const [cookieOpen, setCookieOpen] = useState(() => !localStorage.getItem('vb_cookie'));

  const t = Object.assign({},
    window.I18N[lang] || window.I18N.en,
    (window.CONTENT && (window.CONTENT[lang] || window.CONTENT.en)) || {},
    (window.COMPLIANT && (window.COMPLIANT[lang] || window.COMPLIANT.en)) || {});
  const dark = (page === 'home' && scrolledDark) || burgerOpen;

  useEffect(() => {
    const onHash = () => { setPage(pageFromHash()); setBurgerOpen(false); window.scrollTo(0,0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolledDark(window.scrollY < window.innerHeight - 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [page]);

  useEffect(() => { document.body.style.overflow = burgerOpen ? 'hidden' : ''; }, [burgerOpen]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const chooseLang = useCallback((code) => { setLang(code); localStorage.setItem('vb_lang', code); }, []);
  const chooseCookie = useCallback((val) => { localStorage.setItem('vb_cookie', JSON.stringify(val)); setCookieOpen(false); }, []);
  const go = useCallback((p) => {
    setBurgerOpen(false);
    if (p === 'home') { history.pushState(null,'',location.pathname); setPage('home'); }
    else { location.hash = p; setPage(p); }
    window.scrollTo(0, 0);
  }, []);

  let body;
  switch (page) {
    case 'about':        body = <About t={t} />; break;
    case 'history':      body = <History t={t} />; break;
    case 'ir':           body = <InvestorRelations t={t} />; break;
    case 'investments':  body = <Investments t={t} />; break;
    case 'login':        body = <Login t={t} />; break;
    case 'privacy':      body = <Privacy t={t} />; break;
    case 'terms':        body = <Terms t={t} />; break;
    default:             body = null;
  }

  return (
    <React.Fragment>
      <Header t={t} lang={lang} dark={dark} burgerOpen={burgerOpen}
        onBurger={()=>setBurgerOpen(o=>!o)} onHome={()=>go('home')} />
      <Overlay open={burgerOpen} t={t} lang={lang} page={page} onNav={go} onSetLang={chooseLang} />
      {page === 'home'
        ? <main><Home t={t} onNav={go} /></main>
        : <main className="page">{body}</main>}
      <Footer t={t} lang={lang} onNav={go} onSetLang={chooseLang} onCookies={()=>setCookieOpen(true)} />
      <CookieBanner open={cookieOpen} t={t} onChoose={chooseCookie} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
