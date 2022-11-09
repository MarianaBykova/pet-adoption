import { useEffect, useState } from "react";
import PetCard from "../../components/Card";
import { TPetType } from "../../types/types";
import { baseUrl } from "../../utils/axios";
import './pets-page.scss'

const PetsPage: React.FC = () => {

  const [pet, setPet] = useState<TPetType[]>([]);

  useEffect(() => {
    baseUrl.get('/pet').then((res) => setPet(res.data))
  }, [])

  return (
    <div className='pets-page'>
      {pet.map(obj => <PetCard key={obj.id} {...obj}/>)}
    </div>
  );
}
 
export default PetsPage;
