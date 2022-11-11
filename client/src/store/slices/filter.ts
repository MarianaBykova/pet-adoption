import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFilterState {
  type: Array<string>,
  color: Array<string>,
  friendliness: Array<string>,
  activity: Array<string>
}

const initialState: IFilterState = {
  type: [],
  color: [],
  friendliness: [],
  activity: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string>) => {
      let filter = action.payload.split('.');
      console.log('filter', filter, typeof filter)

      if (filter[0] === 'type') {
        state.type.includes(filter[1]) ? state.type = state.type.filter(el => el !== filter[1]) : state.type.push(filter[1])
      }
      else if (filter[0] === 'color') {
        state.color.includes(filter[1]) ? state.color = state.color.filter(el => el !== filter[1]) : state.color.push(filter[1])
      } else if (filter[0] === 'true' || filter[0] === 'false') {
        state.friendliness.includes(filter[0]) ? state.friendliness = state.friendliness.filter(el => el !== filter[0]) : state.friendliness.push(filter[0])
      } else {
        state.activity.includes(filter[0]) ? state.activity = state.activity.filter(el => el !== filter[0]) : state.activity.push(filter[0])
      }

      console.log(action.payload, 'action', typeof action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilters } = filterSlice.actions

export default filterSlice.reducer
