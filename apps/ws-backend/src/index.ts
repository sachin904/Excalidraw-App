import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/database/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";


const wss = new WebSocketServer({ port: 8080 });

interface Users {
  ws: WebSocket,
  userId: string,
  rooms: string[]
}
const users: Users[] = [];
function checkUsers(token: string): string | null {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (typeof decode === "string") {
      return null;
    }
    if (!decode || !decode.userId) {
      return null;
    }
    return decode.userId
  }
  catch (e) {
    return null;
  }

}
wss.on("connection", function connection(ws, request) {

  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUsers(token);
  
    if (userId == null) {
      ws.close();
      return null
    }
    users.push({
      userId,
      rooms: [],
      ws
    })
    ws.on("message", async function message(data) {
      try {
      let parsedData;
      if(typeof data!=="string"){
        parsedData=JSON.parse(data.toString());

      }
      else{
        parsedData=JSON.parse(data);
      }
      if (parsedData.type === "join-room") {
        const user = users.find(x => x.ws === ws);
        user?.rooms.push(parsedData.roomId)
        console.log("joined room:"+user?.rooms)
      }
      if (parsedData.type === "leave-room") {
        const user = users.find(x => x.ws === ws);
        if (!user) {
          return;
        }
        user.rooms = user.rooms.filter(x => x !== parsedData.roomId)
        console.log(user.rooms);
      }
      console.log("message recieved");
      console.log(parsedData);
      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        await prismaClient.shape.create({
          data:{
            userId,
            roomId:Number(roomId),
            strokes:message
          }
        });
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
           const messagesent= user.ws.send(JSON.stringify({
              type: parsedData.type,
              message: message,
              roomId
            }));
            console.log("messagesent:"+messagesent,roomId);
          }
          
        });

      }
    }
      catch (e) {
        console.error("error in websocket:",e)
       return null;
      }
    });
  
 
});



