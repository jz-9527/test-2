import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userName:"",
}

export const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.userName = action.payload;
        },
        unlogin:(state)=>{
            state.userName = "";
        }
    },
})
export const { login , unlogin } = counterSlice.actions;

export default counterSlice.reducer