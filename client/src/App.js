import React, { useEffect, useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home   from './components/Home'
import Login from './components/Login'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'

import {AnimatePresence} from 'framer-motion'


const App = () => {

  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const[authState,setAuthState] = useState(false);

  const[auth,setAuth]=useState(false || window.localStorage.getItem("auth")==="true")

  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred)=>{
      if(userCred){
        userCred.getIdToken().then((token) =>{
          console.log(token);
        })
      }else{
        setAuth(false);
        window.localStorage.setItem("auth" , "false");
        navigate("/login");
      }
    })
  }, [])

  return (
    <AnimatePresence  mode='wait'>
    <div className='h-auto mmin-w-[680px] bg-primary flex justify-center items-center'>
      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth}/>}/>
        <Route path='/*' element={<Home />}/>
      </Routes>
    </div>
    </AnimatePresence>
  )
}

export default App
