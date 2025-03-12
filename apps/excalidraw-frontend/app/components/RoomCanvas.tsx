
"use client"

import { useEffect, useState } from "react";
import { WS_URL } from "../config";
import { Canvas } from "./canvas";


export  function RoomCanvas({roomId}:{roomId:string}){
  
  const [socket,setSocket]=useState<WebSocket|null>(null);

   useEffect(()=>{
      const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjYyN2Q5OS1lZDIwLTQwYTctYmRkMi0yMzAzYTRiYjUyNzgiLCJpYXQiOjE3NDE3NjE2NDZ9.2QOd_CmLPtUneitESyVJkL3w9p4yCy6TV9SO6_CS_F8`);
      ws.onopen=()=>{
        setSocket(ws);
        const data=JSON.stringify({
          type:"join-room",
          roomId:Number(roomId),
          message:"i want to join"
        })
        ws.send(data);
        
      }
   },[roomId])
   if(!socket){
    return <div>
      connecting to server......
    </div>
   }

  return<div>
    <Canvas roomId={roomId} socket={socket}></Canvas>
  </div> 
}