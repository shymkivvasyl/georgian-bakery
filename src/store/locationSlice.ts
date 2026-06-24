import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const loadLocation = (): number | null => {
  const saved = localStorage.getItem('selectedLocation');
  return saved ? Number(saved) : null;
};

const locationSlice = createSlice({
  name: 'location',
  initialState: loadLocation() as number | null,
  reducers: {
    setSelectedLocation: (_, action: PayloadAction<number | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;