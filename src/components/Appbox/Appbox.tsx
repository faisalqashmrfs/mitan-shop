import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react"; // أضف useState و useEffect
import "./Appbox.css";

function Appbox() {
  const totalBoxes = 7;
  const containerRef = useRef(null);

  // ============================================================
  // 1. جلب عرض الشاشة لتعديل القيم ديناميكياً
  // ============================================================
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // دالة مساعدة لحساب الحجم بناءً على العرض (لتكون مرنة)
  const getResponsiveSize = (baseSize: number) => {
    if (windowWidth < 480) return baseSize * 0.3;  // جوال صغير
    if (windowWidth < 768) return baseSize * 0.4;  // جوال
    if (windowWidth < 1024) return baseSize * 0.6; // تابلت
    return baseSize; // ديسكتوب
  };

  // دالة لتعديل الإحداثيات (X, Y) لتتناسب مع الشاشة
  const getResponsivePosition = (value: number) => {
    if (windowWidth < 768) return value * 0.3; // تصغير المسافات على الجوال
    if (windowWidth < 1024) return value * 0.6;
    return value;
  };

  // ============================================================
  // 2. تحديث بيانات الأيقونات (Icons Data) لتكون متجاوبة
  // ============================================================
  const iconsData = [
    { x: getResponsivePosition(-550), y: getResponsivePosition(-280), size: getResponsiveSize(250), finalScale: 1.2, rotation: 420 },
    { x: getResponsivePosition(0), y: getResponsivePosition(-350), size: getResponsiveSize(100), finalScale: 1.4, rotation: 480 },
    { x: getResponsivePosition(550), y: getResponsivePosition(-250), size: getResponsiveSize(55), finalScale: 1.1, rotation: 390 },
    { x: getResponsivePosition(-600), y: getResponsivePosition(260), size: getResponsiveSize(200), finalScale: 1.5, rotation: 500 },
    { x: getResponsivePosition(-300), y: getResponsivePosition(320), size: getResponsiveSize(85), finalScale: 0.8, rotation: 370 },
    { x: getResponsivePosition(300), y: getResponsivePosition(310), size: getResponsiveSize(130), finalScale: 0.7, rotation: 360 },
    { x: getResponsivePosition(580), y: getResponsivePosition(280), size: getResponsiveSize(255), finalScale: 1.3, rotation: 450 },
  ];

  // ============================================================
  // 3. جعل حجم الصناديق (Boxes) متجاوباً
  // ============================================================
  const getBoxWidth = () => {
    if (windowWidth < 480) return "85%";
    if (windowWidth < 768) return "80%";
    if (windowWidth < 1024) return "60%";
    return "45%"; // القيمة الأصلية لأول صندوق
  };

const getBoxHeight = () => {
  if (windowWidth < 480) return 180;  // كانت 120
  if (windowWidth < 768) return 200;  // كانت 150
  if (windowWidth < 1024) return 230; // كانت 180
  return 250; // كانت 200 - زيادة 50px
};

  // ... (الكود المتبقي من الـ Hooks الخاصة بالـ Scroll يبقى كما هو بدون تغيير) ...
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ===== الصندوق الأول =====
  const box1Scale = useTransform(scrollYProgress, [0.12, 0.18, 0.25], [0.1, 1, 1.8]);
  const box1Opacity = useTransform(scrollYProgress, [0.10, 0.12, 0.18, 0.25, 0.27], [0, 0, 1, 1, 0]);
  const box1Y = useTransform(scrollYProgress, [0.12, 0.18, 0.25], [-20, 100, 500]);

  // ===== الصندوق الثاني =====
  const box2Scale = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [0.1, 1, 1.8]);
  const box2Opacity = useTransform(scrollYProgress, [0.25, 0.32, 0.50, 0.52], [0, 1, 1, 0]);
  const box2Y = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [-20, 100, 500]);

  // ===== الصندوق الثالث =====
  const box3Scale = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [0.1, 1, 1.8]);
  const box3Opacity = useTransform(scrollYProgress, [0.50, 0.57, 0.75, 0.77], [0, 1, 1, 0]);
  const box3Y = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [-20, 100, 500]);

  // ===== الصندوق الرابع =====
  const box4Scale = useTransform(scrollYProgress, [0.75, 0.85, 0.93], [0.1, 1, 1.8]);
  const box4Opacity = useTransform(scrollYProgress, [0.75, 0.80, 0.93], [0, 1, 1]);
  const box4Y = useTransform(scrollYProgress, [0.75, 0.85, 0.93], [-20, 100, 200]);

  // ... (الكود الخاص بحركات الأيقونات يبقى كما هو) ...
  const icon1Move = useTransform(scrollYProgress, [0.12, 0.18, 0.25, 0.27], [0, 1, 1.5, 2]);
  const icon1Opacity = useTransform(scrollYProgress, [0.12, 0.15, 0.23, 0.25, 0.27], [0, 1, 1, 1, 0]);
  const icon2Move = useTransform(scrollYProgress, [0.25, 0.37, 0.50, 0.52], [0, 1, 1.5, 2]);
  const icon2Opacity = useTransform(scrollYProgress, [0.25, 0.30, 0.47, 0.50, 0.52], [0, 1, 1, 1, 0]);
  const icon3Move = useTransform(scrollYProgress, [0.50, 0.62, 0.75, 0.77], [0, 1, 1.5, 2]);
  const icon3Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.72, 0.75, 0.77], [0, 1, 1, 1, 0]);

  const getRandomRotation = (baseRotation : number) => {
    return baseRotation + Math.random() * 540;
  };

  // ============================================================
  // 4. تحديث الـ return (نفس الكود لكن مع تعديل الـ style للصناديق)
  // ============================================================
  return (
    <div 
      ref={containerRef}
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

          {/* ===== الصندوق الأول ===== */}
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

          {/* صندوق رقم 1 - تم تعديل الـ width والـ height هنا */}
          <motion.div
            style={{
              position: "absolute",
              width: getBoxWidth(),    // <-- أصبح متجاوباً
              height: getBoxHeight(),  // <-- أصبح متجاوباً
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
              boxShadow: `0 0 30px rgba(70, 123, 30, 0.3),
                  0 0 60px rgba(70, 123, 30, 0.1),
                  0 10px 40px rgba(0, 0, 0, 0.2),
                 inset 0px 50px 790px 75px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <div className="box1icons">
              <img src="/Icon11.png" alt=""  style={{width : "96px" , height : "96px"}}/>
              <div>
                <span>Origin</span>
                <h3>Grown close. Served closer.</h3>
                <p>Every item traced to a farm within 150km. You know where it came from before you put it in your basket.</p>
              </div>
            </div>
          </motion.div>

          {/* ===== الصندوق الثاني ===== */}
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
              width: getBoxWidth(),    // <-- متجاوب
              height: getBoxHeight(),  // <-- متجاوب
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
              boxShadow: `0 0 30px rgba(123, 80, 30, 0.3), 0 0 60px rgba(123, 80, 30, 0.1), 0 10px 40px rgba(0, 0, 0, 0.2), inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <div className="box2icons">
              <img src="/harvest-Icon.png" alt=""  style={{width : "96px" , height : "96px"}}/>
              <div>
                <span>Freshness</span>
                <h3>Harvested at dawn. On the shelf by morning.</h3>
                <p>Our supply chain runs overnight so nothing sits in a warehouse. What arrives today was still in the ground yesterday.</p>
              </div>
            </div>
          </motion.div>

          {/* ===== الصندوق الثالث ===== */}
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
              width: getBoxWidth(),
              height: getBoxHeight(),
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
              boxShadow: `0 0 30px rgba(123, 109, 30, 0.3), 0 0 60px rgba(123, 109, 30, 0.1), 0 10px 40px rgba(0, 0, 0, 0.2), inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <div className="box3icons">
              <img src="/shop-Icon.png" alt=""  style={{width : "96px" , height : "96px"}}/>
              <div>
                <span>Experience</span>
                <h3>A shop that knows your neighborhood.</h3>
                <p>Every branch is stocked differently — based on what the people in that city actually eat. Local staff, local knowledge, local produce. Not a chain. A neighbor.</p>
              </div>
            </div>
          </motion.div>

          {/* ===== الصندوق الرابع ===== */}
          <motion.div
            style={{
              position: "absolute",
              width: getBoxWidth(),
              height: getBoxHeight(),
              backgroundColor: "#04407242",
              border : "2px solid #054980",
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
              boxShadow: `0 0 30px rgba(32, 30, 123, 0.11), 0 0 60px rgba(33, 32, 126, 0.01), 0 10px 40px rgba(0, 0, 0, 0.12), inset 0px 0px 100px 75px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <div className="box4icons">
              <img src="/standard- Icon.png" alt="" style={{width : "96px" , height : "96px"}}/>
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