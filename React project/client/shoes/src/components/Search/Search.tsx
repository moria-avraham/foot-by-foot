import { useEffect, useState } from "react"
import { SearchProduct } from "../../API/productApi"
import "./Search.scss"
import { Link } from "react-router-dom"

export const Search = () => {

    const [search, setSearch] = useState("")
    const [filterSearch, setFiltersearch] = useState<Product[]>()

    const AllProduct = async () => {
        try {
            const data = await SearchProduct(search)
            setFiltersearch(data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        const req = setTimeout(AllProduct, 3000)
        return () => clearTimeout(req)
    }, [search])




    return (
        <div ><input className="input_search" type="text" placeholder='Search' onInput={(ev) => setSearch((ev.target as HTMLInputElement).value)} />
            {filterSearch ? <div className="search">{filterSearch.map((filter) => <Link to={`/${filter.product_id}`} key={filter.product_id} className="search_info">
                <div>
                    <p>{filter.product_name}</p>
                    <p>₪{filter.price}</p>
                </div>
                <img src={filter.right_shoe} />
            </Link>)}</div> : null}
        </div>
    )
}
export default Search