type Props = {
  src: string;
  alt?: string;
  className?: string;
  motion?: "kenburns" | "float" | "none";
  darken?: "soft" | "strong" | "left" | "none";
  /** card = product tile treatment with feathered packshot */
  variant?: "fill" | "card";
};

export function PhotoBanner({
  src,
  alt = "",
  className = "",
  motion = "float",
  darken = "none",
  variant = "card",
}: Props) {
  if (variant === "card") {
    return (
      <div className={`photo-card ${className}`} aria-hidden={alt ? undefined : true}>
        <div className="packshot packshot--card">
          <div className="packshot__bloom packshot__bloom--soft" />
          <img
            src={src}
            alt={alt}
            className={`packshot__img photo-banner__img--${motion}`}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`photo-banner ${className}`} aria-hidden={alt ? undefined : true}>
      <img
        src={src}
        alt={alt}
        className={`photo-banner__img photo-banner__img--${motion}`}
        loading="eager"
        decoding="async"
      />
      {darken !== "none" ? <div className={`photo-banner__veil photo-banner__veil--${darken}`} /> : null}
    </div>
  );
}
