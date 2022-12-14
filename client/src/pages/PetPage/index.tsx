import Typography from '@mui/material/Typography';

import ImagesList from "../../components/ImagesList";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import { TPetType } from "../../types/types";
import { baseUrl } from "../../utils/axios";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import './pet-page.scss';
import { toast } from 'react-toastify';

const PetPage: React.FC = () => {
  
  const {id} = useParams();
  const [pet, setPet] = useState<TPetType>()

  useEffect(() => {
    baseUrl.get('/pet/'+id)
      .then((res) => setPet(res.data))
      .catch((error) => toast.error(error.message))
  }, [])

  if (!pet) return <div style={{display: 'flex', height: '100%'}}><Spinner /></div>
  
  return (
    <div className='pet-page'>
      <ImagesList data={pet.image}/>
      <div className='pet-page__content'>
        <Typography variant="h4" gutterBottom>{pet.name}</Typography>
        <Typography variant="body2" gutterBottom className='pet-page__text'>{pet.description}</Typography>
        <Link to='/find-pet'><Button>Назад</Button></Link>
      </div>
    </div>
  );
}
 
export default PetPage;
