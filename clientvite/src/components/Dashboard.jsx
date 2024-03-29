import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import DashboardHome from './DashboardHome'
import DashboardSongs from './DashboardSongs'
import DashboardUsers from './DashboardUsers'
import DashboardArtists from './DashboardArtists'
import DashboardAlbums from './DashboardAlbums'
import DashBoardNewSong from './DashBoardNewSong'
import Alert from './Alert'
import { useStateValue } from '../context/StateProvider';
const Dashboard = () => {
  const [{alertType},dispatch]=useStateValue();

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-white'>
        <Header/>
        <div className=' w-[60%] my-2 bg-stone-900 p-4 flex items-center justify-evenly rounded-2xl'>
          <NavLink to={"/dashboard/home"}><IoHome className='text-2xl text-red-600' /></NavLink>
          <NavLink to={"/dashboard/user"} className={({isActive})=>isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
          <NavLink to={"/dashboard/songs"} className={({isActive})=>isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
          <NavLink to={"/dashboard/artist"} className={({isActive})=>isActive ? isActiveStyles : isNotActiveStyles}>Artists</NavLink>
          <NavLink to={"/dashboard/albums"} className={({isActive})=>isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
        </div>

        <div className='flex justify-center items-center my-4 w-full p-4 '>
          <Routes>
            <Route path='/home' element={<DashboardHome/>}/>
            <Route path='/user' element={<DashboardUsers/>}/>
            <Route path='/songs' element={<DashboardSongs/>}/>
            <Route path='/artist' element={<DashboardArtists/>}/>
            <Route path='/albums' element={<DashboardAlbums/>}/>
            <Route path='/newSong' element={<DashBoardNewSong/>}/>
          </Routes>
        </div>
        {
        alertType && (
        <Alert type={alertType}/>
        )
       }
    </div>
  )
}

export default Dashboard