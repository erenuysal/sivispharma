import { Link } from "react-router-dom";
import { brand } from "../data/products";

const SEPERRA = {
  name: "Seperra Software",
  url: "https://seperrasoftware.com/",
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <img src={brand.logo} alt="" className="footer__logo" />
          <p className="footer__brand">{brand.name}</p>
          <p className="footer__lead">
            Orijinal vitamin ve sağlık ürünleri. Uzman eczacı desteğiyle her adımda yanınızda.
          </p>
        </div>
        <div>
          <p className="footer__label">Keşfet</p>
          <Link to="/urunler">Ürünler</Link>
          <Link to="/iletisim">İletişim</Link>
          <Link to="/urunler?k=Anne+%26+Bebek">Anne & Bebek</Link>
        </div>
        <div>
          <p className="footer__label">İletişim</p>
          <a href="mailto:info@sivispharma.com">info@sivispharma.com</a>
          <a href="tel:+905513658489">+90 551 365 84 89</a>
          <p>Turkuaz Essen</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Sivis Pharma</p>
        <p className="footer__credit">
          Bu site{" "}
          <a href={SEPERRA.url} target="_blank" rel="noopener noreferrer">
            {SEPERRA.name}
          </a>{" "}
          tarafından yapılmıştır.
        </p>
      </div>
    </footer>
  );
}
