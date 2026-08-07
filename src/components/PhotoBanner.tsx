type Props = {
  src: string;
  alt?: string;
  className?: string;
};

/** Clean packshot on a soft studio surface — no masks, no glow halos. */
export function PhotoBanner({ src, alt = "", className = "" }: Props) {
  return (
    <div className={`shot ${className}`}>
      <img src={src} alt={alt} className="shot__img" loading="lazy" decoding="async" />
    </div>
  );
}
