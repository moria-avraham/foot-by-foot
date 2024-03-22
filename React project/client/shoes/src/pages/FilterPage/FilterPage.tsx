import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getFilterProduct } from '../../API/productApi';
import ShoesGallery from '../../components/shoesGallery/ShoesGallery';
import "./FilterPage.scss"

const FilterPage = () => {
    const [filtered, setFiltered] = useState<ShoeProps[]>()
    const { filter } = useParams();
    const handleClick = async (filter: string | undefined) => {
        try {
            if (filter) {
                const data = await getFilterProduct(filter)
                setFiltered(data)

            }

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => { handleClick(filter) }, [filter]);
    return (
        <div className='filter'>
            {filtered?.map((filter) => <ShoesGallery productID={filter.product_id} img={filter.right_shoe} productName={filter.product_name
            } price={filter.price} />)}
        </div>
    )
}

export default FilterPage