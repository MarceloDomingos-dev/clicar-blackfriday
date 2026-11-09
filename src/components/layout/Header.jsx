import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo.jsx';
import { TrialButton } from '../ui/TrialButton.jsx';
import { LoginButton } from '../ui/LoginButton.jsx';
import { PromoBar } from '../promo/PromoBar.jsx';

const NAV = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#por-dentro', label: 'Por dentro' },
  { href: '#planos', label: 'Ofertas' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header id="topo" className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <PromoBar />
      <div className="container site-header__inner">
        <Logo />
        <nav className="site-nav" aria-label="Principal">
          <ul id="menu-principal" className={`site-nav__list${open ? ' is-open' : ''}`}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="site-nav__link" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="site-nav__cta-mobile">
              <TrialButton block onClick={() => setOpen(false)} />
            </li>
          </ul>
        </nav>
        <div className="site-header__actions">
          <LoginButton />
          <TrialButton className="site-header__cta" />
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn site-header__toggle"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          </button>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
