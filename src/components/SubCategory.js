import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchSubCategories } from "../contentfulClient";
import { useTranslation } from "react-i18next";

const SubCategory = () => {
  const { id, lang } = useParams(); // 'id' ve 'lang' parametrelerini alın
  const [subCategories, setSubCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menü durumu
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const data = await fetchSubCategories(id);
        setSubCategories(data);
      } catch (err) {
        console.error("Alt kategoriler alınamadı:", err);
        setError(t("subcategories.error"));
      }
    };
    getSubCategories();
  }, [id, t]);

  const handleLanguageChange = (selectedLang) => {
    i18n.changeLanguage(selectedLang);
    navigate(`/${selectedLang}/sub-category/${id}`); // "sub-category" rotası App.js ile uyumlu olmalı
  };
  

  return (
    <>
      <header className="relative h-screen">
        {/* Video Arka Plan */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={`${process.env.PUBLIC_URL}/EtaHeaderVideo2.mp4`}
          autoPlay
          loop
          muted
        ></video>
        {/* Transparan Siyah Katman */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Header İçerik */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 md:px-10 bg-black bg-opacity-60">
          {/* Logo */}
          <div className="md:text-left text-center">
            <img
              src={`${process.env.PUBLIC_URL}/EtaLogo.png`}
              alt="Eta Logo"
              className="h-12 md:h-16 inline-block"
            />
          </div>

          {/* Hamburger Menü (Mobilde Görünür) */}
          <button
            className="text-white text-3xl md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          {/* Menü */}
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 right-0 bg-black bg-opacity-90 text-white md:static md:flex md:space-x-8 md:bg-transparent md:text-gray-300 md:items-center`}
          >
            <li className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0 text-left">
              <Link to={`/${lang}`}>{t("header.home")}</Link>
            </li>
            <li className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0 text-left">
              {t("header.services")}
            </li>
            <li className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0 text-left">
              <Link to={`/${lang}/projects`}>{t("header.projects")}</Link>
            </li>
            <li className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0 text-left">
              {t("header.connect")}
            </li>

            {/* Geniş Ekran Dil Seçenekleri */}
            <div className="hidden md:flex items-center space-x-4 border-l border-gray-500 pl-4">
              <button
                onClick={() => handleLanguageChange("en")}
                className="hover:text-white cursor-pointer"
              >
                EN
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <button
                onClick={() => handleLanguageChange("tr")}
                className="hover:text-white cursor-pointer"
              >
                TR
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <button
                onClick={() => handleLanguageChange("ar")}
                className="hover:text-white cursor-pointer"
              >
                AR
              </button>
            </div>

            {/* Mobil Dil Seçenekleri */}
            {isMenuOpen && (
              <div className="md:hidden flex justify-center space-x-2 mt-4">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="hover:text-white cursor-pointer"
                >
                  EN
                </button>
                <span>|</span>
                <button
                  onClick={() => handleLanguageChange("tr")}
                  className="hover:text-white cursor-pointer"
                >
                  TR
                </button>
                <span>|</span>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="hover:text-white cursor-pointer"
                >
                  AR
                </button>
              </div>
            )}
          </ul>
        </nav>

        {/* Ortadaki Metin */}
        <div className="absolute inset-0 flex flex-col justify-center z-10 text-white px-10">
          <div className="w-24 h-1 bg-red-500 mb-4 mt-24"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-snug">
            {t("subcategories.title")}
          </h1>
        </div>

        {/* WhatsApp Butonu */}
        <a
          href="https://api.whatsapp.com/send/?phone=905446674190&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out z-50"
          style={{
            animation: "bounce 2s infinite",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </a>
        
      </header>

      {/* Alt Kategoriler */}
      <section className="bg-white text-black py-16 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug mb-8">
            {t("subcategories.title")}
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subCategories.map((sub) => (
              <div
                key={sub.sys.id}
                className="bg-gray-100 shadow-md p-6 rounded-lg cursor-pointer"
                onClick={() => navigate(`/${lang}/products/${sub.sys.id}`)}
              >
                <img
                  src={sub.fields.sub_category_image.fields.file.url}
                  alt={sub.fields.sub_categories_name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                  {sub.fields.sub_categories_name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubCategory;
