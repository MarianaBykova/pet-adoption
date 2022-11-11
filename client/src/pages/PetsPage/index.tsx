import SkeletonMui from "../../components/Skeleton";
import { createContext, useEffect, useState, Dispatch, SetStateAction} from "react";
import PetCard from "../../components/Card";
import { TPetType } from "../../types/types";
import { baseUrl } from "../../utils/axios";
import './pets-page.scss'
import SelectMui from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import { getPetColors } from "../../utils/getPetsColors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import qs from 'query-string'

// export interface ISort {
//   sortType: string;
//   setSortType: () => void;
// }

export type TSortContext = {
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
}

export const SortContext = createContext<TSortContext | null>(null);

const PetsPage: React.FC = () => {

  const [pet, setPet] = useState<TPetType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState('age')

  const {type, color, friendliness, activity} = useSelector((state: RootState) => state.filter);

  const queryString = qs.stringify({type: type, color: color, friendliness: friendliness, activity: activity})
  console.log(queryString, 'query')

  const fetch = async() => {
    setIsLoading(true);
    const {data} = await baseUrl.get('/pet?sort='+sortType+'&'+queryString)
    setPet(data)
    setIsLoading(false);
  }

  console.log('sort Type', sortType)
  console.log(pet, 'pet')

  useEffect(() => {
    fetch()
  }, [sortType, type, color, friendliness, activity])

  return (
    <SortContext.Provider value = {{sortType, setSortType}}>
    <div className='pets-page'>
      <SelectMui />
      <div className='pets-page__content'>
        <aside className='pets-page__filters'>
        <FormGroup>
          <Checkbox value = 'type.cat' label = 'кошки'/>
          <Checkbox value = 'type.dog' label = 'собаки'/>
        </FormGroup>  
          <h4>Цвет</h4>
          {getPetColors(pet)?.map(el => <Checkbox value = {`color.${el}`} label = {el}/>)}
          <h4>Характер</h4>
          <Checkbox value = {true} label = 'Ладит с другими питомцами'/>
          <Checkbox  value = {false} label = 'Предпочитает быть наедине с хозяином'/>
          <Checkbox value = {2} label = 'Активный'/>
          <Checkbox  value = {3} label = 'Спокойный'/>
        </aside> 
        <div className='pets-page__cards'>
          {isLoading 
            ? [...new Array(6)].map((el, index) => <SkeletonMui key={index}/>)
            : pet.map(obj => <PetCard key={obj.id} {...obj}/>)
          }
        </div>
      </div>
    </div>
    </SortContext.Provider>
  );
}
 
export default PetsPage;
