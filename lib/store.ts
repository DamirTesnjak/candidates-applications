import { configureStore } from '@reduxjs/toolkit';
import hrUserReducer from './features/hrUser/hrUserSlice';
import candidateReducer from './features/candidate/candidateSlice';
import tutorialDataReducer from './features/tutorialData/tutorialDataSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      hrUser: hrUserReducer,
      candidate: candidateReducer,
      tutorialData: tutorialDataReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
