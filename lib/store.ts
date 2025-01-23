import { configureStore} from "@reduxjs/toolkit";
import hrUserReducer from './features/hrUser/hrUserSlice';
import candidateReducer from './features/candidate/candidateSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            hrUser: hrUserReducer,
            candidate: candidateReducer,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];