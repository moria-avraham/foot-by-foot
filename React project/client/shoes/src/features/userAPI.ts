import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserApi = createAsyncThunk('get-user', async (_, thunkApi) => {
    try {
        const { data } = await axios.get('/api/users/get-from-Token')
        if (!data) throw new Error("no data on function getUserApi")
        // if (!data.user || !data.user.email) {
        //     const result = {
        //         user_id: 0,
        //         user_full_name: "",
        //         user_email: "",
        //         user_phone: 0,
        //         role: ""
        //     }
        //     return result;
        // } else {

        return data.user
        // }
    } catch (error: any) {
        console.error(error);
        return thunkApi.rejectWithValue({
            error: error.message,
            message: error.message,
        });
    }
}) 
