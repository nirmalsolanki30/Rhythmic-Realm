import React from 'react'
import { BsEmojiWink } from "react-icons/bs";
import {motion} from "framer-motion";

const Alert = ({type}) => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: -100, scale: 0.6 }}
    animate={{ opacity: 1, y: 50, scale: 1 }}
    exit={{ opacity: 0, y: -100, scale: 0.6 }}
    className={`fixed top-12 right-12 px-4 py-2 rounded-md backdrop-blur-md flex items-center 
    justify-center shadow-xl
    ${type==="success" && "bg-green-500"}
    ${type==="danger" && "bg-red-500"}
    `}>
     {type==="success" && (
        <div className='flex items-center justify-center gap-4'>
        <BsEmojiWink className='text-3xl text-primary'/>
       <p className='text-xl font-semibold text-primary'>Data Saved</p>
        </div>
       
     )}
     {type==="danger" && (
        <div className='flex items-center justify-center gap-4'>
        <BsEmojiWink className='text-3xl text-primary'/>
       <p className='text-xl font-semibold text-primary'>Something went wrong ..please try again later</p>
        </div>
       
     )}
    </motion.div>
  )
}

export default Alert