import { NavLink } from "react-router-dom"
import './header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Search } from "../Search/Search"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"



const Header = () => {

    return (
        <header>
            <button >Brands</button>
            <NavLink to={"filter/kids"}>Kids</NavLink>
            <NavLink to={"filter/men"}>Men</NavLink>
            <NavLink to={"filter/women"}>Women</NavLink>
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "white" }} /><Search />
                <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} />
                <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} />
            </div>
            <NavLink to={"login"}>התחבר/י</NavLink>

        </header>
    )
}

export default Header