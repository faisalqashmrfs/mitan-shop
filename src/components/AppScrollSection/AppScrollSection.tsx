import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import "./AppScrollSection.css";

function AppScrollSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // جلب بيانات المدن من ملف الترجمة
  const citiesData = t('appScroll.cities', { returnObjects: true }) as Array<{
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  }>;

  // مصفوفة صور الخلفيات (ثابتة)
  const bgImages = [
    "/BGapp1.jpg",
    "/BGapp2.jpg",
    "/BGapp3.jpg",
    "/BGapp4.jpg"
  ];

  // دمج البيانات مع الصور
  const CARDS_DATA = citiesData.map((city, index) => ({
    id: index + 1,
    ...city,
    bgImage: bgImages[index] || bgImages[0]
  }));

  // حساب الارتفاع الإجمالي للتمرير ديناميكياً (عدد الكروت * 100vh)
  const totalScrollHeight = CARDS_DATA.length * 100;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${totalScrollHeight}vh`, position: "relative" }}
    >
      {/* الحاوية المثابتة (Sticky Container) الممتدة بملء الشاشة أثناء السكرول */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        {/* 1. الخلفية الثابتة الدائمة (صورة أول مدينة) */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${CARDS_DATA[0]?.bgImage || bgImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "sepia(0.9) hue-rotate(80deg) saturate(4) brightness(0.3) contrast(1)",
          zIndex: 0
        }} />

        {/* 2. طبقة الصور المتحركة بالتناوب */}
        {CARDS_DATA.map((card, index) => {
          if (index === 0) return null;

          const start = index / CARDS_DATA.length;
          const end = (index + 1) / CARDS_DATA.length;

          const safeStartIn = Math.max(0, start - 0.05);
          const safeEndOut = Math.min(1, end - 0.05);

          const imgOpacity = useTransform(scrollYProgress, [safeStartIn, start, safeEndOut, end], [0, 1, 1, 0]);
          const blurValue = useTransform(scrollYProgress, [safeStartIn, start, safeEndOut, end], [20, 0, 0, 20]);

          const mixedFilter = useTransform(
            blurValue,
            (v) => `blur(${v}px) sepia(0.9) hue-rotate(80deg) saturate(4) brightness(0.3) contrast(1)`
          );

          return (
            <motion.img
              key={`bg-${card.id}`}
              src={card.bgImage}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
                pointerEvents: "none",
                opacity: imgOpacity,
                filter: mixedFilter
              }}
              className="bg-cards-main-img"
            />
          );
        })}

        {/* طبقة التظليل الداكنة الموحدة */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 2
        }} />

        {/* 3. حاوية الكروت الحركية */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          zIndex: 3
        }}>
          {CARDS_DATA.map((card, index) => {
            const start = index / CARDS_DATA.length;
            const end = (index + 1) / CARDS_DATA.length;

            const isFirst = index === 0;
            const isLast = index === CARDS_DATA.length - 1;

            const safeCardStart    = Math.max(0, start);
            const safeCardStartIn  = Math.max(0, start + 0.15);
            const safeCardEndOut   = Math.min(1, end - 0.15);
            const safeCardEnd      = Math.min(1, end);

            const safeCardOpacityIn  = Math.max(0, start + 0.10);
            const safeCardOpacityOut = Math.min(1, end - 0.10);

            const cardX = useTransform(
              scrollYProgress,
              [safeCardStart, safeCardStartIn, safeCardEndOut, safeCardEnd],
              [
                isFirst ? "0%" : "120%", 
                "0%", 
                "0%", 
                isLast ? "0%" : "-120%"
              ]
            );

            const cardOpacity = useTransform(
              scrollYProgress,
              [0, safeCardStart, safeCardOpacityIn, safeCardOpacityOut, safeCardEnd, 1],
              [
                isFirst ? 1 : 0,
                isFirst ? 1 : 0,
                1,
                1,
                isLast ? 1 : 0,
                isLast ? 1 : 0
              ]
            );

            const cardBlur = useTransform(
              scrollYProgress,
              [0, safeCardStart, safeCardOpacityIn, safeCardOpacityOut, safeCardEnd, 1],
              [
                isFirst ? "blur(0px)" : "blur(5px)",
                isFirst ? "blur(0px)" : "blur(5px)",
                "blur(0px)",
                "blur(0px)",
                isLast ? "blur(0px)" : "blur(5px)",
                isLast ? "blur(0px)" : "blur(5px)"
              ]
            );

            return (
              <motion.div
                key={card.id}
                style={{
                  position: "absolute",
                  x: cardX,
                  opacity: cardOpacity,
                  filter: cardBlur,
                  border: "1px solid #6AB013",
                  backgroundColor: "#69b01323",
                  backdropFilter: "blur(5px)",
                  borderRadius: "24px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  boxSizing: "border-box"
                }}
                className="responsive-card"
              >
                {/* ===== العنوان الأساسي للفرع ===== */}
                <h2 style={{
                  fontSize: "clamp(24px, 5vw, 48px)",
                  fontFamily: `var(--sans)`,
                  fontWeight: "600",
                  color: "#F4F1E8",
                  margin: "0 0 12px 0",
                  lineHeight: "1.2"
                }}>
                  {card.title}
                </h2>

                {/* ===== العنوان الفرعي / الاقتباس ===== */}
                <span style={{
                  fontSize: "clamp(11px, 2vw, 14px)",
                  fontWeight: "500",
                  fontFamily: `var(--sans)`,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#A8B89C",
                  display: "block",
                  margin: "10px 0px"
                }}>
                  {card.subtitle}
                </span>

                {/* ===== نص الوصف التفصيلي ===== */}
                <p style={{
                  fontSize: "clamp(13px, 2.5vw, 16px)",
                  color: "#A8B89C",
                  fontWeight: "500",
                  fontFamily: `var(--sans)`,
                  lineHeight: "1.6",
                  margin: "0 0 20px 0"
                }}>
                  {card.description}
                </p>

                {/* ===== المربعات الثلاثة المميزة للمنتجات ===== */}
                <div className="features-grid">
                  {card.features.map((feat, i) => (
                    <div key={i} className="feature-item">
                      {feat}
                    </div>
                  ))}
                </div>

                {/* ===== زر الشراء والإجراء ===== */}
                <button className="card-shopping-btn">
                  {t('appScroll.button')}
                  <img src="/arrowdown.png" alt="" style={{ rotate: "-90deg" }} />
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default AppScrollSection;