import { Paper } from "@mui/material";

import PetsList from "./PetsList";

const AdminDashboard = () => {
  return (
    <main style={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <PetsList/>
      </Paper>
    </main>
  );
}
 
export default AdminDashboard;
