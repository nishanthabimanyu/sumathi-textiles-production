import { products as defaultProducts, Product } from '@/data/products';

export interface SiteContent {
  announcement: string;
  hero: {
    headline: string;
    tagline: string;
    cta1: string;
    cta2: string;
    bgImage?: string;
  };
  festivals: Array<{
    key: string;
    name: string;
    badge: string;
    img: string;
  }>;
  settings: {
    whatsapp: string;
    instagram: string;
    youtube: string;
  };
  products: Array<{
    id: number;
    slug: string;
    title: string;
    price: number;
    desc: string;
    localImg?: string;
    festivals?: string[];
  }>;
  about?: {
    headline?: string;
    subhead?: string;
    timeline: Array<{ year: string; title: string; subtitle: string; desc: string; img?: string; }>;
    values: Array<{ icon: string; title: string; desc: string; }>;
  };
  concierge?: {
    headline: string;
    subtitle: string;
    desc: string;
    features: Array<{ title: string; desc: string; }>;
  };
}

export function getMergedProducts(content: SiteContent): Product[] {
  return defaultProducts.map(p => {
    const override = content.products.find(op => op.id === p.id || op.slug === p.slug);
    if (override) {
      return {
        ...p,
        title: override.title || p.title,
        price: override.price || p.price,
        desc: override.desc || p.desc,
        localImg: override.localImg || p.localImg,
        festivals: override.festivals || p.festivals,
      };
    }
    return p;
  });
}
