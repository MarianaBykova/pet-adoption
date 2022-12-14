import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IRefetchState {
  needRefetchArchive: boolean,
  needRefetch: boolean
}

const initialState: IRefetchState = {
  needRefetchArchive: false,
  needRefetch: false,
}

export const refetchSlice = createSlice({
  name: 'refetch',
  initialState,
  reducers: {
    setRefetchArchive: (state, action:PayloadAction<boolean>) => {
      state.needRefetchArchive = action.payload
    },
    setRefetch: (state, action:PayloadAction<boolean>) => {
      state.needRefetch = action.payload
    },
  },
})

export const { setRefetchArchive, setRefetch } = refetchSlice.actions

export default refetchSlice.reducer
