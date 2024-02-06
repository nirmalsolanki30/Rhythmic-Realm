import React, { useEffect, useRef, useState } from "react";
import {NavLink} from'react-router-dom';
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

const DashboardSongs = () => {
  const [songFilter,setSongFilter]=useState("");
  const [isFocus ,setIsFocus]=useState(false);
  const [{allSongs},dispatch]=useStateValue();
  const [filteredSongs, setFilteredSongs] = useState(null);
  
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

 

  
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
     <div className='w-full flex justify-center items-center gap-20'>
      <NavLink to={"/dashboard/newSong"}
      className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer">
        <IoAdd/>
      </NavLink>
       <input type="text" 
        className={`w-52 px-4 py-2 border ${
        isFocus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
       placeholder="Search Here" value={songFilter} 
       onChange={(e)=>setSongFilter(e.target.value)}
       onBlur={()=>setIsFocus(false)}
       onFocus={()=>setIsFocus(true)}
       
       />
       <i>
        <AiOutlineClear className="text-3xl text-textColor cursor-pointer"/>
       </i>
     </div>
     <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
       <div className="absolute top-4 left-4">
       <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{" "}
            </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
        </p>

       </div>
       <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
     </div>


    </div>
  )
}

export const SongContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  );
};


export const SongCard = ({ data, index }) => {
   return <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
    <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className=" w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
        <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
          <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
        </motion.i>
      </div>

    
   </motion.div>
};

export default DashboardSongs