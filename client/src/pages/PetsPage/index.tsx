import SkeletonMui from "../../components/Skeleton";
import { createContext, useEffect, useState, Dispatch, SetStateAction} from "react";
import PetCard from "../../components/Card";
import { TPetType } from "../../types/types";
import { baseUrl } from "../../utils/axios";
import './pets-page.scss'
import SelectMui from "../../components/Select";

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

  const fetch = async() => {
    setIsLoading(true);
    const {data} = await baseUrl.get('/pet?sort='+sortType)
    setPet(data)
    setIsLoading(false);
  }

  console.log('sort Type', sortType)
  console.log(pet, 'pet')

  useEffect(() => {
    fetch()
  }, [sortType])

  return (
    <SortContext.Provider value = {{sortType, setSortType}}>
    <div className='pets-page'>
      <SelectMui />
      <div className='pets-page__cards'>
        {isLoading 
          ? [...new Array(6)].map((el, index) => <SkeletonMui key={index}/>)
          : pet.map(obj => <PetCard key={obj.id} {...obj}/>)
        }
      </div>
    </div>
    </SortContext.Provider>
  );
}
 
export default PetsPage;
