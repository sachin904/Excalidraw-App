import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZWJlNTFmNy1kMDFjLTQ5ZmItYWM3OC1hZGE5YWIzYTlmOGYiLCJpYXQiOjE3NDEyODUyNjd9.n7QNmTUa0qYnc4KuySRCp7dKxsKJey0QMhWboLAqv-E`);
        ws.onopen=function(){
            setLoading(false);
            setSocket(ws);
        }
    },[]);
    return{
        loading,socket
    }

} 