import axios from 'axios';
import jwt_decode from "jwt-decode";

export const baseUrl = axios.create({
  baseURL: 'http://localhost:4000'
})

export const authUrl = axios.create({
  baseURL: 'http://localhost:4000'
})

authUrl.interceptors.request.use(async (config) => {
  const accessToken = window.localStorage.getItem('access_token');
  const expiresDate = jwt_decode(accessToken).exp;
  const isExpired = Math.round(Date.now() / 1000) > expiresDate;

  if (isExpired) {
    const {data} = await baseUrl.post('/token', {
      refreshToken: window.localStorage.getItem('refresh_token')
    })
    console.log('data in axios', data)
    window.localStorage.setItem('access_token', data.accessToken);
    window.localStorage.setItem('refresh_token', data.refreshToken)
  }

  const access_token = window.localStorage.getItem('access_token');
  if (access_token) {
    config.headers.Authorization = access_token;
  }
  return config;
})
