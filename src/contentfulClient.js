import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

// contentfulClient.js
export const fetchMainCategories = async (locale = "en-US") => {
  try {
    const response = await client.getEntries({
      content_type: "mainCategory",
      locale, // seçilen dilde veriyi getir
    });
    return response.items;
  } catch (error) {
    console.error("Ana kategoriler alınamadı:", error);
    throw error;
  }
};




export const fetchSubCategories = async (mainCategoryId) => {
    try {
      const response = await client.getEntries({
        content_type: "mainCategory", // Main Category'nin Contentful'daki ID'si
        "sys.id": mainCategoryId, // Main Category'nin ID'si
        select: "fields.sub_categories", // Sadece sub_categories alanını çek
      });
  
      const subCategoryIds = response.items[0].fields.sub_categories.map(
        (ref) => ref.sys.id
      );
  
      const subCategories = await client.getEntries({
        content_type: "sub_categories", // Sub Categories'nin Contentful'daki ID'si
        "sys.id[in]": subCategoryIds.join(","),
      });
  
      return subCategories.items;
    } catch (error) {
      console.error("Alt kategoriler alınamadı:", error);
      throw error;
    }
  };
  
  export const fetchProducts = async (subCategoryId) => {
    try {
      // Alt kategoriyi al
      const subCategoryResponse = await client.getEntries({
        content_type: "sub_categories", // Sub Categories içerik modelinin ID'si
        "sys.id": subCategoryId, // Sub Category'nin ID'si
        select: "fields.products", // Sadece products alanını çek
      });
  
      // Gelen yanıtı kontrol et
      if (!subCategoryResponse.items || subCategoryResponse.items.length === 0) {
        console.error("Alt kategori bulunamadı.");
        return [];
      }
  
      // Products ID'lerini al
      const productIds = subCategoryResponse.items[0]?.fields.products?.map(
        (ref) => ref.sys.id
      );
  
      if (!productIds || productIds.length === 0) {
        console.error("Ürünler bulunamadı.");
        return [];
      }
  
      // Products öğelerini al
      const productsResponse = await client.getEntries({
        content_type: "products", // Products içerik modelinin ID'si
        "sys.id[in]": productIds.join(","), // Products ID'lerini sorgula
      });
  
      return productsResponse.items;
    } catch (error) {
      console.error("Ürünler alınamadı:", error);
      throw error;
    }
  };
  
  
  
  
  
