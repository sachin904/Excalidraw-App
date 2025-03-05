
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/database/client";
import { userMiddleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { signinBody,userbody } from "@repo/common/types";

declare global{
    namespace Express{
        export interface Request{
            userId?:string;
        }
    }
}
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    
    const parseDataWithSuccess = userbody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(401).json({
            msg: "invalid input",
            error:parseDataWithSuccess.error

        })
        return
    }
       
    try{
        const userName = req.body.userName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const hashedPassword =await bcrypt.hash(password, 5);

      const user = await prismaClient.user.create({
        data:{
            userName,
            firstName,
            lastName,
            password:hashedPassword  
        }
      })
      if(!user){
        res.status(403).json({
            msg:"username already exists "
            
        })
      }
      else{
        res.json({
            userid:user.id,
            msg:"you are signed in"
        })
      }
    }
    catch(e){
        res.json({
            msg:"internal server error",
            error:e
            
        })
    }
    
})
app.post("/signin",async function (req, res) {
  
   
    const parseDataWithSuccess=signinBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.status(401).json({
            msg:"invalid input",
            error:parseDataWithSuccess.error
        })
        return
    }
    
    const userName=req.body.userName;
    const password=req.body.password;

    
})

app.post("/room",userMiddleware, (req, res) => {
  console.log("create room");
  res.json({
    room:"123"
  })
 
})
app.listen(3000);