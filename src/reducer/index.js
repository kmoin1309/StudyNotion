import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileSlice,
  cart: cartSlice,
});
export default rootReducer