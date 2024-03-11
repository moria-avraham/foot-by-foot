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