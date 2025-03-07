
"use client";
import { useRouter } from "next/navigation"
import { useState } from "react";


export default function Home() {
    const [roomId,setRoomId]=useState("");
    const Router= useRouter();
 return<div  style={{height:"100vh",width:"100vw", display:"flex",justifyContent:"center",alignItems:"center"}}>

          <input style={{padding:10}} value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} type="text" placeholder=" Enter roomId">
          </input>
          <button style={{padding:10}}  onClick={()=>{Router.push(`/Room/${roomId}`)}}>join room</button>
 </div>
}
  