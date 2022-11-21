import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import PetPage from './pages/PetPage';
import AppLoader from './ui/AppLoader';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLoader>
        <div className="App">
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/find-pet' element={<PetsPage/>} />
            <Route path='/pet/:id' element={<PetPage/>} />
          </Routes>
        </div>
      </AppLoader>
    </ThemeProvider>
  );
}

export default App;
