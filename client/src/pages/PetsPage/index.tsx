import SkeletonMui from "../../components/Skeleton";
import { useEffect, useState } from "react";
import PetCard from "../../components/Card";
import { TPetType } from "../../types/types";
import { baseUrl } from "../../utils/axios";
import './pets-page.scss'

const PetsPage: React.FC = () => {

  const [pet, setPet] = useState<TPetType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async() => {
    setIsLoading(true);
    const {data} = await baseUrl.get('/pet')
    setPet(data)
    setIsLoading(false);
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='pets-page'>
      {isLoading 
        ? [...new Array(6)].map((el, index) => <SkeletonMui key={index}/>)
        : pet.map(obj => <PetCard key={obj.id} {...obj}/>)
      }
    </div>
  );
}
 
export default PetsPage;
