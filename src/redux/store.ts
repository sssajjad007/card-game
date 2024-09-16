import {configureStore} from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';

import {setupListeners} from '@reduxjs/toolkit/query';
import {cardApi} from './slices/cardApi';
import leaderboardSlice from './slices/leaderboardSlice';

const store = configureStore({
  reducer: {
    leaderboard: leaderboardSlice,
    [cardApi.reducerPath]: cardApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cardApi.middleware),
});

setupListeners(store.dispatch);

const {dispatch} = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {store, dispatch, useSelector, useDispatch};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
