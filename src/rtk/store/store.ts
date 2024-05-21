import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import doctorSlice from "../slices/doctorSlice";
import adminSlice from "../slices/adminSlice";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    whitelist: ["user", "admin", "doctor"],
    storage,
}

const reducer = combineReducers({
    user: userSlice,
    doctor: doctorSlice,
    admin: adminSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
    reducer: {
        persisted: persistedReducer
    },
});

const persistor = persistStore(Store);

export { Store, persistor };