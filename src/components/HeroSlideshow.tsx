import { useEffect, useState } from "react";

type Props = {
  slides: string[];
  intervalMs?: number;
};

export function HeroSlideshow({ slides, intervalMs = 4500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides, intervalMs]);

  return (
    <div className="hero-slideshow" aria-hidden>
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`hero-slideshow__slide ${i === index ? "is-active" : ""}`}
        />
      ))}
      <div className="hero-slideshow__veil" />
    </div>
  );
}
