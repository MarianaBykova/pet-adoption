import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFilterState {
  filters: Array<object>
}

const initialState: IFilterState = {
  filters: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<object>) => {
      let valueOfPayload = Object.values(action.payload)[0]; 
      let findItem = state.filters.find(el => Object.values(el)[0] === valueOfPayload)

      if (findItem) {
        state.filters = state.filters.filter(el => Object.values(el)[0] !== valueOfPayload)
      } else state.filters.push(action.payload)
      
    },
    resetFilters: (state) => {
      state.filters = []
    }
  },
})

export const { setFilters, resetFilters } = filterSlice.actions

export default filterSlice.reducer
