/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client"
import { initDraw } from "@/app/draw";

import {  useEffect, useRef, useState } from "react";
import { IconButton } from "./iconButton";
import { Circle, Pencil, RectangleHorizontal } from "lucide-react";

type shape="circle"|"rectangle"|"pencil"
export  function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
   const[selectedTool,setSelectedTool]=useState<shape>("circle");
    
    const canvasRef=useRef<HTMLCanvasElement>(null);
   useEffect(()=>{
    //@ts-ignore
    window.selectedTool=selectedTool;
   },[selectedTool])
    
    useEffect(()=>{
      if(canvasRef.current){
           initDraw(canvasRef.current,roomId,socket);
      }
     
    },[canvasRef,roomId,socket])


  return<div className="h-[100vh] overflow-hidden">
    <canvas  ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    <Topbar selectedTool={selectedTool} setSeletedTool={setSelectedTool}/>
  </div> 
   
}
function Topbar({selectedTool,setSeletedTool}:{selectedTool:shape,setSeletedTool:(s:shape)=>void}){
  return<div className="fixed top-10 left-10 flex gap-2 border-1 p-2">
    <IconButton activated={selectedTool==="pencil"} icon={<Pencil />} onClick={()=>{setSeletedTool("pencil")}}/>
    <IconButton activated={selectedTool==="circle"}icon={<Circle/>} onClick={()=>{setSeletedTool("circle")}}/>
    <IconButton activated={selectedTool==="rectangle"} icon={<RectangleHorizontal />} onClick={()=>{setSeletedTool("rectangle")}}/>
    </div>
   
} 