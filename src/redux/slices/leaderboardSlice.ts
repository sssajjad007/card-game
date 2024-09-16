import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dispatch, store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LeaderboardEntry, LeaderboardState} from './types';

const initialState: LeaderboardState = {
  entries: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addLeaderboardEntry: (state, action: PayloadAction<LeaderboardEntry>) => {
      state.entries.push(action.payload);
    },
    setLeaderboardEntries: (
      state,
      action: PayloadAction<LeaderboardEntry[]>,
    ) => {
      state.entries = action.payload;
    },
  },
});

export const {addLeaderboardEntry, setLeaderboardEntries} =
  leaderboardSlice.actions;

export const saveLeaderboard = () => async () => {
  const leaderboard = store.getState().leaderboard.entries;
  try {
    await AsyncStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  } catch (error) {
    console.error('Failed to save leaderboard to storage:', error);
  }
};

export const loadLeaderboard = () => async () => {
  try {
    const storedData = await AsyncStorage.getItem('leaderboard');
    if (storedData) {
      const parsedData: LeaderboardEntry[] = JSON.parse(storedData);
      dispatch(setLeaderboardEntries(parsedData));
    }
  } catch (error) {
    console.error('Failed to load leaderboard from storage:', error);
  }
};

export default leaderboardSlice.reducer;
