const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '../src/data/content.json');

const aboutContent = {
  timeline: [
    {
      year: "1986",
      title: "The Origin",
      subtitle: "A Loom of Whispering Threads",
      desc: "Our journey began with a single handloom in Coimbatore, driven by a passion to preserve the sacred art of Kanchivaram weaving and pure zari crafts.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBBmGgbauNGukrdz1aPJ4pnNCPc6WAOQda3KWI5kvgWT3KW_DcJhyykSYuFkWkX-F_aTYDKSTMk4esu6zpfmlWvcpAtR9QvvOdMRintALYX53VQP9ojMRAL-ImJYQKtbwdB0_8IqLdFhmvWYdipj2ikW8Kpu4LVRD8_UQqsnRYZYqYq9KDLrWwb3fzaxBH4h0sCkghvUbyxKRmZBmgTxDDr7l0-javxjiNCG0W9ztGIhlUCJQZQWX4kI1Y5p0LcT8LFQEDZvyw_10"
    },
    {
      year: "2006",
      title: "Imperial Expansion",
      subtitle: "Masters of the Craft",
      desc: "Bridging traditional aesthetics with modern silhouettes, creating unstitched suit sets and bridal couture that echo through generations of South Indian heritage.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD58DxMhGhtF7oQ66TuIRbkxUn67DatD5N-ktwRUc2wcMt9J5F5eaZA6H5IokbiwS91xjtcw10Q3Y16WAJoYCduNPmTYrKTs4pduSsW__pL5OqnispDPsn-iwAoixfBU0f7KjZ3effPyHJFVHmZDYvNWW06oC3n5hBILWmBxrUuAXXAoGX0H2i2PJwcisR-0ly1C8yEcuMvMzf7uuhrasK-E-63VsaOkYjdnPvPEEazgfjnN_-3wLM6hpBhv1Ukl8lkZNSY83vQAtI"
    },
    {
      year: "2024",
      title: "The Digital Atelier",
      subtitle: "Heritage Meets Modernity",
      desc: "Taking Coimbatore's finest silks to a global audience — every thread woven with the same love, now delivered to your doorstep anywhere in India.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG-ePkxmVoh_IdKQWLqP2aluQh_kez-bAs75Y2UL1j6FASA5NMQRScgVvBIXQgu8idWQWgf9mtno4IT_6W5UvXtH3n2Ui_zNrvhCcjd56uB74pIi3dTp-zWJgCnwmq_7Bk8v8oaoohG1y8qBFXNeXWJ2W-piYH1nIMxy93ex2-y5NXs9UDJm8g23LRrq5DRi0lVAiJBuSt7RSTNP_PF-fO3grgEDT49PxFyCLFxWdw3E9-lVhgq0iFKExncGyVVZoDBojkTILbfPE"
    }
  ],
  values: [
    { icon: "verified", title: "Authenticity", desc: "Every saree directly from master weavers in Coimbatore." },
    { icon: "potted_plant", title: "Sustainability", desc: "Ethical crafts protecting ancient heritage looms." },
    { icon: "history_edu", title: "Legacy", desc: "Four decades of unbroken weaving tradition." },
    { icon: "encrypted", title: "Trust", desc: "Transparent pricing, secure checkout, easy returns." }
  ]
};

const conciergeContent = {
  headline: "Royal Atelier",
  subtitle: "Personal Stylist & Concierge",
  desc: "Experience individual draping sessions, color analytics, and bridal trousseau consultations with our master stylists.",
  features: [
    { title: "Visual Catalog", desc: "Private access to loom archives." },
    { title: "Drape Sessions", desc: "Digital styling via WhatsApp Video." },
    { title: "Color Theory", desc: "Find hues that align perfectly." }
  ]
};

try {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  content.about = aboutContent;
  content.concierge = conciergeContent;
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
  console.log("Successfully appended About and Concierge content to content.json");
} catch (err) {
  console.error("Error updating content.json:", err);
}
