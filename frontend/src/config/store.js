import rootReducer from "../redux/reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [thunk],
});

export default store;
