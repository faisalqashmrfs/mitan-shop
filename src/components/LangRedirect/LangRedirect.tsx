import { useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LangRedirect() {
  const { lng } = useParams<{ lng: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const supportedLanguages = ['en', 'ar'];

    // 1. إذا لم تكن هناك لغة في الرابط أو لغة غير مدعومة، حوله للغة المكتشفة تلقائياً
    if (!lng || !supportedLanguages.includes(lng)) {
      const detectedLng = i18n.language.split('-')[0] || 'en';
      const targetLng = supportedLanguages.includes(detectedLng) ? detectedLng : 'en';
      navigate(`/${targetLng}`, { replace: true });
    } 
    // 2. إذا كانت اللغة في الرابط صحيحة ولكنها تختلف عن لغة i18next الحالية، قم بتحديث المكتبة
    else if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
    }
  }, [lng, navigate, i18n]);

  // إذا كان المسار يحتوي على لغة مدعومة، اعرض المحتوى
  return <Outlet />;
}