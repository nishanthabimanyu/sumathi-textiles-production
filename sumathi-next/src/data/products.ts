export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  img: string;        // Google CDN fallback
  localImg: string;   // Local /public/products/ image
  desc: string;
  category: "sarees" | "uncat";
  isNew: boolean;
  festivals: string[];
}

export const products: Product[] = [
  { 
    id: 1, 
    slug: "emerald-kanchipuram", 
    title: "Emerald Kanchipuram", 
    price: 12499, 
    img: "AB6AXuC04zHThCX131qQiyBXNlp6M8DUv4Dgzj0yD4KGrQUZFmVWermXIXiuFEbBzTn4uaKmb1Smwn1MK9O8lvMZEJ2qj5jYuTX80Jm7TCHRqGYp2YBAO2JkDyqgkvokuK2U8Y2JHflSwHunkKF2LupztD7HM_Bqs54dq2ubrABXhI3X9mFu2_uVZ3FCO_7jq9jcDIfBr4qczz09ycq95dBxQoYMTOe4suVWMURkUD8CET3BxoixHRfK3lfoZUm-r5QPgGQBY1g2tiAbFXk", 
    localImg: "/products/emerald-kanchipuram.png",
    desc: "Ornate Gold Zari Work with Silk perfection.",
    category: "sarees",
    isNew: false,
    festivals: ["pongal", "bridal", "navratri"]
  },
  { 
    id: 2, 
    slug: "petal-blossom-silk", 
    title: "Petal Blossom Silk", 
    price: 3250, 
    img: "AB6AXuDKXxMiKIn6sSAAofnztl0Bytki7N4DDc9ebnVdA8YUKmKrWzAchsp3n1Dz6FtoIjbZX9yUWIN2abJapjFhL-Zti1KXAQkKwkjbdz6qO48mq3GW4s-N9mcT46Y9_tlrTPhjeakA4OBvGWaZcYsUNh7xewcttLM6u-xYZ0r-GgjtnuiD3tcXviLMSdGaBLBPE72yA5J0GKM4v2w-GtblDErLpqRUNCmxmcepuOkVyUlB4T_RuLg_jFs7QvaYtxAWtVNUtHe5ddtzpx0", 
    localImg: "/products/petal-blossom-silk.png",
    desc: "Pastel Floral Handloom drape.",
    category: "sarees",
    isNew: true,
    festivals: ["onam", "pongal"]
  },
  { 
    id: 3, 
    slug: "sapphire-soft-silk", 
    title: "Sapphire Soft Silk", 
    price: 8999, 
    img: "AB6AXuA1SbGIpaO4-C1T5lQJ3lWcek9eg60RP0gAb_Lg9gsnr16qDFZkPZtHVdQvAHoxvf2CvGI6anbzZct_d9rTjJ8RSqrjhfV4n0lEAFGgoF4JL8QPJQdKpHLCIXSLMSDuOXSsyHD0Uv54ZgwtJ7xvYGY0yMmTouJXjkJbjvNp55D_l2Ty0SK17uK8tSF-M-T_CagpGA5oDdT93UZg7eOG522J3zHvYnUy0e_OY-6-52RNI2Xby1fIRmCjAiE75bqx_9S4RY7P2h7wXdI", 
    localImg: "/products/sapphire-soft-silk.png",
    desc: "Celestial Silver Zari border.",
    category: "sarees",
    isNew: true,
    festivals: ["diwali", "navratri"]
  },
  { 
    id: 4, 
    slug: "velvet-heritage-set", 
    title: "Velvet Heritage Set", 
    price: 5400, 
    img: "AB6AXuABG4STYI_ngGVDRIoy6lNijclmTsnIxmRUx0E3uYseYJ8-27UAgh8OWkF_-A_1co1MGS3uE8EPYUUY_iEVnr04OrqBeSLY5XfU5LKzKh5sztFUQRm_tnjeEUCja7Ga9XaF-WJZP2o-wANzDHp4KNUceslF1YAbb4k4mKI2t4VARLIH3WDQrTXnVd_1Os8EzJNBlb1eS8_-gqXhauLIRUt01HSfsNr0MW1CMUtUonlp6jysWdi66d4bkaeUJ7VMae_PkZMWKXZZ8l4", 
    localImg: "/products/velvet-heritage-set.png",
    desc: "Hand-Embroidered Velvet masterwork.",
    category: "sarees",
    isNew: false,
    festivals: ["diwali", "onam"]
  },
  { 
    id: 5, 
    slug: "crimson-zari-elegance", 
    title: "Crimson Zari Elegance", 
    price: 15500, 
    img: "AB6AXuD58DxMhGhtF7oQ66TuIRbkxUn67DatD5N-ktwRUc2wcMt9J5F5eaZA6H5IokbiwS91xjtcw10Q3Y16WAJoYCduNPmTYrKTs4pduSsW__pL5OqnispDPsn-iwAoixfBU0f7KjZ3effPyHJFVHmZDYvNWW06oC3n5hBILWmBxrUuAXXAoGX0H2i2PJwcisR-0ly1C8yEcuMvMzf7uuhrasK-E-63VsaOkYjdnPvPEEazgfjnN_-3wLM6hpBhv1Ukl8lkZNSY83vQAtI", 
    localImg: "/products/crimson-zari-elegance.png",
    desc: "Royal Bridal Frame for traditional functions.",
    category: "sarees",
    isNew: true,
    festivals: ["bridal", "navratri", "diwali"]
  },
  { 
    id: 6, 
    slug: "antique-tissue-trousseau", 
    title: "Antique Tissue Trousseau", 
    price: 18999, 
    img: "AB6AXuA4LLcAFxWN-7Qero4kjl-rLQv5TXTFvPG7ZGAdG6zdTEKmXrdUhr43rcteoN8JHvBUu8canr6QcMmpWQq71k8vIyUVymQZ8q367zUupDGJm8tIGbK_BzN0O_ICaUsYKWl3MU5QmgUluSHwMWgp-T9Tve8RhdLGWaTlKs5hb3CORu8vXtto3RMJhgKJBxCNfZa_QfVy8xrR-I-s6e0Nosp4KTmBRRvRjNICznNr634TXhiyKDBb4Qv2T30-BhQ1dd7NNTTVVvstgOo", 
    localImg: "/products/antique-tissue-trousseau.png",
    desc: "Fine Metal Weave with high detail.",
    category: "sarees",
    isNew: false,
    festivals: ["bridal", "pongal"]
  },
  { 
    id: 7, 
    slug: "midnight-gold-banarasi", 
    title: "Midnight Gold Banarasi", 
    price: 21500, 
    img: "", 
    localImg: "/products/midnight-gold-banarasi.png",
    desc: "Luxurious Royal Blue drapes with heavy golden zari and antique frame details.",
    category: "sarees",
    isNew: true,
    festivals: ["bridal", "navratri"]
  },
  { 
    id: 8, 
    slug: "blush-pink-organza", 
    title: "Blush Pink Organza", 
    price: 7800, 
    img: "", 
    localImg: "/products/blush-pink-organza.png",
    desc: "Delicate and airy pastel silhouette containing fine floral lace trim design layouts.",
    category: "sarees",
    isNew: false,
    festivals: ["onam", "pongal"]
  },
  { 
    id: 9, 
    slug: "maroon-bridal-trousseau", 
    title: "Maroon Bridal Trousseau", 
    price: 26500, 
    img: "", 
    localImg: "/products/maroon-bridal-trousseau.png",
    desc: "Opulent Traditional Bridal drape loaded absolute with dense gold patterns.",
    category: "sarees",
    isNew: true,
    festivals: ["bridal", "diwali"]
  },
  { 
    id: 10, 
    slug: "gold-mustard-chanderi", 
    title: "Gold Mustard Chanderi", 
    price: 4500, 
    img: "", 
    localImg: "/products/gold-mustard-chanderi.png",
    desc: "Elegant and minimal silver buti weaves for bright afternoon ceremonies.",
    category: "sarees",
    isNew: false,
    festivals: ["navratri", "pongal"]
  }
];
