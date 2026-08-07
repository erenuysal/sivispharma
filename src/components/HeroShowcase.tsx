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
    <section className="hero-clean">
      <div className="hero-clean__inner">
        <div className="hero-clean__copy">
          <p className="eyebrow eyebrow--on-dark anim-rise">Orijinal formüller</p>
          <h1 className="hero-clean__brand anim-rise anim-delay-1">{brand.name}</h1>
          <p className="hero-clean__title anim-rise anim-delay-2">
            Sağlığınız için
            <em> net, orijinal</em> çözümler
          </p>
          <p className="hero-clean__sub anim-rise anim-delay-3">
            Uzman eczacı formülleriyle vitamin ve takviye ürünlerini keşfedin.
          </p>
          <div className="hero-clean__actions anim-rise anim-delay-3">
            <Link to="/urunler" className="btn btn--solid">
              Ürünleri Keşfet
            </Link>
            <Link to="/iletisim" className="btn btn--ghost">
              İhracat & İletişim
            </Link>
          </div>
        </div>

        <div className="hero-clean__visual">
          <div className="hero-clean__tray">
            {slides.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`hero-clean__product ${i === index ? "is-active" : ""}`}
              />
            ))}
          </div>
          <div className="hero-clean__dots" aria-hidden>
            {slides.map((_, i) => (
              <span key={i} className={i === index ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
