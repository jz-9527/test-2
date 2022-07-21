import { configureStore } from "@reduxjs/toolkit";
import counterSilce from "./counterSilce";

export const store = configureStore({
    reducer:{
        counter:counterSilce
    }
})

