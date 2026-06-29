import { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isactive, setIsactive] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false); // حالة جديدة للتحكم في القائمة على الموبايل

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="Hero">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <h1 className={isScrolled ? "style2" : "style1"}>Mitan Shop</h1>
        
        <div className={isScrolled ? "line2" : "line"}>
          <span>Groceries Curated for Uncompromising Standard</span>
          <button>
            Scroll to Explore 
            <img src="/arrowdown.png" alt="" />
          </button>
        </div>

        {/* زر الهامبرغر للموبايل */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
            <li onClick={() => { setIsactive(1); setMenuOpen(false); }}><a href="#home" className={isactive === 1 ? "activeLink" : "disactiveLink"}>INTRO</a></li>
            <li onClick={() => { setIsactive(2); setMenuOpen(false); }}><a href="#about" className={isactive === 2 ? "activeLink" : "disactiveLink"}>FEATURES</a></li>
            <li onClick={() => { setIsactive(3); setMenuOpen(false); }}><a href="#contact" className={isactive === 3 ? "activeLink" : "disactiveLink"}>BRANCHES</a></li>
            <li onClick={() => { setIsactive(4); setMenuOpen(false); }}><a href="#contact" className={isactive === 4 ? "activeLink" : "disactiveLink"}>OUTRO</a></li>
        </ul>
      </nav>
      <img className="hero-bg" src="/heroBG.png" alt="Hero Background" />
    </div>
  );
}

export default Hero;