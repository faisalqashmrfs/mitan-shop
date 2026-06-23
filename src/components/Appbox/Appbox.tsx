import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react"; // 1. استيراد الـ useRef
import "./Appbox.css";

function Appbox() {
  const totalBoxes = 4;
  const containerRef = useRef(null); // 2. إنشاء مرجع للقسم

  // 3. ربط الـ useScroll بالقسم الحالي وتحديد نقطة البداية والنهاية بدقة
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ===== الصندوق الأول: 0% إلى 25% =====
  const box1Scale = useTransform(scrollYProgress, [0.12, 0.18, 0.25], [0.1, 1, 1.8]);
  const box1Opacity = useTransform(scrollYProgress, [0.10, 0.12, 0.18, 0.25, 0.27], [0, 0, 1, 1, 0]);
  const box1Y = useTransform(scrollYProgress, [0.12, 0.18, 0.25], [-20, 100, 500]);

  // ===== الصندوق الثاني: 25% إلى 50% =====
  const box2Scale = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [0.1, 1, 1.8]);
  const box2Opacity = useTransform(scrollYProgress, [0.25, 0.32, 0.50, 0.52], [0, 1, 1, 0]);
  const box2Y = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [-20, 100, 500]);

  // ===== الصندوق الثالث: 50% إلى 75% =====
  const box3Scale = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [0.1, 1, 1.8]);
  const box3Opacity = useTransform(scrollYProgress, [0.50, 0.57, 0.75, 0.77], [0, 1, 1, 0]);
  const box3Y = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [-20, 100, 500]);

  // ===== الصندوق الرابع: 75% إلى 100% =====
  const box4Scale = useTransform(scrollYProgress, [0.75, 0.85, 0.93], [0.1, 1, 1.8]);
  const box4Opacity = useTransform(scrollYProgress, [0.75, 0.80, 0.93], [0, 1, 1]);
  const box4Y = useTransform(scrollYProgress, [0.75, 0.85, 0.93], [-20, 100, 200]);

  // ==========================================
  // ✨ ميزة التوزيع المستطيلي مع تفاوت الأحجام ✨
  // ==========================================
  const iconsData = [
    { x: -550, y: -280, size: 250, finalScale: 1.2, rotation: 420 },
    { x: 0, y: -350, size: 100, finalScale: 1.4, rotation: 480 },
    { x: 550, y: -250, size: 55, finalScale: 1.1, rotation: 390 },
    { x: -600, y: 260, size: 200, finalScale: 1.5, rotation: 500 },
    { x: -300, y: 320, size: 85, finalScale: 0.8, rotation: 370 },
    { x: 300, y: 310, size: 130, finalScale: 0.7, rotation: 360 },
    { x: 580, y: 280, size: 255, finalScale: 1.3, rotation: 450 },
  ];

  const icon1Move = useTransform(scrollYProgress, [0.12, 0.18, 0.25, 0.27], [0, 1, 1.5, 2]);
  const icon1Opacity = useTransform(scrollYProgress, [0.12, 0.15, 0.23, 0.25, 0.27], [0, 1, 1, 1, 0]);

  const icon2Move = useTransform(scrollYProgress, [0.25, 0.37, 0.50, 0.52], [0, 1, 1.5, 2]);
  const icon2Opacity = useTransform(scrollYProgress, [0.25, 0.30, 0.47, 0.50, 0.52], [0, 1, 1, 1, 0]);

  const icon3Move = useTransform(scrollYProgress, [0.50, 0.62, 0.75, 0.77], [0, 1, 1.5, 2]);
  const icon3Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.72, 0.75, 0.77], [0, 1, 1, 1, 0]);

  const getRandomRotation = (baseRotation : number) => {
    return baseRotation + Math.random() * 540;
  };

  return (
    <div 
      ref={containerRef} // 4. وضع المرجع هنا ليتم حساب السكرول من بداية هذا الـ div
      id="Tunel-Section-Id" // لربطه بـ CSS Scroll Snap إذا أردت
      style={{
        height: `${totalBoxes * 100}vh`,
        position: "relative"
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--bg)",
        backgroundImage: "url('/Tunnel.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

          {/* ==================== الصندوق الأول وأيقوناته ==================== */}
          {iconsData.map((pos, i) => {
            const randomRotate = getRandomRotation(pos.rotation || 360);
            return (
              <motion.div
                key={`icon-card1-${i}`}
                style={{
                  position: "absolute",
                  width: pos.size,
                  height: pos.size,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  y: useTransform(() => box1Y.get() + (pos.y * icon1Move.get() * 0.6)),
                  x: useTransform(() => pos.x * icon1Move.get() * 1.2),
                  rotate: useTransform(
                    scrollYProgress,
                    [0.12, 0.18, 0.25, 0.27],
                    [0, randomRotate, randomRotate * 1.3, randomRotate * 1.5]
                  ),
                  opacity: icon1Opacity,
                  scale: useTransform(
                    scrollYProgress,
                    [0.12, 0.15, 0.18, 0.25, 0.27],
                    [0.1, 0.3, 1, pos.finalScale || 1, 0.3]
                  ),
                }}
              >
                <img src="/leafIcon.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </motion.div>
            );
          })}

          <motion.div
            style={{
              position: "absolute",
              width: "45%",
              height: 150,
              backgroundColor: "#6AB0131F",
              border: "2px solid #467B1E",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              scale: box1Scale,
              opacity: box1Opacity,
              y: box1Y,
              zIndex: 2,
              boxShadow: `
              0 0 30px rgba(70, 123, 30, 0.3),
              0 0 60px rgba(70, 123, 30, 0.1),
              0 10px 40px rgba(0, 0, 0, 0.2),
              inset 0px 50px 0px 75px rgba(0, 0, 0, 0.2)
            `,
            }}
          >
            <div className="box1icons">
              <img src="/Icon11.png" alt="" />
              <div>
                <span>Origin</span>
                <h3>Grown close. Served closer.</h3>
                <p>Every item traced to a farm within 150km. You know where it came from before you put it in your basket.</p>
              </div>
            </div>
          </motion.div>

          {/* ==================== الصندوق الثاني وأيقوناته ==================== */}
          {iconsData.map((pos, i) => {
            const randomRotate = getRandomRotation(pos.rotation || 360);
            return (
              <motion.div
                key={`icon-card2-${i}`}
                style={{
                  position: "absolute",
                  width: pos.size,
                  height: pos.size,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  y: useTransform(() => box2Y.get() + (pos.y * icon2Move.get() * 0.6)),
                  x: useTransform(() => pos.x * icon2Move.get() * 1.2),
                  rotate: useTransform(
                    scrollYProgress,
                    [0.25, 0.37, 0.50, 0.52],
                    [0, randomRotate, randomRotate * 1.3, randomRotate * 1.5]
                  ),
                  opacity: icon2Opacity,
                  scale: useTransform(
                    scrollYProgress,
                    [0.25, 0.28, 0.37, 0.50, 0.52],
                    [0.1, 0.3, 1, pos.finalScale || 1, 0.3]
                  ),
                }}
              >
                <img src="/Vectororang.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </motion.div>
            );
          })}

          <motion.div
            style={{
              position: "absolute",
              width: "50%",
              height: 200,
              backgroundColor: "#f9741636",
              border: "2px solid #F97316",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              scale: box2Scale,
              opacity: box2Opacity,
              y: box2Y,
              zIndex: 2,
              boxShadow: `
              0 0 30px rgba(123, 80, 30, 0.3),
              0 0 60px rgba(123, 80, 30, 0.1),
              0 10px 40px rgba(0, 0, 0, 0.2),
              inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)
            `,
            }}
          >
            <div className="box2icons">
              <img src="/harvest-Icon.png" alt="" />
              <div>
                <span>Freshness</span>
                <h3>Harvested at dawn. On the shelf by morning.</h3>
                <p>Our supply chain runs overnight so nothing sits in a warehouse. What arrives today was still in the ground yesterday.</p>
              </div>
            </div>
          </motion.div>

          {/* ==================== الصندوق الثالث وأيقوناته ==================== */}
          {iconsData.map((pos, i) => {
            const randomRotate = getRandomRotation(pos.rotation || 360);
            return (
              <motion.div
                key={`icon-card3-${i}`}
                style={{
                  position: "absolute",
                  width: pos.size,
                  height: pos.size,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  y: useTransform(() => box3Y.get() + (pos.y * icon3Move.get() * 0.6)),
                  x: useTransform(() => pos.x * icon3Move.get() * 1.2),
                  rotate: useTransform(
                    scrollYProgress,
                    [0.50, 0.62, 0.75, 0.77],
                    [0, randomRotate, randomRotate * 1.3, randomRotate * 1.5]
                  ),
                  opacity: icon3Opacity,
                  scale: useTransform(
                    scrollYProgress,
                    [0.50, 0.53, 0.62, 0.75, 0.77],
                    [0.1, 0.3, 1, pos.finalScale || 1, 0.3]
                  ),
                }}
              >
                <img src="/cart2Icon.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </motion.div>
            );
          })}

          <motion.div
            style={{
              position: "absolute",
              width: "50%",
              height: 200,
              backgroundColor: "#fbe4152d",
              border: "2px solid #FBAE15",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              scale: box3Scale,
              opacity: box3Opacity,
              y: box3Y,
              zIndex: 2,
              boxShadow: `
              0 0 30px rgba(123, 109, 30, 0.3),
              0 0 60px rgba(123, 109, 30, 0.1),
              0 10px 40px rgba(0, 0, 0, 0.2),
              inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)
            `,
            }}
          >
            <div className="box3icons">
              <img src="/shop-Icon.png" alt="" />
              <div>
                <span>Experience</span>
                <h3>A shop that knows your neighborhood.</h3>
                <p>Every branch is stocked differently — based on what the people in that city actually eat. Local staff, local knowledge, local produce. Not a chain. A neighbor.</p>
              </div>
            </div>
          </motion.div>

          {/* ==================== الصندوق الرابع (بدون أيقونات) ==================== */}
          <motion.div
            style={{
              position: "absolute",
              width: "50%",
              height: 200,
              backgroundColor: "#04407242",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              scale: box4Scale,
              opacity: box4Opacity,
              y: box4Y,
              zIndex: 2,
              boxShadow: `
              0 0 30px rgba(32, 30, 123, 0.11),
              0 0 60px rgba(33, 32, 126, 0.01),
              0 10px 40px rgba(0, 0, 0, 0.12),
              inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)
            `,
            }}
          >
            <div className="box4icons">
              <img src="/standard- Icon.png" alt="" />
              <div>
                <span>Standard</span>
                <h3>One rule across every branch. If it isn't right, it isn't here.</h3>
                <p>We turn down more produce than we accept. Every item passes a single standard — not a grading scale, not a flexible policy. One standard. The right one. Across every city we operate in, no exceptions.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Appbox;