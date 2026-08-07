import { Link } from "react-router-dom";
import { brand, categories, heroSlides, products } from "../data/products";
import { Reveal } from "../components/Reveal";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { BannerSlideshow } from "../components/BannerSlideshow";
import { PhotoBanner } from "../components/PhotoBanner";

const featured = products.slice(0, 6);
const storySlides = heroSlides.slice(0, 5);
const exportSlides = [...heroSlides].reverse().slice(0, 6);

export function Home() {
  return (
    <>
      <section className="hero">
        <HeroSlideshow slides={heroSlides} />
        <div className="hero__content">
          <img src={brand.logo} alt={brand.name} className="hero__logo anim-rise" />
          <h1 className="hero__brand anim-rise anim-delay-1">{brand.name}</h1>
          <p className="hero__title anim-rise anim-delay-2">
            Sağlığınız için
            <em> net, orijinal</em> çözümler
          </p>
          <p className="hero__sub anim-rise anim-delay-3">
            Uzman eczacı formülleriyle vitamin ve takviye ürünlerini keşfedin.
          </p>
          <div className="hero__actions anim-rise anim-delay-3">
            <Link to="/urunler" className="btn btn--solid">
              Ürünleri Keşfet
            </Link>
            <Link to="/iletisim" className="btn btn--ghost">
              İhracat & İletişim
            </Link>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden>
          <span />
        </div>
      </section>

      <section className="ticker" aria-hidden>
        <div className="ticker__track">
          {[...products, ...products].map((p, i) => (
            <span key={`${p.slug}-${i}`}>{p.name}</span>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Kategoriler</p>
            <h2 className="section-title">İhtiyacınıza göre seçin</h2>
          </Reveal>
          <div className="cat-grid">
            {categories.map((c, i) => (
              <Reveal key={c} delay={i * 50}>
                <Link to={`/urunler?k=${encodeURIComponent(c)}`} className="cat-card">
                  <span>{c}</span>
                  <em>İncele →</em>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container band">
          <Reveal>
            <p className="eyebrow">Koleksiyon</p>
            <h2 className="section-title">Öne çıkan formüller</h2>
            <p className="section-sub">
              Anne-bebekten üreme sağlığına, her ürün tek bir ihtiyaca odaklanır.
            </p>
          </Reveal>
          <div className="product-rail">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link to={`/urun/${p.slug}`} className="product-tile">
                  <div className="product-tile__media">
                    <PhotoBanner src={p.image} motion="float" darken="none" />
                  </div>
                  <div className="product-tile__body">
                    <span className="product-tile__cat">{p.category}</span>
                    <strong>{p.name}</strong>
                    <p>{p.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="center-cta">
              <Link to="/urunler" className="btn btn--line">
                Tüm ürünleri gör
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="split">
        <div className="split__media">
          <BannerSlideshow
            slides={storySlides}
            intervalMs={3800}
            mode="stage"
            veil="soft"
            showDots={false}
          />
        </div>
        <div className="split__copy">
          <Reveal>
            <img src={brand.logo} alt="" className="inline-logo" />
            <p className="eyebrow">Neden Sivis</p>
            <h2 className="section-title">Klinik netlik, günlük kullanım kolaylığı</h2>
            <p className="section-sub">
              Her formül, dozajı ve kullanım şekli açıkça tanımlanmış bir amaç etrafında
              şekillenir. Orijinal ürün, uzman destek ve ihracata açık portföy.
            </p>
            <ul className="checklist">
              <li>Lisanslı / orijinal ürün hattı</li>
              <li>Uzman eczacı danışmanlığı</li>
              <li>Uluslararası dağıtım görüşmeleri</li>
            </ul>
            <Link to="/iletisim" className="btn btn--solid">
              Bizimle iletişime geçin
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          <Reveal>
            <div className="stats__item">
              <strong>{products.length}+</strong>
              <span>Formül</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="stats__item">
              <strong>{categories.length}</strong>
              <span>Kategori</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="stats__item">
              <strong>TR</strong>
              <span>Üretim & dağıtım</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-photo">
        <BannerSlideshow
          slides={exportSlides}
          intervalMs={4000}
          mode="stage"
          veil="strong"
          showDots
        />
        <div className="cta-photo__content">
          <Reveal>
            <h2 className="section-title">Ürünlerimizi ülkenizde dağıtmak ister misiniz?</h2>
            <p className="section-sub">
              İhracat ekibimizle doğrudan görüşün — size uygun iş birliği modelini birlikte
              kuralım.
            </p>
            <a href="mailto:turkuazessen@sivispharma.com" className="btn btn--solid btn--light">
              İhracat talebi gönder
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
