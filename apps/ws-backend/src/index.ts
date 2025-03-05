import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer } from "ws";


const wss = new WebSocketServer({port:8081});

wss.on("connection",function connection(ws,request){ 

  const url= request.url;
  if(!url){
    return;
  }
  const queryParams= new URLSearchParams(url.split('?')[1]);
  const token= queryParams.get("token")||"";
  const decode= jwt.verify(token,JWT_SECRET);
  if(!decode||!(decode as JwtPayload).id){
    ws.close();
    return;
  }
      ws.on("message",function message(data){
        console.log("recieved %s",data);
      });
});