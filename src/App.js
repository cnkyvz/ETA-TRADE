import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Projects from "./components/Projects";
import SubCategory from "./components/SubCategory";
import Products from "./components/Products";
import "./i18n";
import { useTranslation } from "react-i18next";
import { loadCategoryTranslations } from "./contentfulDynamicLoader"; // DİNAMİK YÜKLEYİCİ

// Dil parametresini App düzeyinde yakalamak için özel bir wrapper component
const WithLocaleLoader = ({ Component }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang); // i18n dilini ayarla

      // Contentful'dan runtime'da kategori çevirilerini yükle
      loadCategoryTranslations(lang, i18n);
    }
  }, [lang, i18n]);

  return <Component />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Sayfalar, dil parametresiyle birlikte dinamik i18n yüklenerek render edilir */}
        <Route path="/:lang" element={<WithLocaleLoader Component={Header} />} />
        <Route path="/:lang/projects" element={<WithLocaleLoader Component={Projects} />} />
        <Route path="/:lang/sub-category/:id" element={<WithLocaleLoader Component={SubCategory} />} />
        <Route path="/:lang/products/:id" element={<WithLocaleLoader Component={Products} />} />

        {/* Varsayılan yönlendirme */}
        <Route path="/" element={<Navigate to="/en" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
