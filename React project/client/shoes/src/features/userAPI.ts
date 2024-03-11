import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserApi = createAsyncThunk('get-user', async () => {
    try {
        const { data } = await axios.get('')
        if (!data) throw new Error("no data on function getUserApi")
        return data
    } catch (error) {
        console.error(error)
    }
}) 
