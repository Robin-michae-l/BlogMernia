
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './components/Auth';
import Dashview from './pages/Dashview';
import Blogs from './pages/Blogs';
import Footer from './components/Footer';
import { useContext } from 'react';
import { isauthtokencontext } from './statecontext/Context';

function App() {

   const [isauthtoken,setisauthtoken]= useContext(isauthtokencontext) 
  
  return (
    <div>
      

      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/login' element={<Auth/>}/>

        <Route path='/register' element={<Auth register />}/>

        <Route path='/dashview' element={isauthtoken?<Dashview dashview/>:<Home/>}/>

        <Route path='/blogs' element={<Blogs/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
