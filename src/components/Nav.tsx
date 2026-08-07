import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand } from "../data/products";

const links = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/urunler", label: "Ürünler" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = !onHome || scrolled || open;

  return (
    <>
      <header className={`nav ${solid ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <img src={brand.logo} alt={brand.name} className="nav__logo" width={140} height={40} />
            <span className="nav__name">{brand.name}</span>
          </Link>

          <nav className="nav__desktop" aria-label="Ana menü">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={"end" in l ? l.end : undefined}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/urunler" className="btn btn--solid nav__cta">
              Ürünleri Keşfet
            </Link>
          </nav>

          <button
            type="button"
            className={`nav__burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Drawer is OUTSIDE header — backdrop-filter on .nav breaks position:fixed children on iOS */}
      <div
        id="mobile-drawer"
        className={`nav-drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="nav-drawer__panel" aria-label="Mobil menü">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={"end" in l ? l.end : undefined}
              className="nav-drawer__link"
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/urunler"
            className="btn btn--solid nav-drawer__cta"
            onClick={() => setOpen(false)}
          >
            Ürünleri Keşfet
          </Link>
          <a href="tel:+905513658489" className="nav-drawer__phone">
            +90 551 365 84 89
          </a>
        </nav>
      </div>
    </>
  );
}
