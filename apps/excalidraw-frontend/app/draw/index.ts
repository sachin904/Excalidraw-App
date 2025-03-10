import axios from "axios";
import { BACKEND_URL } from "../config";



type  shapes={
   type:"rectangle";
    X:number;
    Y:number;
    height:number;
    width:number;

 }|
 {
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number;
 }
 
export async  function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
   
    const ctx=canvas.getContext("2d");

    const existingShape:shapes[] = await getExistingShape(roomId);
    console.log(existingShape);
    if(!ctx){
        return;
    }
   
    socket.onmessage=(event)=>{
        const message=JSON.parse(event.data);
        if(message.type=="chat"){
            const parshedShape=JSON.parse(message.message);
            existingShape.push(parshedShape.shape);
            console.log("parshedShape come from ws as chat:"+parshedShape)
            console.log("existing shape after chat come:"+existingShape)

            clearCanvas(ctx ,canvas,existingShape);
        }
    }

    clearCanvas(ctx,canvas,existingShape);
    let clicked =false;
    let startX=0;
    let startY=0;
     canvas.addEventListener("mousedown",(e)=>{
        clicked=true;
        startX=(e.clientX);
        startY=(e.clientY);
    })
    canvas.addEventListener("mouseup",(e)=>{
         clicked=false;
         const width=e.clientX-startX;
         const height=e.clientY-startY;
         const shape:shapes= {
                type:"rectangle",
                X:startX,
                Y:startY,
                height,
                width
             }
             existingShape.push(shape)
         socket.send(JSON.stringify({
            type:"chat",
            roomId:Number(roomId),
            message:JSON.stringify({
                shape
            })
         }))
      
       
        
    })
    canvas.addEventListener("mousemove",(e)=>{

        if(clicked)
           {
            const width=e.clientX-startX;
            const height=e.clientY-startY;
             clearCanvas(ctx,canvas,existingShape);
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.strokeRect(startX,startY,width,height);
        }
        
    })
}
function clearCanvas(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,existingShape:shapes[]){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(0,0,0)";
    ctx.fillRect(0,0,canvas.height,canvas.width);
    
    existingShape.map((shapes)=>{
        if(shapes.type==="rectangle"){
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.strokeRect(shapes.X,shapes.Y,shapes.width,shapes.height);
        }
        
    })

}
async function getExistingShape(roomId:string){
   
   const response=await axios.get(`${BACKEND_URL}/shape/${roomId}`);
   
   const messages=response.data.shapes;
 
   const shapes=messages.map((strokesObj:{strokes:string})=>{
      const parseData=JSON.parse(strokesObj.strokes);
      console.log(parseData.shape)
      return parseData.shape;
  
   })
 return shapes;
}



