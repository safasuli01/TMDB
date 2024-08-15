import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.find(m => m.id === movie.id);
      if (exists) {
        return state.filter(m => m.id !== movie.id);
      } else {
        return [...state, movie];
      }
    },
  },
});

export const { toggleFavorite } = wishlistSlice.actions;
export default wishlistSlice.reducer;
