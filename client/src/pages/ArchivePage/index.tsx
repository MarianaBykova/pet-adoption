import ArchiveCard from "../../components/Card/ArchiveCard";

import { TArchivePet } from "../../types/types";
import { baseUrl } from "../../utils/axios";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setRefetchArchive } from '../../store/slices/refetch';

import './archive-page.scss';
import Spinner from "../../components/Spinner";

const ArchivePage: React.FC = () => {
  const [archivePets, setArchivePets] = useState<TArchivePet[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { needRefetchArchive } = useSelector((state: RootState) => state.refetch)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    baseUrl.get('/pet/archive')
      .then((res) => setArchivePets(res.data))
      .then(() => dispatch(setRefetchArchive(false)))
      .then(() => setLoading(false))
  }, [needRefetchArchive])

  return (
    <div className='archive-page'>
       <h2>Истории питомцев, нашедших дом</h2>
       <div className='archive-page__cards'>
        {isLoading 
          ? <Spinner /> 
          : archivePets.map(obj => <ArchiveCard key={obj.id} {...obj}/>)
        }
      </div>
    </div>
  );
}
 
export default ArchivePage;
