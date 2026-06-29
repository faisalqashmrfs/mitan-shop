import './Footer.css'

export default function Footer() {
  return (
    <div className='Footer'  id="outro">
      <div className='topthanks'>
        <h3>thank you</h3>
        <h4>To reach this Far</h4>
      </div>
      <ul className='bottLinks'>
        <li><a href="">Damascus Shop</a> <a href=""><img src="/goto.png" alt="" /></a></li>
        <li><a href="">Aleppo Shop</a> <a href=""><img src="/goto.png" alt="" /></a></li>
        <li><a href="">Al-Hasaka Shop</a> <a href=""><img src="/goto.png" alt="" /></a></li>
        <li><a href="">Al-Hasaka Shop</a> <a href=""><img src="/goto.png" alt="" /></a></li>
      </ul>
      <footer className='footerdown'>
        <div className='leftfooter'>
          <span className='titlefooter'>This website Developed by Technopark team</span>
          <div className='Linksfooter'>
            <span>Terms & Condotion</span>
            <span>Privacy & Policy</span>
          </div>
          <span>© 2026 All rights reserved. Please review our terms and <br /> conditions for more information.</span>
        </div>
        <div className='rightfooter'>
          <span  className='titlefooter'>Technopark Design Studio </span>
          <span className='Linksfooter'>Instagram</span>
          <span className='Linksfooter'>Linked In</span>
          <span className='Linksfooter'>Our Website</span>
        </div>
      </footer>
      <img className="footer-bg" src="/footerBG.jpg" alt="Hero Background" />
    </div>
  )
}
