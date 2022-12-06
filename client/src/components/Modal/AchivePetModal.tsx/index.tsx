import Modal from "..";
import ArchivePetEditForm from "../../Form/ArchivePetEditForm";

type TArchivePetModalProps = {
  open: boolean;
  onClose: () => void;
  petId: number
  text: string | null;
  history: string | null
}

const ArchivePetModal: React.FC<TArchivePetModalProps> = ({ open, onClose, text, history, petId }) => {
  return (
    <Modal open={open} onClose={onClose} title='Создание истории питомца'>
      <ArchivePetEditForm petId={petId} text={text} history={history} onCloseForm={onClose}/>
    </Modal>
  );
}
 
export default ArchivePetModal;
