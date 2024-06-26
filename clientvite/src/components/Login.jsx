import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { validateUser } from '../api'
import {music_bg} from '../assets/video'
const Login = ({setAuth}) => {

  const firebaseAuth=getAuth(app);
  const provider=new GoogleAuthProvider();

  const navigate=useNavigate();
  const [{user},dispatch]=useStateValue();
  const LoginWithGoogle = async () =>{
    await signInWithPopup(firebaseAuth, provider).then((userCred)=>{
      if(userCred){
        setAuth(true);
        window.localStorage.setItem("auth" , "true");

        firebaseAuth.onAuthStateChanged((userCred)=>{
          if(userCred)
          {
            userCred.getIdToken().then((token) =>{
              validateUser(token).then((data)=>{
                dispatch({
                  type: actionType.SET_USER,
                  user : data
                })
              })
            })
            navigate("/" , {replace : true})
          }
          else
          {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user : null
            })
            navigate("/login");
          }
        })
      }
    })
  }

  useEffect(()=>{
    if(window.localStorage.getItem("auth")==="true")
    {
      navigate('/' , {replace : true});
    }
  },[])

  return (
    <div className='relative w-screen h-screen'>
      <video src={music_bg}
       type="video/mp4"
       autoPlay
       muted
       loop
       className='w-full h-full object-cover'
      
      />
      <div className='absolute inset-0 bg-darkOverlay flex items-left justify-left p-8'>
        <div className='w-full md:w-375 bg-slate-600 p-8 shadow-2xl rounded-2xl backdrop:blur-xl flex flex-col items-center justify-center'>
          <div className='flex items-left justify-left gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'
          onClick={LoginWithGoogle}>
            <FcGoogle className='text-xl'/>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
