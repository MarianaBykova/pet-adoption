import SkeletonMui from "../../components/Skeleton";
import PetCard from "../../components/Card";
import SelectMui from "../../components/Select";
import Button from "../../components/Button";
import CheckboxList from "../../components/CheckboxList";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { setPage } from "../../store/slices/pets";

import './pets-page.scss'

const PetsPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const {pets, loading, loadMore, message} = useSelector((state: RootState) => state.pets)

  return (
    <div className='pets-page'>
      <div className='pets-page__select'>
        <SelectMui />
      </div>
      
      <div className='pets-page__content'>
        <CheckboxList/>
        {message ? <div>{message}</div> 
          :
          <div className='pets-page__cards'> 
            <div className='pets-page__cards-items'>
              {loading
                ? [...new Array(6)].map((el, index) => <SkeletonMui key={index}/>)
                : pets.map(obj => <PetCard key={obj.id} {...obj}/>)
              }
            </div>
            {loadMore && 
              <Button onClick={() => dispatch(setPage())} style={{maxWidth: '15%', alignSelf: 'center'}}>Загрузить еще</Button>
            }
          </div>     
        }     
      </div>
    </div>
  );
}
 
export default PetsPage;
