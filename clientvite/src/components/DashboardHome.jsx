import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from '../context/reducer';
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes, } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { bgColors } from "../utils/styles";

export const DashboardCard =({ icon, name, count}) => {
  
  const bg_Color = bgColors[parseInt(Math.random()*bgColors.length)]

  return (
    <div style={{background : `${bg_Color}`}} className='flex p-4 w-56 gap-3 h-32 rounded-md shadow-md bg-stone-700 items-center justify-center'>
      {icon}
      <p className='text-xl text-stone-900 font-semibold'>{name}</p>
      <p className='text-xl text-stone-900 font-semibold'>{count}</p>
    </div>
  )
}


const DashboardHome = () => {

  const [{allUsers, allSongs, allArtists, allAlbums}, dispatch] = useStateValue();


  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.cursor,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }

    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({ 
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data.artist });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ 
        type: actionType.SET_ALL_ALBUMS, 
        allAlbums: data.album });
      });
    }
  },[])
  return (
    <>
    <div className='flex justify-center items-center gap-96 bg-mygreen1 rounded-lg'>
    <div className='w-full p-6 grid  grid-rows-2 gap-9 '>
      {/* prettier-ignore */}
      <DashboardCard icon={<FaUsers className="text-3xl text-red-600" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiLoveSong className="text-3xl text-red-600" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

    </div>
    <div className='w-full p-6 grid grid-rows-2 gap-9 '>
    {/* prettier-ignore */}
    <DashboardCard icon={<RiUserStarFill className="text-3xl text-red-600" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />

    {/* prettier-ignore */}
    <DashboardCard icon={<GiMusicalNotes className="text-3xl text-red-600" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
  </div>
    </div>
  </>
  )
}

export default DashboardHome