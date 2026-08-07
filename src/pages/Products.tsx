import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories, products } from "../data/products";
import { Reveal } from "../components/Reveal";
import { PhotoBanner } from "../components/PhotoBanner";

export function Products() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("k") || "Tümü";
  const [active, setActive] = useState(initial);

  const filtered = useMemo(() => {
    if (active === "Tümü") return products;
    return products.filter((p) => p.category === active);
  }, [active]);

  function select(cat: string) {
    setActive(cat);
    if (cat === "Tümü") setParams({});
    else setParams({ k: cat });
  }

  return (
    <>
      <section className="page-head">
        <div className="container page-head__inner">
          <p className="eyebrow anim-rise">Ürün Portföyü</p>
          <h1 className="page-head__title anim-rise anim-delay-1">
            Her formül, tek bir sağlık ihtiyacı için
          </h1>
          <p className="page-head__sub anim-rise anim-delay-2">
            Kategoriye göre inceleyin; ürün profilinde form, dozaj ve kullanım bilgisine ulaşın.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container">
          <div className="filters" role="tablist" aria-label="Kategori filtresi">
            <button
              type="button"
              className={active === "Tümü" ? "is-active" : ""}
              onClick={() => select("Tümü")}
            >
              Tümü
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={active === c ? "is-active" : ""}
                onClick={() => select(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link to={`/urun/${p.slug}`} className="product-card-link">
                  <article className="product-card">
                    <div className="product-card__banner">
                      <PhotoBanner src={p.image} motion="float" darken="none" />
                      <span>{p.category}</span>
                    </div>
                    <div className="product-card__body">
                      <h2>{p.name}</h2>
                      <p>{p.tagline}</p>
                      <div className="product-card__meta">
                        <span>{p.form}</span>
                        <span>{p.dose}</span>
                      </div>
                      <span className="product-card__cta">Profili gör →</span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
