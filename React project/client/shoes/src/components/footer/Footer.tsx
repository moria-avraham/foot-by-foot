import { Link } from "react-router-dom"
import './Footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="DREAM_CARD">
                <h2>DREAM CARD</h2>
                <Link to={"https://www.dreamcard.co.il/benefits/join_new"}> ?איך מצטרפים</Link>
                <Link to={"https://www.footlocker.co.il/content-page/benefits_dreamcard"}>DREAM CARD הטבות מועדון </Link>
                <Link to={"https://www.footlocker.co.il/content-page/help-dc-vip"}>DREAM CARD VIP </Link>
            </div>
            <div className="about">
                <h2>אודות</h2>
                <Link to={"about"}>אודות</Link>
                <Link to={"terms"}>תקנון</Link>
                <Link to={"terms_of_use"}>תנאי שימוש <br /> ומדיניות פרטיות</Link>
            </div>
            <div className="CustomerService">
                <h2>שירות לקוחות</h2>
                <Link to={"https://www.footlocker.co.il/contact"}>שירות לקוחות</Link>
                <Link to={"https://www.footlocker.co.il/branches"}>חנויות הרשת</Link>
                <Link to={"https://www.footlocker.co.il/question"}>שאלות ותשובות</Link>
            </div>
            <div className="Brands">
                <h2>מותגים</h2>
                <Link to={"filter/NIKE"}> NIKE</Link>
                <Link to={"filter/ADIDAS"}>ADIDAS</Link>
                <Link to={"filter/VANS"}>VANS </Link>
            </div>
        </footer>
    )
}

export default Footer