import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import "./AppScrollSection.css";

// 1. مصفوفة البيانات باللغة الإنجليزية
const CARDS_DATA = [
  {
    id: 1,
    title: "Damascus",
    subtitle: "“ The oldest living city. Our finest branch. ”",
    description: "Our flagship. Damascus demanded the full expression of everything Mitan Shop stands for — the widest range, the deepest local sourcing, and the most refined in-store experience. The Ghouta orchards, the Anti-Lebanon mountain herbs, the Damascene rose water. All here.",
    features: ["Flagship branch", "Ghouta orchards", "Mountain herbs"],
    bgImage: "/BGapp1.png"
  },
  {
    id: 2,
    title: "Aleppo",
    subtitle: "“ Where Syrian cuisine was born. ”",
    description: "The oldest food city in Syria. Our Aleppo branch honours that heritage — stocked with the spices, legumes, and stone-fruit that have defined northern Syrian cooking for centuries. Every item chosen with the Aleppan kitchen in mind.",
    features: ["Northern Syria", "Heritage produce", "Spice-forward range"],
    bgImage: "/BGapp2.png"
  },
  {
    id: 3,
    title: "Al-Hasaka",
    subtitle: "“ Where the Jazira feeds the nation. ”",
    description: "Al-Hasaka sits in the heart of the Jazira — Syria's most fertile agricultural region. This branch carries the breadth of that land: lentils, cotton-seed oils, fresh greens, and grains that travel no more than 30km from field to shelf.",
    features: ["Al-Jazira region", "Lentils & grains", "30km farm radius"],
    bgImage: "/BGapp3.png"
  },
  {
    id: 4,
    title: "Homs",
    subtitle: "“ Syria's heartland, on your shelf.  ”",
    description: "Sitting at the crossroads of Syria, Homs draws from the fertile plains of the Orontes Valley. Our Homs branch is built around what grows here — wheat, olives, dairy, and vegetables from some of the most productive farmland in the country.",
    features: ["Central Syria", "Orontes Valley farms", "Dairy & grain focus"],
    bgImage: "/BGapp4.png"
  }
];

function AppScrollSection() {
  const containerRef = useRef(null);

  // حساب الارتفاع الإجمالي ديناميكياً
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
      {/* الحاوية الثابتة في الشاشة أثناء التمرير */}
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

        {/* 2. طبقة الصور الخلفية - تم إرجاعها كـ motion.img ودمج الفلاتر */}
        {CARDS_DATA.map((card, index) => {
          const start = index / CARDS_DATA.length;
          const end = (index + 1) / CARDS_DATA.length;

          const safeStartIn = Math.max(0, start - 0.05);
          const safeEndOut = Math.max(0, end - 0.05);

          const imgOpacity = useTransform(scrollYProgress, [safeStartIn, start, safeEndOut, end], [0, 1, 1, 0]);

          // هنا نقوم بتحريك قيمة البكسل للبلور فقط ديناميكياً
          const blurValue = useTransform(scrollYProgress, [safeStartIn, start, safeEndOut, end], [20, 0, 0, 20]);

          // دمج فلاتر الألوان الخاصة بك مع قيمة الـ blur المتغيرة عبر السكرول في سطر واحد
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
                zIndex: 0,
                pointerEvents: "none",
                opacity: imgOpacity,      // إعادة تفعيل التلاشي بالتمرير
                filter: mixedFilter       // تطبيق الفلتر المدمج الذكي
              }}
              className="bg-cards-main-img"
            />
          );
        })}

        {/* طبقة تظليل داكنة لرفع تباين وقرائية نصوص الكروت */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1
        }} />

        {/* 3. حاوية الكروت الحركية المستجيبة */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          zIndex: 2
        }}>
          {CARDS_DATA.map((card, index) => {
            const start = index / CARDS_DATA.length;
            const end = (index + 1) / CARDS_DATA.length;

            const safeCardStart = Math.max(0, start);
            const safeCardStartIn = Math.max(0, start + 0.15);
            const safeCardEndOut = Math.max(0, end - 0.15);
            const safeCardEnd = Math.max(0, end);

            const safeCardOpacityIn = Math.max(0, start + 0.10);
            const safeCardOpacityOut = Math.max(0, end - 0.10);

            const cardX = useTransform(scrollYProgress, [safeCardStart, safeCardStartIn, safeCardEndOut, safeCardEnd], ["120%", "0%", "0%", "-120%"]);
            const cardOpacity = useTransform(scrollYProgress, [safeCardStart, safeCardOpacityIn, safeCardOpacityOut, safeCardEnd], [0, 1, 1, 0]);
            const cardBlur = useTransform(scrollYProgress, [safeCardStart, safeCardOpacityIn, safeCardOpacityOut, safeCardEnd], ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]);

            return (
              <motion.div
                key={card.id}
                style={{
                  position: "absolute",
                  x: cardX,
                  opacity: cardOpacity,
                  filter: cardBlur,
                  width: "800px",
                  border: "1px solid #6AB013",
                  backgroundColor: "#69b01323",
                  backdropFilter: "blur(5px)",
                  borderRadius: "24px",
                  padding: "40px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  boxSizing: "border-box"
                }}
              >


                {/* العنوان الأساسي */}
                <h2 style={{
                  fontSize: "clamp(16px, 4vw, 48px)",
                  fontFamily: `var(--sans)`,
                  fontWeight: "600",
                  color: "#F4F1E8",
                  margin: "0 0 16px 0",
                  lineHeight: "1.2"
                }}>
                  {card.title}
                </h2>

                {/* العنوان الفرعي */}
                <span style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: `var(--sans)`,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#A8B89C",
                  display: "block",
                  margin: "15px 0px"
                }}>
                  {card.subtitle}
                </span>


                {/* الوصف */}
                <p style={{
                  fontSize: "16px",
                  color: "#A8B89C",
                  fontWeight: "500",
                  fontFamily: `var(--sans)`,
                  lineHeight: "1.6",
                  margin: "0 0 30px 0"
                }}>
                  {card.description}
                </p>

                {/* المربعات الثلاثة */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "12px"
                }}>
                  {card.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 14px",
                        border: "1px solid #6AB013",
                        backgroundColor: "#69b01323",
                        borderRadius: "12px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#A8B89C",
                        textAlign: "center",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                    >
                      {feat}
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    padding: "15px 34px",
                    border: "1px solid #A8B89C",
                    backgroundColor: "#A8B89C",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: "600",
                    width : "300px",
                    color: "#0E1A12",
                    textAlign: "center",
                    margin : "30px 0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    display : "flex",
                    justifyContent : "center" ,
                    gap: "20px"
                  }}
                >
                  Start Shopping
                  <img src="/arrowdown.png" alt="" 
                  style={
                    {
                      rotate : "-90deg"
                    }
                  }
                  />
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