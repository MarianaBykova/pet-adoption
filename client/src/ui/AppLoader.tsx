import { useEffect, useState, createContext, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { setColors } from '../store/slices/colors';
import { fetchPets } from '../store/slices/pets';

import { baseUrl } from '../utils/axios';
import qs from 'query-string';
import { getQueryString } from '../utils/getQueryString';

export type TSortContext = {
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
}

export const SortContext = createContext<TSortContext | null>(null);


const AppLoader = ({ children }: any) => {

const dispatch = useDispatch();
const dispatchThunk = useAppDispatch();

const [sortType, setSortType] = useState('age')

const {filters} = useSelector((state: RootState) => state.filter)
const {page} = useSelector((state: RootState) => state.pets)

const queryString = qs.stringify(getQueryString(filters))

useEffect(() => {
  baseUrl.get('/pet/color').then((res) => dispatch(setColors(res.data)))
}, [])

useEffect(() => {
  dispatchThunk(fetchPets({page: String(page), sortType, queryString}))
}, [page, sortType, filters])

  return (
    <SortContext.Provider value = {{sortType, setSortType}}>
      {children}
    </SortContext.Provider>
  );
}
 
export default AppLoader;
