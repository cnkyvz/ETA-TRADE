//src/contentfulDynamicLoader.js
import { createClient } from "contentful";
import i18n from "i18next";

// Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const localeMap = {
  en: "en-US",
  ar: "ar",
  tr: "en-US", // Türkçe locale yok, fallback
};

export const loadCategoryTranslations = async (lang) => {
  const locale = localeMap[lang] || "en-US";

  try {
    const response = await client.getEntries({
      content_type: "mainCategory",
      locale,
    });

    const categoriesList = {};
    response.items.forEach((item) => {
      const name = item.fields.main_category_name;
      categoriesList[name] = name; // Gerekirse çeviri eşlemesi burada yapılır
    });

    // Runtime'da i18n'e ekle
    i18n.addResourceBundle(lang, "projects", {
      categoriesList,
    }, true, true);

    console.log(`✅ i18next'e "${lang}" için Contentful kategori verisi eklendi.`);
  } catch (error) {
    console.error("❌ Contentful'dan çeviri verisi çekilemedi:", error);
  }
};
