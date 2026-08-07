import { useEffect, useState } from "react";

type Props = {
  slides: string[];
  intervalMs?: number;
  className?: string;
  showDots?: boolean;
  /** panel = light studio tray; bare = just images on current bg */
  surface?: "panel" | "bare";
};

export function BannerSlideshow({
  slides,
  intervalMs = 4500,
  className = "",
  showDots = true,
  surface = "panel",
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
    <div className={`shot-show shot-show--${surface} ${className}`}>
      {slides.map((src, i) => (
        <div key={src} className={`shot-show__slide ${i === index ? "is-active" : ""}`}>
          <img src={src} alt="" className="shot-show__img" />
        </div>
      ))}
      {showDots && slides.length > 1 ? (
        <div className="shot-show__dots" role="tablist" aria-label="Ürün slaytları">
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
