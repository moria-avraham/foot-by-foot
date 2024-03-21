import axios from "axios";

export const getRightShoe = async () => {
    try {
        const { data } = await axios.get("api/product/get-right-shoe")
        return data.results;
    } catch (error) {
        console.error(error);
    }
}
export const getAllProduct = async () => {
    try {
        const { data } = await axios.get("api/product/get-all-prodct")
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

export const getProductById = async (id: number) => {
    try {
        if (!id) throw new Error("Not id in getProductById ");

        const response = await axios.get(`api/product/get-Product/${id}`
        );
        return response.data.results;

    } catch (error) {
        console.error(error);
    }
}
export const getProductSize = async (id: number) => {
    try {
        if (!id) throw new Error("Not id in getProductById ");

        const response = await axios.get(`api/product/get-size/${id}`
        );
        return response.data.results;

    } catch (error) {
        console.error(error);
    }
}
export const getFilterProduct = async (filter: string) => {
    try {
        if (!filter) throw new Error("Not filter in getFilterProduct ");

        const response = await axios.get(`/api/product/get-Product-filter/${filter}`
        );
        return response.data.results;

    } catch (error) {
        console.error(error);
    }
}

export const createNewProduct = async (company: string, price: number, consumer: string, name: string, description: string, right: string, left: string, together: string, back: string) => {
    try {
        if (!company || !price || !consumer || !name || !description || !right || !left || !together || !back) throw new Error("Not enough data for createNewProduct");

        return await axios.post("api/product/create-product", {
            company, price, consumer, name, description, right, left, together, back
        })
    } catch (error) {
        console.error(error)
    }
}

export const deleteProcuct = async (productID: number) => {
    try {
        if (!productID) throw new Error("No id in deleteProcuct ");
        const response = await axios.delete(`/api/product/delete-product/${productID}`
        );
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export const updateProduct = async (company: string, price: number, consumer: string, name: string, description: string, right: string, left: string, together: string, back: string, productID: number) => {
    try {
        if (!company || !price || !consumer || !name || !description || !right || !left || !together || !back || !productID) {
            throw new Error("Not enough data for log in");
        }
        return await axios.patch(`api/product/update-product/${productID}`, { company, price, consumer, name, description, right, left, together, back })

    } catch (error) {
        console.error("Error fetching data from the API", error);
        return error;
    }
}


export const SearchProduct = async (search: string) => {
    try {
        if (!search) throw new Error("Not enough data for createNewProduct");
        const response = await axios.get(`/api/product/get-search/${search}`
        );
        return response.data.results;
    } catch (error) {
        console.error(error)
    }
}

export const getUserCart = async (userID: number) => {
    try {
        if (!userID) throw new Error("Not id for getUserCart");
        const response = await axios.get(`/api/product/get-Product-Cart/${userID}`
        );
        return response.data.results;
    } catch (error) {
        console.error(error)
    }
}


export const deleteFromCart = async (cartID: number) => {
    try {
        if (!cartID) throw new Error("No id in deleteFromCart ");
        const response = await axios.delete(`/api/product/delete-from-cart/${cartID}`
        );
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export const getWishListProduct = async (userID: number) => {
    try {
        const { data } = await axios.get(`api/product/get-wish-list/${userID}`)
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

export const addToWishList = async (productID: number, userID: number) => {
    try {
        return await axios.post("api/product/add-wish-list", { productID, userID })
    } catch (error) {
        console.error(error);
    }
}


export const deleteWishList = async (wishListID: number) => {
    try {
        if (!wishListID) throw new Error("No id  ");
        const response = await axios.delete(`/api/product/delete-from-wish_list/${wishListID}`
        );
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export const addToCart = async (productID: number, userID: number, size: number) => {
    try {
        if (!productID || !userID || !size) throw new Error("No id  ");
        return await axios.post(`api/product/create-cart`, { productID, userID, size })

    } catch (error) {
        console.error(error)
    }
}

export const payment = async (pricee: number, token: any) => {
    try {

        return await axios.post(`api/product/payment`, { pricee, token })

    } catch (error) {
        console.error(error)
    }
}
