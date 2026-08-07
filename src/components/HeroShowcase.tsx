import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../data/products";

type Props = {
  slides: string[];
};

export function HeroShowcase({ slides }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [slides]);

  return (
    <section className="hero-pro">
      <div className="hero-pro__bg" aria-hidden>
        <div className="hero-pro__orb hero-pro__orb--a" />
        <div className="hero-pro__orb hero-pro__orb--b" />
        <div className="hero-pro__grain" />
      </div>

      <div className="hero-pro__grid">
        <div className="hero-pro__copy">
          <img src={brand.logo} alt={brand.name} className="hero-pro__logo anim-rise" />
          <h1 className="hero-pro__brand anim-rise anim-delay-1">{brand.name}</h1>
          <p className="hero-pro__title anim-rise anim-delay-2">
            Sağlığınız için
            <em> net, orijinal</em> çözümler
          </p>
          <p className="hero-pro__sub anim-rise anim-delay-3">
            Uzman eczacı formülleriyle vitamin ve takviye ürünlerini keşfedin.
          </p>
          <div className="hero-pro__actions anim-rise anim-delay-3">
            <Link to="/urunler" className="btn btn--solid">
              Ürünleri Keşfet
            </Link>
            <Link to="/iletisim" className="btn btn--ghost">
              İhracat & İletişim
            </Link>
          </div>
        </div>

        <div className="hero-pro__stage" aria-hidden>
          <div className="hero-pro__ring" />
          {slides.map((src, i) => (
            <div key={src} className={`hero-pro__slide ${i === index ? "is-active" : ""}`}>
              <div className="packshot packshot--hero">
                <div className="packshot__bloom" />
                <img src={src} alt="" className="packshot__img" />
                <div className="packshot__fade" />
                <div className="packshot__reflect" />
              </div>
            </div>
          ))}
          <div className="hero-pro__dots">
            {slides.map((_, i) => (
              <span key={i} className={i === index ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
