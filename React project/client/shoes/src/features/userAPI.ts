import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserApi = createAsyncThunk('get-user', async (_, thunkApi) => {
    try {
        const { data } = await axios.get('/api/users/get-from-Token')
        if (!data) throw new Error("no data on function getUserApi")
        return data.user

    } catch (error: any) {
        console.error(error);
        return thunkApi.rejectWithValue({
            error: error.message,
            message: error.message,
        });
    }
}) 
