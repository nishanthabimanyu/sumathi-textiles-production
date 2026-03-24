import fs from 'fs';
import path from 'path';
import { SiteContent } from './content';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src/data/content.json');

export function getContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileData = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
      return JSON.parse(fileData) as SiteContent;
    }
  } catch (error) {
    console.error("Error reading content.json:", error);
  }

  // Fallback defaults in case file reading fails
  return {
    announcement: "Complimentary Shipping on Orders over ₹2000 | Personal Styling via WhatsApp",
    hero: {
      headline: "Threads of Royalty",
      tagline: "\"Where every warp and weft whispers tales of ancient Coimbatore, woven into silhouettes of contemporary majesty.\"",
      cta1: "EXPLORE COLLECTIONS",
      cta2: "OUR STORY"
    },
    festivals: [
      { key: "pongal", name: "Pongal Harvest", badge: "JAN", img: "/festival_pongal.png" },
      { key: "navratri", name: "Navratri Splendour", badge: "OCT", img: "/festival_navratri.png" },
      { key: "diwali", name: "Diwali Festive", badge: "NOV", img: "/festival_diwali.png" },
      { key: "bridal", name: "Bridal Season", badge: "ALL YEAR", img: "/festival_bridal.png" },
      { key: "onam", name: "Onam Elegance", badge: "AUG", img: "/festival_onam.png" }
    ],
    settings: {
      whatsapp: "+91 98765 43210",
      instagram: "https://instagram.com/sumathitextiles",
      youtube: "https://youtube.com/sumathitextiles"
    },
    products: []
  };
}

export function saveContent(content: SiteContent): boolean {
  try {
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving content.json:", error);
    return false;
  }
}
