import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/database/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";


const wss = new WebSocketServer({ port: 8080 });

interface Users {
  socket: WebSocket,
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
      socket: ws
    })
    ws.on("message", async function (data) {
      try {
      const parsedData = JSON.parse(data as unknown as string);
      if (parsedData.type === "join-room") {
        const user = users.find(x => x.socket === ws);
        user?.rooms.push(parsedData.roomId)
      }
      if (parsedData.type === "leave-room") {
        const user = users.find(x => x.socket === ws);
        if (!user) {
          return;
        }
        user.rooms = user.rooms.filter(x => x !== parsedData.roomId)
        console.log(user.rooms);
      }
      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        await prismaClient.chat.create({
          data:{
            userId,
            roomId,
            message
          }
        })
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
            user.socket.send(JSON.stringify({
              type: parsedData.type,
              message: message,
              roomId
            }));
          }
        });

      }
    }
      catch (e) {
        console.error("error handling message:",e)
       return null;
      }
    });
  
 
});