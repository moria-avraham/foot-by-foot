import axios from "axios";


export const getAllUser = async () => {
    try {
        const { data } = await axios.get(`api/users/get-all-users`)
        if (data) return data.results;
        else return;
    } catch (error) {
        console.error(error);
    }
}

export const getLoginUser = async () => {
    try {
        return await axios.get(`api/users/get-from-Token`)

    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (userEmail: string, password: string, fullName: string, phoneNumber: number) => {
    try {
        if (!userEmail || !password || !fullName || !phoneNumber) throw new Error("Not enough data for createUser function");

        return await axios.post("api/users/register", { userEmail, password, fullName, phoneNumber })
    } catch (error) {
        console.error(error);
    }
}


export const loginUser = async (email: string, password: string) => {
    try {
        if (!email || !password) throw new Error("Not enough data for login function");
        const response = await axios.post("api/users/logIn", { email, password })
        return response.data;
    } catch (error) {
        console.error("Error fetching data from the API", error);
        return error;
    }
}

export const deleteUser = async (userID: number) => {
    try {
        if (!userID) throw new Error("Not enough data for deleteProcuct function");
        const response = await axios.delete(`/api/users/delete-user/${userID}`
        );
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export const updateUserBYID = async (userName: string, userEmeil: string, userPhone: number, userRole: string, userID: number) => {
    try {
        if (!userName || !userEmeil || !userPhone || !userRole || !userID) throw new Error("Not enough data for updateUserBYID function");
        return await axios.patch(`api/users/update-user/${userID}`, { userName, userEmeil, userPhone, userRole })

    } catch (error) {
        console.error("Error fetching data from the API", error);
        return error;
        ;
    }
}