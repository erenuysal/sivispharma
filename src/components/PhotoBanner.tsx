type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** kenburns | float | none */
  motion?: "kenburns" | "float" | "none";
  darken?: "soft" | "strong" | "left" | "none";
};

export function PhotoBanner({
  src,
  alt = "",
  className = "",
  motion = "kenburns",
  darken = "soft",
}: Props) {
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
