
interface ShoeProps {
    product_id: number,
    right_shoe: string,
    product_name: string,
    price: number,
    amount?: number,
    id?: number
}
type ShoeCardProps = {
    productName: string,
    productDescription?: string,
    productID: number,
    price: number,
    img: string

}

type Product = {
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
type ProductProps = {
    product: Product,

}

type User = {
    user_id: number,
    user_full_name: string,
    user_email: string,
    user_phone: number,
    role: string
}

type UserProps = {
    user: User
}


type Cart = {
    cart_id: number,
    price: number,
    amount: number,
    size: number,
    product_name: string,
    right_shoe: string
}
type CartProps = {
    cart: Cart[]
}

type Size = {
    size: number
}