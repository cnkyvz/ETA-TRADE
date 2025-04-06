// scripts/updateTranslations.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { createClient } = require("contentful");


const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const supportedLocales = {
  en: "en-US",
  ar: "ar",
  tr: "tr-TR", // TR Contentful'da yoksa, fallback yapılır
};

const outputFiles = {
  en: "public/locales/en.json",
  ar: "public/locales/ar.json",
  tr: "public/locales/tr.json",
};

async function updateTranslationFiles() {
  const baseData = {
    header: {},
    subcategories: {},
    products: {},
    projects: {
      title: "",
      categories: "",
      error: "Failed to fetch data.",
      categoriesList: {},
    },
  };

  for (const lang in supportedLocales) {
    try {
        const locale = supportedLocales[lang] || "en-US";

        // TR Contentful'da yoksa, fallback olarak en-US kullan
        const effectiveLocale = locale === "tr-TR" ? "en-US" : locale;
        

        const entries = await client.getEntries({
            content_type: "mainCategory",
            locale: effectiveLocale,
          });
          

      const categoriesList = {};
      for (const item of entries.items) {
        const name = item.fields.main_category_name;
        categoriesList[name] = name; // istersen başka dilde eşleştirme de yapılabilir
      }

      const finalJson = {
        ...baseData,
        header: {
          home: lang === "ar" ? "الرئيسية" : lang === "tr" ? "ANA SAYFA" : "HOME",
          services: lang === "ar" ? "معلومات عنا" : lang === "tr" ? "HAKKIMIZDA" : "ABOUT US",
          projects: lang === "ar" ? "منتجات" : lang === "tr" ? "ÜRÜNLER" : "PRODUCTS",
          connect: lang === "ar" ? "اتصل بنا" : lang === "tr" ? "İLETİŞİM" : "CONTACT",
          description1: lang === "ar" ? "لدينا 20 عامًا من الخبرة." : "20 yıldır bu sektördeyiz.",
          description2: lang === "ar" ? "نصدر منتجاتنا..." : "Ürünlerimizi ihraç ediyoruz.",
          follow: lang === "ar" ? "تابعنا" : "FOLLOW",
          headquarters: lang === "ar" ? "المقر الرئيسي" : "MERKEZ OFİS",
          successTitle: "10+ YILLIK BAŞARI",
          successDescription: "ORTA DOĞU VE AVRUPA’DA ÖNDE GELEN TEDARİKÇİ.",
        },
        projects: {
          ...baseData.projects,
          title:
            lang === "ar"
              ? "فئات المنتجات"
              : lang === "tr"
              ? "ÜRÜN KATEGORİLERİ"
              : "PRODUCT CATEGORIES",
          categories: categoriesList,
          categoriesList: categoriesList,
        },
      };

      const filePath = path.resolve(__dirname, "..", outputFiles[lang]);
      fs.writeFileSync(filePath, JSON.stringify(finalJson, null, 2), "utf-8");

      console.log(`✅ ${lang}.json güncellendi.`);
    } catch (err) {
      console.error(`❌ ${lang}.json güncellenemedi:`, err);
    }
  }
}

updateTranslationFiles();
