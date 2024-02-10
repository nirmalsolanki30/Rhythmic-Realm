import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,

} from "../api";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/spportfunctions";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashBoardNewSong = () => {

  const [songName , setSongName]=useState("");
  const [{allArtists,allAlbums},dispatch]=useStateValue();
  const [isImageLoading,setIsImageLoading] = useState(false);
  const [songImageCover,setSongImageCover] = useState(null);
  const [imageUploadProgress,setImageUploaProgress] = useState(0);

  useEffect(()=>{
     if(!allArtists){
     getAllArtist().then((data)=>{
      dispatch({
        type: actionType.SET_ALL_ARTISTS,
        allArtists : data.artist,
      });
     });
    }
     if(!allAlbums){
     getAllAlbums().then((data)=>{
      dispatch({
        type: actionType.SET_ALL_ALBUMS,
         allAlbums : data.album,
      });
     })
     }
  },[]);

  const deleteFileObject = (url, isImage) =>{
    if(isImage){
      setIsImageLoading(true)
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setIsImageLoading(false);
    })
  }
  return (
    <div className="flex  flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
            <input type="text" 
            placeholder="Type your song name"
            className="w-full p-3 rounded-md text-base font-semibold outline-none shadow-sm border border-gray-300 bg-yellow-500 text-white placeholder-white " 
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            />
            <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={allArtists} flag={"Artist"} />
            <FilterButtons filterData={allAlbums} flag={"Album"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
            <FilterButtons filterData={filters} flag={"Category"} />
            </div>
            <div className="bg-teal-200 backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-900 cursor-pointer">
              {isImageLoading && <FileLoader progress = {imageUploadProgress} />}
              {!isImageLoading && (
                <>
                   {!songImageCover ? 
                   <FileUploader 
                   updateState = {setSongImageCover}  
                   setProgress = {setImageUploaProgress}  
                   isLoading = {setIsImageLoading}
                   isImage = {true}
                   /> : <div className="relative w-full h-full overflow-hidden rounded-md">
                       <img 
                       src={songImageCover}
                       className="w-full h-full object-cover"
                       alt="" />
                       <button type="button"
                       className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out" onClick={()=>deleteFileObject(songImageCover, true)}>
                          <MdDelete className="text-white" />
                       </button>
                     </div>
                   }
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export const FileLoader = ({progress}) => {
  return(
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  )
}

export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {
  const uploadFile =(e)=> {
    isLoading(true);
    const uploadedFile = e.target.files[0];
     
      const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`)

      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateState(downloadURL);
            isLoading(false);
          })
        }
      )
  }
  return(
  <label>
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col justify-center items-center cursor-pointer">
        <p className="font-bold text-2xl">
          <BiCloudUpload />
        </p>
        <p className="text-lg"> Click to Upload {isImage ? "an Image" : "an Audio"} </p>
      </div>
    </div>
    <input
      type="file"
      name="upload-file"
      accept={`${isImage ? "image/*" : "audio/*"}`}
      className={'w-0 h-0'}
      onChange={uploadFile}
    />
  </label>
  )
}

export default DashBoardNewSong