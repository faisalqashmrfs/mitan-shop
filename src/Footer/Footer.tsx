import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  // مصفوفة المتاجر للروابط السريعة
  const shopLinks = [
    { key: 'damascus', id: 'damascus-shop' },
    { key: 'aleppo', id: 'aleppo-shop' },
    { key: 'alHasaka', id: 'alhasaka-shop' },
    { key: 'homs', id: 'homs-shop' }
  ];

  return (
    <div className='Footer' id="outro">
      {/* ===== قسم الشكر ===== */}
      <div className='topthanks'>
        <h3>{t('footer.thankYou')}</h3>
        <h4>{t('footer.subtitle')}</h4>
      </div>

      {/* ===== روابط المتاجر ===== */}
      <ul className='bottLinks'>
        {shopLinks.map((shop) => (
          <li key={shop.id}>
            <a href={`#${shop.id}`}>{t(`footer.shops.${shop.key}`)}</a>
            <a href={`#${shop.id}`}>
              <img src="/goto.png" alt="" />
            </a>
          </li>
        ))}
      </ul>

      {/* ===== الفوتر السفلي ===== */}
      <footer className='footerdown'>
        {/* ===== القسم الأيسر ===== */}
        <div className='leftfooter'>
          <span className='titlefooter'>{t('footer.developedBy')}</span>
          <div className='Linksfooter'>
            <span>{t('footer.terms')}</span> 
            <span> & </span>
            <span>{t('footer.privacy')}</span>
          </div>
          <span>{t('footer.rights')}</span>
        </div>

        {/* ===== القسم الأيمن ===== */}
        <div className='rightfooter'>
          <span className='titlefooter'>{t('footer.studio')}</span>
          <span className='Linksfooter'>{t('footer.instagram')}</span>
          <span className='Linksfooter'>{t('footer.linkedin')}</span>
          <span className='Linksfooter'>{t('footer.website')}</span>
        </div>
      </footer>

      {/* ===== صورة الخلفية ===== */}
      <img className="footer-bg" src="/footerBG.jpg" alt="Hero Background" />
    </div>
  );
}