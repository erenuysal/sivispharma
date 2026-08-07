import { BannerSlideshow } from "./BannerSlideshow";

type Props = {
  slides: string[];
  intervalMs?: number;
};

/** Hero uses stage mode so packshots read as wide banners, not extreme crops. */
export function HeroSlideshow({ slides, intervalMs = 4500 }: Props) {
  return (
    <BannerSlideshow
      slides={slides}
      intervalMs={intervalMs}
      mode="stage"
      veil="soft"
      showDots
      className="hero-slideshow"
    />
  );
}
