import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';

import './App.css'
import  {Header, Footer} from './components';


function App() {
  //whenever in a proj hum kisi database ya network se kuch data fetch karte hain, its good to nake a state for loading, coz due 
  //to network traffic the fetching of data could take some time. thus --> 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => { //jaise hi application load ho get the curren user from authService
    authService.getCurrentUser()
    .then((userData) => { // if u get a user take out userData from user
      if(userData){
        dispatch(login({userData})) // through dispatch put this userData in the store(i.e. action.payload) through login reducer.
      }
      else{
        dispatch(logout())
      }
    } )
    .finally(() => setLoading(false));
  }, []) 

  //conditional rendering 
  if(loading){
    return null;
  }else{
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  }


}

export default App
