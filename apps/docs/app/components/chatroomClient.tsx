"use client"
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"


interface Message{
    message:string,
    id?:number
}
interface messagesProps{
    chats:Message[],
    id:number
}
export function ChatRoomClient({chats,id}:messagesProps){
    const [chat,setChats]=useState(chats)
    const {socket,loading}= useSocket();
    const[currentMessage,setCurrentMessage]=useState("");
    useEffect(()=>{
        if(socket && !loading){
           socket.send(JSON.stringify({
            type:"join-room",
            roomId:id,
            messages:"i want to join"

           }))
            socket.onmessage=(event)=>{
                
                const parsedData= JSON.parse(event.data)
              
                if(parsedData.type==="chat"){
                   
                    setChats(c=>[...c,{message:parsedData.message}])
                }
               
            }
        }
    },[socket,loading,id])
   
    return<div>
        <div>
        {chat.map((m,index)=><div key={m?.id||`message-${index}`}> {m.message} </div>)}
        
        </div>
    
        <div>
            <input value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}} style={{padding:10,textAlign:"center"}}>
            </input>
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:"chat",
                    roomId:id,
                    message:currentMessage


                }))
                setCurrentMessage("");
            }} style={{padding:10,textAlign:"center"}}>send</button>
        </div>
    </div>
    
} 