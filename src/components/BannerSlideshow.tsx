import { useEffect, useState } from "react";

type Props = {
  slides: string[];
  intervalMs?: number;
  /** stage = packshot on dark stage (banner); cover = full-bleed crop */
  mode?: "stage" | "cover";
  veil?: "soft" | "strong" | "left" | "none";
  className?: string;
  showDots?: boolean;
};

export function BannerSlideshow({
  slides,
  intervalMs = 4200,
  mode = "stage",
  veil = "soft",
  className = "",
  showDots = true,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides, intervalMs]);

  return (
    <div className={`banner-show banner-show--${mode} ${className}`}>
      <div className="banner-show__stage" aria-hidden>
        {slides.map((src, i) => (
          <div
            key={src}
            className={`banner-show__slide ${i === index ? "is-active" : ""} ${
              i === (index - 1 + slides.length) % slides.length ? "is-exit" : ""
            }`}
          >
            <img src={src} alt="" className="banner-show__img" />
          </div>
        ))}
        {veil !== "none" ? <div className={`banner-show__veil banner-show__veil--${veil}`} /> : null}
      </div>
      {showDots && slides.length > 1 ? (
        <div className="banner-show__dots" role="tablist" aria-label="Banner slaytları">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={i === index ? "is-active" : ""}
              aria-label={`Slayt ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
