import './Branches.css';

export default function Branches() {
  return (
    <div className="Branches">
      <div>
        <span className='titlesm'>Our branches</span>
        <h2 className='titlelg'><p>Four cities.</p>
          <span>One standard.</span></h2>
        <p className='maindescription'>From Damascus to Al-Hasaka the same shelf, the same care.</p>
        <p className='supdescription'>Mitan Shop was built for Syria. Not as a concept, not as a trial — as a commitment to the people, the farmers, and the kitchens of four of its most distinct cities. Every branch is its own place, stocked by people who live there, sourced from land nearby. But walk into any one of them and you will feel the same thing: this shop was made for me.</p>
      </div>
      <div className="cardsdat">
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>04</span>
          </div>
          <p>City branches</p>
        </div>
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>200</span>
          </div>
          <p>Local farm partners</p>
        </div>
        <div className="cardat">
          <div>
            <img src="/Vector+.png" alt="" />
            <span>04</span>
          </div>
          <p>Quality standard</p>
        </div>
      </div>
      <p className='paragrafelast'>“Every city in Syria has its own rhythm, its own produce, its own way of eating. We didn't try to change that. We built around it.”</p>
      <img className="Branches-bg" src="/BGmarkit.jpg" alt="Hero Background" />
    </div>
  )
}
