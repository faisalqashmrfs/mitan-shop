import { useTranslation } from 'react-i18next';
import './Branches.css';

export default function Branches() {
  const { t } = useTranslation();

  return (
    <div className="Branches">
      <div>
        {/* ===== النصوص الديناميكية ===== */}
        <span className='titlesm'>{t('branches.tag')}</span>
        <h2 className='titlelg'>
          <p>{t('branches.title')}</p>
          <span>{t('branches.titleHighlight')}</span>
        </h2>
        <p className='maindescription'>{t('branches.mainDescription')}</p>
        <p className='supdescription'>{t('branches.supDescription')}</p>
      </div>
      
      <div className="cardsdat">
        {/* ===== البطاقة الأولى ===== */}
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>04</span>
          </div>
          <p>{t('branches.cards.branches')}</p>
        </div>
        
        {/* ===== البطاقة الثانية ===== */}
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>200</span>
          </div>
          <p>{t('branches.cards.farmers')}</p>
        </div>
        
        {/* ===== البطاقة الثالثة ===== */}
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>04</span>
          </div>
          <p>{t('branches.cards.standard')}</p>
        </div>
      </div>
      
      {/* ===== الاقتباس ===== */}
      <p className='paragrafelast'>“{t('branches.quote')}”</p>
      
      <img className="Branches-bg" src="/BGmarkit.jpg" alt="Hero Background" />
    </div>
  );
}