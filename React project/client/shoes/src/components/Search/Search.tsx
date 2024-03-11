import { useEffect, useState } from "react"
import { SearchProduct } from "../../API/productApi"

export const Search = () => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState([])
    const [filterSearch, setFiltersearch] = useState([])

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
        <div><input type="text" placeholder='Search' onInput={(ev) => setSearch((ev.target as HTMLInputElement).value)} />
            {filterSearch ? <div className="search">{filterSearch.map((filter) => filter.back)}</div> : null}
        </div>
    )
}
