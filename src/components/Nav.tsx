import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { brand } from "../data/products";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <img src={brand.logo} alt="" className="nav__logo" width={36} height={36} />
          <span className="nav__name">{brand.name}</span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Ana menü">
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Ana Sayfa
          </NavLink>
          <NavLink to="/urunler" onClick={() => setOpen(false)}>
            Ürünler
          </NavLink>
          <NavLink to="/iletisim" onClick={() => setOpen(false)}>
            İletişim
          </NavLink>
          <Link to="/urunler" className="btn btn--solid nav__cta" onClick={() => setOpen(false)}>
            Ürünleri Keşfet
          </Link>
        </nav>

        <button
          type="button"
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
