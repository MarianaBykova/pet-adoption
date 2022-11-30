import Sidebar from "../../components/AdminProfile/Sidebar";
import ProfileContent from "../../components/AdminProfile/ProfileContent";

import { useParams } from "react-router-dom";

import './profile-page.scss';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authUrl } from "../../utils/axios";
import { setAdmin } from "../../store/slices/user";

const ProfilePage: React.FC = () => {
  const {id, content} = useParams<{id: string, content: string}>();
  const dispatch = useDispatch();

  useEffect(() => {
    authUrl.get('/profile').then((res) => dispatch(setAdmin(res.data)))
  }, [])

  return (
    <div className='profile-page'>
      <aside className='profile-page__sidebar'>
        <Sidebar/>
      </aside>
      <ProfileContent route={content}/>
    </div>
  );
}
 
export default ProfilePage;
