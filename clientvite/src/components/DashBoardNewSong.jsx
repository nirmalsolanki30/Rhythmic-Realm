import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { actionType } from "../context/reducer";
//import { filterByLanguage, filters } from "../utils/supportfunctions";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashBoardNewSong = () => {
  const [songName , setSongName]=useState("");
  return (
    <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
            <input type="text" 
            placeholder="Type your song name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent" 
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            />
            <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={""} flag={"Artist"} />
            <FilterButtons filterData={""} flag={"Album"} />
            <FilterButtons filterData={""} flag={"Language"} />
            <FilterButtons filterData={""} flag={"Category"} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoardNewSong