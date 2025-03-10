
"use client"

import { useEffect, useState } from "react";
import { WS_URL } from "../config";
import { Canvas } from "./canvas";


export  function RoomCanvas({roomId}:{roomId:string}){
  
  const [socket,setSocket]=useState<WebSocket|null>(null);

   useEffect(()=>{
      const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjYyN2Q5OS1lZDIwLTQwYTctYmRkMi0yMzAzYTRiYjUyNzgiLCJpYXQiOjE3NDE1OTEwMDB9.j0CVF7wGH8lb_8rrn1mjVPVyqGmnAswi3Z0ZU3uZQqY`);
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