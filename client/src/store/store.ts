import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filter';
import colors from './slices/colors';
import pets from './slices/pets';
import user from './slices/user';
import refetch from './slices/refetch';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    colors, 
    pets,
    user,
    refetch
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
