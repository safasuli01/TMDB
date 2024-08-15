import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './Slices/wishlistSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;
