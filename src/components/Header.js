import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const handleLanguageChange = (selectedLang) => {
    navigate(`/${selectedLang}`);
  };

  return (
    <>
      <header className="relative h-screen">
        {/* Video Arka Plan */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={`${process.env.PUBLIC_URL}/EtaHeaderVideo.mp4`}
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
              } absolute top-28 left-0 right-0 bg-black bg-opacity-90 text-white md:static md:flex md:space-x-8 md:bg-transparent md:text-gray-300 md:items-center`}
            >
              <li className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0">
              <a href="/header">HOME</a>
              </li>
              <li>{t("header.services")}</li>
              <li
                className="hover:text-white cursor-pointer px-6 py-4 border-b border-gray-500 md:border-0"
                onClick={() => navigate(`/${lang}/projects`)}
              >
                {t("header.projects")}
              </li>
              <li>{t("header.connect")}</li>

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
          {/* Kırmızı Çizgi */}
          <div className="w-24 h-1 bg-red-500 mb-4 mt-24"></div>

          {/* Başlık */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-snug">
             <br /> ETA-TRADE
          </h1>

          {/* İletişim Bilgileri */}
          <div className="mt-24">
            {/* Kırmızı Çizgi */}
            <div className="w-full h-0.5 bg-red-500 mb-6"></div>
            <div className="flex flex-col space-y-4 text-lg items-start md:flex-row md:space-y-0 md:space-x-10 md:items-center md:justify-center">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-red-500">location_on</span>
                <p>Yenimahalle İstanbul Caddesi No:730/A, Istanbul, Turkey</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-red-500">email</span>
                <p>info@eta-trade.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-red-500">phone</span>
                <p>+90 (545) 123 123 12</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* İkinci Bölüm */}
      <section className="bg-black text-white py-16 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="w-16 h-1 bg-red-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-snug">
            ETA-TRADE <br />  
            </h2>
          </div>

          <div className="text-gray-300">
            <p className="mb-4">
            We have been in this industry for 20 years.
            </p>
            <p className="mb-4">
            We export products to Europe and the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="w-16 h-1 bg-red-500 mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold">FOLLOW</h2>
            </div>
            <div className="flex space-x-6 items-center justify-start md:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com/etatrade/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-10 grid grid-cols-1 md:grid-cols-2 text-sm gap-8">
            <div>
              <h3 className="font-extrabold text-red-500 mb-2">HEADQUARTERS</h3>
              <p>401 Vaughan Valley Boulevard</p>
              <p>Woodbridge, ON L4H 3B5</p>
              <p>416.213.7191</p>
              <p>info@rinomatoconstruction.com</p>
            </div>
            <div>
              <h3 className="font-extrabold text-red-500 mb-2">50+ YEARS OF SUCCESS</h3>
              <p>
                ONE OF SOUTHERN ONTARIO'S LEADING PROVIDERS OF INTEGRATED
                CONSTRUCTION SERVICES.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-500 text-xs">
            <p>
              @2024 RINOMATO CONSTRUCTION. A DIVISION OF RGC – RINOMATO GROUP OF
              COMPANIES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
