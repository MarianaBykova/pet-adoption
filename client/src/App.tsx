import { ThemeProvider } from '@mui/material';
import theme from './theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import PetPage from './pages/PetPage';
import AppLoader from './ui/AppLoader';
import ProfilePage from './pages/ProfilePage';
import ArchivePage from './pages/ArchivePage';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUsPage';
import Page404 from './pages/404Page';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const { isAuth } = useSelector((state: RootState) => state.user)
  return (
    <ThemeProvider theme={theme}>
      <AppLoader>
        <div className="App">
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/find-pet' element={<PetsPage/>} />
            <Route path='/pet/:id' element={<PetPage/>} />
            <Route path='/at-home' element={<ArchivePage/>} />
            {isAuth && <Route path='/profile/:id/:content' element={<ProfilePage/>} />}
            {isAuth && <Route path='/profile/:id/' element={<ProfilePage/>} /> }
            <Route path='/about-us' element={<AboutUs />} />    
            <Route path='*' element={<Page404 />} />          
          </Routes>
        </div>
        <ToastContainer position="bottom-right"/> 
        <Footer />
      </AppLoader>
    </ThemeProvider>
  );
}

export default App;
