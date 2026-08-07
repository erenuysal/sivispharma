import { Link, Navigate, useParams } from "react-router-dom";
import { brand, getProduct, products } from "../data/products";
import { Reveal } from "../components/Reveal";
import { PhotoBanner } from "../components/PhotoBanner";

export function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  if (!product) return <Navigate to="/urunler" replace />;

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="profile-page">
      <div className="container">
        <nav className="profile-crumb anim-rise" aria-label="Breadcrumb">
          <Link to="/">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/urunler">Ürünler</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <section className="profile">
          <Reveal className="profile__visual">
            <div className="profile__shot">
              <img src={product.image} alt={product.name} className="profile__img" />
            </div>
          </Reveal>

          <Reveal delay={80} className="profile__info">
            <span className="profile__cat">{product.category}</span>
            <h1 className="profile__name">{product.name}</h1>
            <p className="profile__tagline">{product.tagline}</p>
            <p className="profile__summary">{product.summary}</p>

            <ul className="profile__highlights">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <dl className="profile__specs">
              <div>
                <dt>Form</dt>
                <dd>{product.form}</dd>
              </div>
              <div>
                <dt>Dozaj</dt>
                <dd>{product.dose}</dd>
              </div>
              <div>
                <dt>Marka</dt>
                <dd>{brand.name}</dd>
              </div>
            </dl>

            <div className="profile__actions">
              <a
                href={`mailto:info@sivispharma.com?subject=${encodeURIComponent(
                  `Ürün bilgisi — ${product.name}`,
                )}`}
                className="btn btn--solid"
              >
                Bilgi iste
              </a>
              <a href="tel:+905513658489" className="btn btn--line">
                Eczacı hattı
              </a>
              <Link to="/urunler" className="btn btn--ghost-dark">
                Tüm ürünler
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="section section--related">
          <div className="container">
            <Reveal>
              <p className="eyebrow">Aynı kategoride</p>
              <h2 className="section-title">İlginizi çekebilir</h2>
            </Reveal>
            <div className="product-rail">
              {related.map((p, i) => (
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
          </div>
        </section>
      ) : null}
    </div>
  );
}
