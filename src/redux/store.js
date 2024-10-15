import { configureStore } from "@reduxjs/toolkit";
import authSLice from './authSlice'

const store = configureStore({
    reducer : {
        auth : authSLice
    }
})

export default store;