import { useState, useEffect, useRef, useCallback } from "react";
import "./VerticalProgress.css";

function VerticalProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const animationRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // حساب القسم الحالي (كل 100vh)
    const currentSectionIndex = Math.floor(scrollY / windowHeight);

    // حساب التقدم داخل القسم (0 إلى 1)
    const sectionProgress = (scrollY % windowHeight) / windowHeight;

    // تحديث الحالة
    setCurrentSection(currentSectionIndex);
    setProgress(sectionProgress);

    // استمرار الحلقة
    animationRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    // بدء الحلقة
    animationRef.current = requestAnimationFrame(updateProgress);

    // تنظيف
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateProgress]);

  const startNumber = currentSection;
  const endNumber = currentSection + 1;

  return (
    <div className="vertical-progress-containermain">
      <p className="VerticalProgress">Integrity in every aisle.</p>
      <div className="vertical-progress-container">
        <div className="progress-number start">{ startNumber < 10 ? 0 : ""}{startNumber + 1}</div>

        <div className="progress-track">
          {/* شريط التقدم - يمتلئ من الأعلى للأسفل */}
          <div
            className="progress-fill"
            style={{ height: `${progress * 100}%` }} /* من 0% إلى 100% من الأعلى */
          />
          {/* المقبض ثابت في الأعلى */}
          <div className="progress-thumb" />
        </div>

        <div className="progress-number end">
          {/* {endNumber} */}10
        </div>
      </div>
    </div>
  );
}

export default VerticalProgress;