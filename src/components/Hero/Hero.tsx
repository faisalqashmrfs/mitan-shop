import { useState, useEffect, useRef } from "react";
import "./Hero.css";
import { useTranslation } from 'react-i18next';

function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  // 1. مراقبة التمرير لتغيير لون الناف بار
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. مراقبة الأقسام لتحديد النشط
  useEffect(() => {
    const sections = [
      "hero-section",
      "tunel-section",
      "branches-section",
      "footer-section",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "hero-section") setActiveSection("hero");
            else if (id === "tunel-section") setActiveSection("tunel");
            else if (id === "branches-section") setActiveSection("branches");
            else if (id === "footer-section") setActiveSection("footer");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // 3. دالة للتمرير السلس
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="Hero">
      <nav ref={navRef} className="navbar">
        {/* ===== النص الديناميكي للعنوان ===== */}
        <h1 className={isScrolled ? "style2" : "style1"}>
          {t('hero.title')}
        </h1>

        {/* ===== النص الديناميكي للوصف والزر ===== */}
        <div className={isScrolled ? "line2" : "line"}>
          <span>{t('hero.subtitle')}</span>
          <button onClick={() => scrollToSection("tunel-section")}>
            {t('hero.button')}
            <img src="/arrowdown.png" alt="" />
          </button>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* ===== الروابط الديناميكية ===== */}
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li>
            <a
              href="#hero-section"
              className={activeSection === "hero" ? "activeLink" : "disactiveLink"}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero-section");
              }}
            >
              {t('hero.nav.intro')}
            </a>
          </li>
          <li>
            <a
              href="#tunel-section"
              className={activeSection === "tunel" ? "activeLink" : "disactiveLink"}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("tunel-section");
              }}
            >
              {t('hero.nav.features')}
            </a>
          </li>
          <li>
            <a
              href="#branches-section"
              className={activeSection === "branches" ? "activeLink" : "disactiveLink"}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("branches-section");
              }}
            >
              {t('hero.nav.branches')}
            </a>
          </li>
          <li>
            <a
              href="#footer-section"
              className={activeSection === "footer" ? "activeLink" : "disactiveLink"}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("footer-section");
              }}
            >
              {t('hero.nav.outro')}
            </a>
          </li>
        </ul>
      </nav>
      <img className="hero-bg" src="/heroBG.jpg" alt="Hero Background" />
    </div>
  );
}

export default Hero;