import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjYyN2Q5OS1lZDIwLTQwYTctYmRkMi0yMzAzYTRiYjUyNzgiLCJpYXQiOjE3NDE1OTEwMDB9.j0CVF7wGH8lb_8rrn1mjVPVyqGmnAswi3Z0ZU3uZQqY`);
        ws.onopen=function(){
            setLoading(false);
            setSocket(ws);
        }
    },[]);
    return{
        loading,socket
    }

} 