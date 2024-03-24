import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@reduxjs/toolkit/query";
import { getUserApi } from "./userAPI";

export interface userState {
    value: User
    status: 'idle' | 'loading' | 'failed'
}

const initialState: userState = {
    value: {
        user_id: 0,
        user_full_name: "",
        user_email: "",
        user_phone: 0,
        role: ""
    },
    status: 'idle'
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserApi.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload
            })
            .addCase(getUserApi.rejected, (state) => {
                state.status = 'failed'
            })
    }
})


export const userSelector = (state: RootState) => state.user.value
export const userStateSelector = (state: RootState) => state.user.status
export default userSlice.reducer;