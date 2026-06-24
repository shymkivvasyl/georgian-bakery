import { useAppDispatch, useAppSelector } from './redux';
import { setSelectedLocation } from '@/store/locationSlice';

export const useSelectedLocation = () => {
  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(state => state.location);

  return {
    selectedLocation,
    setSelectedLocation: (id: number | null) => dispatch(setSelectedLocation(id)),
  };
};