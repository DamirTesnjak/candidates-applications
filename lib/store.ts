import { configureStore} from "@reduxjs/toolkit";
import hrUserReducer from './features/hrUser/hrUserSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            hrUser: hrUserReducer,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];