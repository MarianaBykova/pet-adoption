import PetEditForm from "../../Form/PetEditForm";
import Modal from "../../Modal";

import { baseUrl } from "../../../utils/axios";
import { TPetType } from "../../../types/types";

import { useState, useEffect } from 'react';

type TPetEditModalProps = {
  open: boolean;
  onClose: () => void;
  petId: number
}

const PetEditModal: React.FC<TPetEditModalProps> = ({ open, onClose, petId }) => {
  const [currentPet, setCurrentPet] = useState<TPetType | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    baseUrl.get('/pet/'+petId)
      .then((res) => setCurrentPet(res.data))
      .then(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading &&
        <Modal title='Редактирование питомца' open={open} onClose={onClose}>
          <PetEditForm petData={currentPet} onCloseForm={onClose}/>
        </Modal>
      }
    </>
  );
}
 
export default PetEditModal;
