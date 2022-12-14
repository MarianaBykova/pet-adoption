import { Paper } from "@mui/material";

import PetsList from "./PetsList";

import './admin-dashboard.scss';

const AdminDashboard = () => {
  return (
    <main style={{ width: '100%' }} className='admin-dashboard'>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <PetsList/>
      </Paper>
    </main>
  );
}
 
export default AdminDashboard;
