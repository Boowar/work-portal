import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slice/itemSlice";
import authSlice from "./slice/authSlice";

//const rootReducer = combineReducers (redusers)

//export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: {
        auth: authSlice,
        item: itemSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch