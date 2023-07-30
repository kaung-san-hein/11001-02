import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import teamReducer from "./reducers/team";

const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
  },
});

export default store;
