import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/axios'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';

interface IUserState {
  user: null | number,
  message: null | string,
  isAuth: boolean,
  userData: IUserData
}  

interface IAccessToken {
  id: number,
  iat: string,
  exp: string
}

interface IUserData {
  userName: string,
  email: string
}

type FetchTypeArgs = Record<string, string>

function getAccessToken(): number | false {
  let token = window.localStorage.getItem('access_token');
  if (token) {
    return jwt_decode<IAccessToken>(token).id;
  } else return false;
}
const initialState = getAccessToken()
  ? { 
      user: getAccessToken(),
      message: 'Вы вошли в систему',
      isAuth: true,
      userData: {}
    } as IUserState
  
  : {
      user: null,
      message: null,
      isAuth: false,
      userData: {}
    } as IUserState

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({email, password}: FetchTypeArgs) => {
    try {
      const {data} = await baseUrl.post('/auth', {
        email,
        password
      })
      window.localStorage.setItem('access_token', data.accessToken);
      window.localStorage.setItem('refresh_token', data.refreshToken);
      toast(data.message) 
      return data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.message = null
      state.isAuth = false
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('refresh_token')
    },
    setAdmin: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUser.pending, (state) => {
    //   state.loading = true
    // })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.message = action.payload.message
      state.isAuth = true
    })
  },
})


export const { logout, setAdmin } = userSlice.actions

export default userSlice.reducer
