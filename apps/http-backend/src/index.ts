import { string, z } from "zod";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { userMiddleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { signinBody, userbody } from "@repo/common/types";
import { User } from "@repo/database/database";
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
        const user = await User.create({
            userName,
            firstName,
            lastName,
            password: hashedPassword
        })
        if (!user) {
            res.status(401).json({
                msg: "userName already exist"
            })
        }
        else {
            res.status(200).json({
                msg: "signed in"
            })
        }
    }
    catch(e){
        res.status(401).json({
            msg:"internal server error ",
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
    try{
    const userName=req.body.userName;
    const password=req.body.password;

    const user= await User.findOne({userName});
    if(!user){
        res.status(404).json({
            msg:"invalid username"
        })
        return
    }
else{
    const passwordMatch= await bcrypt.compare(password,user?.password) ;
    if(!passwordMatch)
    {
        res.json({
            msg:"invalid password"
        })
        return
    }
    else{
        const token= jwt.sign({id:user._id},JWT_SECRET)
        res.json({
           token:token,
           msg:"you are signed in"
        })
    }
}
 }
 catch(e){
    res.json({
        msg:"internal server error",
        error:e
    })
 }
})

app.post("/room",userMiddleware, (req, res) => {
  console.log("create room");
  res.json({
    room:"123"
  })
 
})
app.listen(3000);