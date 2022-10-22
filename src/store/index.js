import { configureStore } from '@reduxjs/toolkit';
import entriesSlice from './entriesSlice';
import entrySlice from './entrySlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    entries: entriesSlice.reducer,
    entry: entrySlice.reducer,
  },
});

export default store;
