import { readFromLocalStorage } from '@/utils/storage.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const loadLocation = (): number | null => {
  const items = readFromLocalStorage('selectedLocation');
  if (typeof items === 'number') {
    return items;
  }
  return null;
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
