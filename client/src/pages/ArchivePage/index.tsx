import { useEffect, useState } from "react";
import PetCard from "../../components/Card";
import ArchiveCard from "../../components/Card/ArchiveCard";
import { TArchivePet } from "../../types/types";
import { baseUrl } from "../../utils/axios";

const ArchivePage: React.FC = () => {
  const [archivePets, setArchivePets] = useState<TArchivePet[]>([]);

  useEffect(() => {
    baseUrl.get('/pet/archive')
      .then((res) => setArchivePets(res.data))
  }, [])

  if(!archivePets) return <>Загрузка ...</>

  return (
    <div className='archive-page'>
      {archivePets.map(obj => <ArchiveCard key={obj.id} {...obj}/>)}
    </div>
  );
}
 
export default ArchivePage;
