import { Link, NavLink } from "react-router-dom"
import './header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Search } from "../Search/Search"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"



const Header = () => {

    return (
        <header>
            <Link to={"/"} className="logo">foot by foot</Link>
            <div className="options">
                <a className="brands">Brands <div className="brands_img">
                    <Link to={"filter/VANS"}><img src="https://www.icoupons.co.il/wp-content/uploads/2021/02/41241-480x480.jpg" /></Link>
                    <Link to={"filter/ADIDAS"}><img src="https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg" /></Link>
                    <Link to={"filter/NIKE"}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtC3OuScEEsp0YXEjdmjC_pev9BxuBP72r8w&usqp=CAU" /></Link>
                </div></a>
                <NavLink to={"filter/kids"}>Kids</NavLink>
                <NavLink to={"filter/men"}>Men</NavLink>
                <NavLink to={"filter/women"}>Women</NavLink>
            </div>
            <div className="icons">
                <FontAwesomeIcon className="MagnifyingGlass" icon={faMagnifyingGlass} /><Search />
                <Link to={"/wish_list"}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} /></Link>
                <Link to={"/cart"}>
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} /></Link>
            </div>
            <NavLink to={"login"}>התחבר/י</NavLink>

        </header>
    )
}

export default Header