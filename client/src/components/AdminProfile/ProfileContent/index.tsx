import AdminDashboard from "../AdminDashboard";
import ProfileInfo from "../ProfileInfo";
import PetForm from "../../Form/PetForm";
import ProfileEdit from "../../Form/ProfileEdit";

type TProfileContentRouteProps = {
  route?: string
}

const ProfileContent: React.FC<TProfileContentRouteProps> = ({route}) => {

  const content: { [key: string]: JSX.Element } = {
    dashboard: <AdminDashboard/>,
    'add-pet': <PetForm/>,
    edit: <ProfileEdit/>
  }

  const CurrentProfileContent = () => route ? content[route] : <ProfileInfo/>

  return (
    <>
      <CurrentProfileContent/>
    </>
  );
}
 
export default ProfileContent;
