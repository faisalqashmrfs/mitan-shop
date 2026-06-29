import { useState, useEffect, useRef } from "react";
import "./Hero.css";

function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // 1. مراقبة التمرير لتغيير لون الناف بار
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. مراقبة الأقسام لتحديد النشط
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
      threshold: 0.05, // 🔽 5% فقط كافي
      rootMargin: "-5% 0px -5% 0px", // 🔽 نراقب في منتصف الشاشة
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
      <nav ref={navRef} className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <h1 className={isScrolled ? "style2" : "style1"}>Mitan Shop</h1>

        <div className={isScrolled ? "line2" : "line"}>
          <span>Groceries Curated for Uncompromising Standard</span>
          <button onClick={() => scrollToSection("tunel-section")}>
            Scroll to Explore
            <img src="/arrowdown.png" alt="" />
          </button>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

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
              INTRO
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
              FEATURES
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
              BRANCHES
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
              OUTRO
            </a>
          </li>
        </ul>
      </nav>
      <img className="hero-bg" src="/heroBG.png" alt="Hero Background" />
    </div>
  );
}

export default Hero;