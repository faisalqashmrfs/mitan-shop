import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import "./AppScrollSection.css";

// مصفوفة البيانات باللغة الإنجليزية لسكشن الفروع
const CARDS_DATA = [
  {
    id: 1,
    title: "Damascus",
    subtitle: "“ The oldest living city. Our finest branch. ”",
    description: "Our flagship. Damascus demanded the full expression of everything Mitan Shop stands for — the widest range, the deepest local sourcing, and the most refined in-store experience. The Ghouta orchards, the Anti-Lebanon mountain herbs, the Damascene rose water. All here.",
    features: ["Flagship branch", "Ghouta orchards", "Mountain herbs"],
    bgImage: "/BGapp1.jpg"
  },
  {
    id: 2,
    title: "Aleppo",
    subtitle: "“ Where Syrian cuisine was born. ”",
    description: "The oldest food city in Syria. Our Aleppo branch honours that heritage — stocked with the spices, legumes, and stone-fruit that have defined northern Syrian cooking for centuries. Every item chosen with the Aleppan kitchen in mind.",
    features: ["Northern Syria", "Heritage produce", "Spice-forward range"],
    bgImage: "/BGapp2.jpg"
  },
  {
    id: 3,
    title: "Al-Hasaka",
    subtitle: "“ Where the Jazira feeds the nation. ”",
    description: "Al-Hasaka sits in the heart of the Jazira — Syria's most fertile agricultural region. This branch carries the breadth of that land: lentils, cotton-seed oils, fresh greens, and grains that travel no more than 30km from field to shelf.",
    features: ["Al-Jazira region", "Lentils & grains", "30km farm radius"],
    bgImage: "/BGapp3.jpg"
  },
  {
    id: 4,
    title: "Homs",
    subtitle: "“ Syria's heartland, on your shelf.  ”",
    description: "Sitting at the crossroads of Syria, Homs draws from the fertile plains of the Orontes Valley. Our Homs branch is built around what grows here — wheat, olives, dairy, and vegetables from some of the most productive farmland in the country.",
    features: ["Central Syria", "Orontes Valley farms", "Dairy & grain focus"],
    bgImage: "/BGapp4.jpg"
  }
];

function AppScrollSection() {
  const containerRef = useRef(null);

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

        {/* 1. الخلفية الثابتة الدائمة (صورة دمشق) لمنع وجود فراغ أسود في البداية والنهاية */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${CARDS_DATA[0].bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "sepia(0.9) hue-rotate(80deg) saturate(4) brightness(0.3) contrast(1)",
          zIndex: 0
        }} />

        {/* 2. طبقة الصور المتحركة بالتناوب (تبدأ من الكرت الثاني لأن الأول بالخلفية الثابتة) */}
        {CARDS_DATA.map((card, index) => {
          if (index === 0) return null; // تخطي الصورة الأولى منعاً لتضارب الأنميشن

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

        {/* طبقة التظليل الداكنة الموحدة لضمان وضوح النصوص وقراءتها */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 2
        }} />

        {/* 3. حاوية الكروت الحركية المرنة والذكية */}
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

            // تحريك المحور X: الكرت الأول يبدأ ثابتاً، والأخير يستقر ثابتاً عند نهاية التمرير
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

            // الشفافية: حماية الأطراف (0 و 1) لقطع الطريق أمام عودة ظهور الكرت الأول
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

            // التحكم في البلور (الغَبَش) التابع للكروت لحركة دخول وخروج ناعمة
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
                {/* العنوان الأساسي للفرع */}
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

                {/* العنوان الفرعي / الاقتباس */}
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

                {/* نص الوصف التفصيلي */}
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

                {/* المربعات الثلاثة المميزة للمنتجات */}
                <div className="features-grid">
                  {card.features.map((feat, i) => (
                    <div key={i} className="feature-item">
                      {feat}
                    </div>
                  ))}
                </div>

                {/* زر الشراء والإجراء */}
                <button className="card-shopping-btn">
                  Start Shopping
                  <img src="/arrowdown.png" alt="" style={{ rotate : "-90deg" }} />
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