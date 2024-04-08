import React, { useEffect, useRef, useState } from "react";
import {NavLink} from'react-router-dom';
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../Context/StateProvider";
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtist, getAllSongs } from "../api";
import { motion } from "framer-motion";
import { actionType } from "../Context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

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
          allSongs: data.song,
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
     {/* Main Container */}
     <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
      {/* Count */}
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
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};


export const SongCard = ({ data, index, type }) => {
  const [isDelete,setIsDelete] = useState(false);
  const [{allArtists, allAlbums, allSongs, alertType,isSongPlaying,songIndex},dispatch]=useStateValue();
  const Deletedata = (data) => {
    //For Deleting Song
    // if(type === "song")
    // {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {

      })

      deleteSongById(data._id).then((res) => {
        if(res.data)
        {
          // dispatch({
          //   type : actionType.SET_ALERT_TYPE,
          //   alertType : "success"  
          // })

          // setInterval(() => {
          //   dispatch({
          //     type : actionType.SET_ALERT_TYPE,
          //     alertType : null  
          //   })
          // },3000);

          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs,
            });
          });
        }
        // else
        // {
        //   dispatch({
        //     type : actionType.SET_ALERT_TYPE,
        //     alertType : "danger"  
        //   })

        //   setInterval(() => {
        //     dispatch({
        //       type : actionType.SET_ALERT_TYPE,
        //       alertType : null  
        //     })
        //   },3000);
        // }
      })
    // }

    //For deleting Album
    // if(type === "album")
    // {
      //const deleteRef = ref(storage, data.imageURL);
      //deleteObject(deleteRef).then(() => {

     // })

      deleteAlbumById(data._id).then((res) => {
        if(res.data)
        {
          // dispatch({
          //   type : actionType.SET_ALERT_TYPE,
          //   alertType : "success"  
          // })

          // setInterval(() => {
          //   dispatch({
          //     type : actionType.SET_ALERT_TYPE,
          //     alertType : null  
          //   })
          // },3000);

          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        }
        // else
        // {
        //   dispatch({
        //     type : actionType.SET_ALERT_TYPE,
        //     alertType : "danger"  
        //   })

        //   setInterval(() => {
        //     dispatch({
        //       type : actionType.SET_ALERT_TYPE,
        //       alertType : null  
        //     })
        //   },3000);
        // }
      })
    // }

    //For deleting Artist
    // if(type === "artist")
    // {
      //const deleteRef = ref(storage, data.imageURL);
      //deleteObject(deleteRef).then(() => {

      //})

      deleteArtistById(data._id).then((res) => {
        if(res.data)
        {
          // dispatch({
          //   type : actionType.SET_ALERT_TYPE,
          //   alertType : "success"  
          // })

          // setInterval(() => {
          //   dispatch({
          //     type : actionType.SET_ALERT_TYPE,
          //     alertType : null  
          //   })
          // },3000);

          getAllArtist().then((data)=>{
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists : data.artist,
            });
           });
        }
        // else
        // {
        //   dispatch({
        //     type : actionType.SET_ALERT_TYPE,
        //     alertType : "danger"  
        //   })

        //   setInterval(() => {
        //     dispatch({
        //       type : actionType.SET_ALERT_TYPE,
        //       alertType : null  
        //     })
        //   },3000);
        // }
      })
    // }
  }
  const addToContext=()=>{
    if(!isSongPlaying){
    dispatch({
      type:actionType.SET_ISSONG_PLAYING,
      isSongPlaying:true,
    });
   }
   if(songIndex!==index){
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: index,
    });
   }

  }

   return (
   <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={type==='song' && addToContext}
   >
    <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className=" w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
        {data.artist && (
        <span className="block text-sm text-gray-400 my-1">
          {data.artist.length > 25 ? `${data.artist.slice(0, 25)}` : data.artist}
          </span>)}
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i whileTap={{ scale: 0.75 }} >
          <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" 
           onClick={() => setIsDelete(true)}
          />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 text-center gap-0"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}//duration is 0.3 seconds
        >
          <p className="text-lg text-headingColor font-semibold font-mono text-center">Are You Sure? You want to DELETE IT ?????</p>
          <div className="flex items-center gap-4">
            <motion.button className="px-2 py-1 text-sm uppercase bg-green-500 hover:bg-green-700 rounded-md cursor-pointer"
            onClick={() => Deletedata(data)}
            whileTap={{scale: 0.75}}
            >YES</motion.button>
            <motion.button className="px-2 py-1 text-sm uppercase bg-red-500 hover:bg-red-700 rounded-md cursor-pointer"
            onClick={() => setIsDelete(false)}
            whileTap={{scale: 0.75}}
            >NO</motion.button>
          </div>
        </motion.div>
      )}    
   </motion.div>
   )
};

export default DashboardSongs