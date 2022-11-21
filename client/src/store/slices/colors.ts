import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getPetColors } from '../../utils/getPetsColors'
import { TPetColor } from '../../types/types'

export interface IColorState {
  colors: Array<string>,
}

const initialState: IColorState = {
  colors: [],
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<TPetColor[]>) => {
      state.colors = getPetColors(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setColors } = colorSlice.actions

export default colorSlice.reducer
