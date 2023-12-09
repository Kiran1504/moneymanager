import authSlice from "./authSlice";
import hamStateSlice from "./hamStateSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: authSlice,
    hamState: hamStateSlice,
})

export default rootReducer;