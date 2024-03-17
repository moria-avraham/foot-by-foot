
interface ShoeCardProps {
    productID: number,
    img: string,
    productName: string,
    price: number
}
type shoe = {
    productName: string,
    productDescription: string,
    imges: [],
    price: number,
    img: string

}

type product = {
    product_id: number,
    company: string,
    price: string,
    consumer: string,
    description: string,
    product_name: string
    left_shoe: string,
    right_shoe: string,
    together: string,
    back: string,

}
type productProps = {
    product: product,
    // sizes: []

}

type user = {
    user_id: number,
    user_full_name: string,
    user_email: string,
    user_phone: number,
    role: string
}

type UserProps = {
    user: user
}