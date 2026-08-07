import { asset } from "../lib/asset";

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  form: string;
  dose: string;
  image: string;
  highlights: string[];
};

export const categories = [
  "Anne & Bebek",
  "Üreme Sağlığı",
  "Performans",
  "Üriner Sistem",
  "Takviyeler",
] as const;

export const brand = {
  logo: asset("images/brand/logo.svg"),
  name: "Sivis Pharma",
};

/** Canlı siteden çekilen ürün görselleri (sivispharma.com/images/products) */
export const products: Product[] = [
  {
    slug: "sivisfol",
    name: "SivisFOL",
    category: "Anne & Bebek",
    tagline: "Aktif folatla gebelik yolculuğuna güvenli başlangıç",
    summary:
      "Gebelik öncesi ve boyunca anne-bebek sağlığını destekleyen 4. nesil aktif folat formülü. Emilimi yüksek, günlük kullanıma uygun kombine tablet seti.",
    form: "30 + 30 Tablet",
    dose: "1×2 kombine",
    image: asset("images/products/sivisfol.jpg"),
    highlights: ["4. nesil aktif folat", "Gebelik öncesi & sırası", "Uzman eczacı formülü"],
  },
  {
    slug: "sivis-omefol",
    name: "Sivis OMEFOL",
    category: "Anne & Bebek",
    tagline: "Omega-3, aktif folat ve kolin tek şemada",
    summary:
      "Gebelik ve üreme sağlığı için Omega-3, aktif folat ve kolin içeren dengeli kombine formül. Hem anne hem bebek gelişimini destekler.",
    form: "30 Jel Kapsül + 30 Tablet",
    dose: "1×2 kombine",
    image: asset("images/products/omefol.jpg"),
    highlights: ["Omega-3 DHA/EPA", "Aktif folat", "Kolin desteği"],
  },
  {
    slug: "sivislact",
    name: "SivisLACT",
    category: "Anne & Bebek",
    tagline: "Emzirme döneminde süt üretimini destekler",
    summary:
      "Emzirme döneminde süt üretimini artırmayı destekleyen galaktagog takviye. Günlük tek tablet kullanımıyla pratik destek.",
    form: "30 Tablet",
    dose: "1×1",
    image: asset("images/products/sivislact.jpg"),
    highlights: ["Galaktagog bitkisel destek", "Emzirme dönemi", "Tek tablet"],
  },
  {
    slug: "sivis-leydinol",
    name: "Sivis LEYDİNOL",
    category: "Üreme Sağlığı",
    tagline: "Kadın üreme sağlığı için özel şase formül",
    summary:
      "PCOS ve yumurta kalitesi odaklı kadın üreme sağlığı şasesi. Günlük kullanım için pratik, lezzetli ve hedefli formülasyon.",
    form: "30 Şase",
    dose: "1×1",
    image: asset("images/products/leydinol.jpg"),
    highlights: ["PCOS odaklı", "Yumurta kalitesi", "Şase kullanım"],
  },
  {
    slug: "sivis-virinol",
    name: "Sivis VİRİNOL",
    category: "Üreme Sağlığı",
    tagline: "Erkek fertilite kapasitesini destekler",
    summary:
      "Sperm kalitesini ve fertilite kapasitesini artırmayı destekleyen erkek üreme takviyesi. Laboratuvar odaklı bileşen profili.",
    form: "30 Şase",
    dose: "1×1",
    image: asset("images/products/virinol.jpg"),
    highlights: ["Sperm kalitesi", "Fertilite desteği", "Şase form"],
  },
  {
    slug: "sivishot-woman",
    name: "SiviSHOT Performans Woman",
    category: "Performans",
    tagline: "Kadınlarda libido ve enerji için shot formül",
    summary:
      "Kadınlarda libido ve performans desteği için özel formüle edilmiş içecek. Hızlı tüketim, belirgin etki odaklı profil.",
    form: "Shot içecek",
    dose: "İhtiyaç halinde",
    image: asset("images/products/omefol.jpg"),
    highlights: ["Shot format", "Hızlı tüketim", "Kadın formülü"],
  },
  {
    slug: "sivishot-man",
    name: "SiviSHOT Performans Man",
    category: "Performans",
    tagline: "Erkeklerde libido ve performans desteği",
    summary:
      "Erkeklerde libido ve performans desteği için özel formüle edilmiş içecek. Yoğun ama temiz bir enerji hissi hedefler.",
    form: "Shot içecek",
    dose: "İhtiyaç halinde",
    image: asset("images/products/virinol.jpg"),
    highlights: ["Shot format", "Performans odaklı", "Erkek formülü"],
  },
  {
    slug: "sivistone",
    name: "SiviSTONE",
    category: "Üriner Sistem",
    tagline: "Böbrek taşı ve kum eliminasyonuna bitkisel destek",
    summary:
      "Böbrek taşı ve kumun eliminasyonunu destekleyen bitkisel soft-gel formül. Günlük iki kapsül protokolüyle kullanılır.",
    form: "30 Soft-Gel",
    dose: "2×1",
    image: asset("images/products/stone.jpg"),
    highlights: ["Bitkisel soft-gel", "Taş / kum desteği", "2×1 kullanım"],
  },
  {
    slug: "sivis-procystin",
    name: "Sivis PROCYSTİN",
    category: "Üriner Sistem",
    tagline: "Üriner sistem enfeksiyonlarında uzman formül",
    summary:
      "Üriner sistem enfeksiyonlarında patojen inhibisyonunu destekleyen uzman formül. Yoğun tablet protokolüyle sunulur.",
    form: "60 Tablet",
    dose: "2×1",
    image: asset("images/products/procystin.jpg"),
    highlights: ["UTI odaklı", "Uzman formül", "60 tablet"],
  },
  {
    slug: "sivisfer-plus",
    name: "SivisFER Plus",
    category: "Takviyeler",
    tagline: "Lipozomal demir — mide dostu emilim",
    summary:
      "Lipozomal teknoloji ile maksimum emilim sağlayan, mide dostu demir takviyesi. Günlük tek kapsül.",
    form: "30 DR Kapsül",
    dose: "1×1",
    image: asset("images/products/sivisfer.jpg"),
    highlights: ["Lipozomal demir", "Mide dostu", "Yüksek emilim"],
  },
  {
    slug: "sivis-cama-duo",
    name: "Sivis CaMa Duo",
    category: "Takviyeler",
    tagline: "Sabah-akşam kalsiyum & magnezyum dengesi",
    summary:
      "Sabah-akşam kombine kalsiyum-magnezyum formülü ile kemik ve kas sağlığı desteği. Günün ritmine uygun iki aşamalı kullanım.",
    form: "30 + 30 Tablet",
    dose: "Sabah 1×1 / Akşam 1×1",
    image: asset("images/products/cama-duo.jpg"),
    highlights: ["Ca + Mg duo", "Sabah / akşam", "Kemik & kas"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const heroSlides = products
  .filter((p) => !p.slug.startsWith("sivishot"))
  .map((p) => p.image);
