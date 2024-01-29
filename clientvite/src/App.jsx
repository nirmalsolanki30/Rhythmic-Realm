import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home   from './components/Home'
import Login from './components/Login'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'

import {AnimatePresence} from 'framer-motion'
import { validateUser } from './api';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const App = () => {

  const firebaseAuth = getAuth(app);

  const [{user},dispatch]=useStateValue();
  const[authState,setAuthState] = useState(false);

  const[auth,setAuth]=useState(false || window.localStorage.getItem("auth")==="true")

  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred)=>{
      if(userCred){
        userCred.getIdToken().then((token) =>{
          // console.log(token);
          validateUser(token).then((data) => {
            dispatch({
              type : actionType.SET_USER,
              user :data,
            });
          })
        })
      }else{
        setAuth(false);
        window.localStorage.setItem("auth" , "false");
        <Navigate to = "/login"/>;
      }
    })
  }, [])

  return (
    <AnimatePresence  mode='wait'>
    <div className='h-auto mmin-w-[680px] bg-primary flex justify-center items-center'>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth}/>}/>
        <Route path='/*' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
    </AnimatePresence>
  );
}

export default App;
