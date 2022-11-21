import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPetType } from '../../types/types'
import { baseUrl } from '../../utils/axios'

interface IPetsState {
  pets: TPetType[],
  loadMore: boolean,
  page: number,
  loading: boolean,
  message: string
}  

type TFetchPetsArgs = Record<string, string>

type TFetchPetsAction = {
  pets: TPetType[];
  loadMore: boolean;
  message: string
}

const initialState = {
  pets: [],
  loadMore: true,
  page: 1,
  loading: false,
  message: ''
} as IPetsState

export const fetchPets = createAsyncThunk(
  'pets/fetchAllPets',
  async (params: TFetchPetsArgs) => {
    const {page, sortType, queryString} = params;
    const {data} = await baseUrl.get(`/pet?limit=6&page=${page}&sort=${sortType}&${queryString}`)
    console.log(data, 'data')
    if (data.message) return {pets: [], loadMore: false, message: data.message}
    if (data.length < 6) return {pets: data, loadMore: false, message: ''}
    else return {pets: data, loadMore: true, message: ''};
  }
)

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPage: (state) => {
      state.page = state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
    resetPets: (state) => {
      state.pets = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPets.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchPets.fulfilled, (state, action: PayloadAction<TFetchPetsAction>) => {
      state.pets = [...state.pets, ...action.payload.pets]
      state.loadMore = action.payload.loadMore
      state.loading = false
      state.message = action.payload?.message
    })
  },
})


export const { setPage, resetPage, resetPets } = petsSlice.actions

export default petsSlice.reducer
