import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/database/client";
import { userMiddleware } from "./middleware";

import { roomBody, signinBody, userbody } from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";

declare global {
    namespace Express {
        export interface Request {
            userId?: string;
        }
    }
}
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

    const parseData = userbody.safeParse(req.body);
    if (!parseData.success) {
        res.status(401).json({
            msg: "invalid input",
            error: parseData.error

        })
        return
    }

    try {
        const userName = req.body.userName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await prismaClient.user.create({
            data: {
                userName,
                firstName,
                lastName,
                password: hashedPassword
            }
        })
        if (user) {
            res.status(403).json({
                userid: user.id,
                msg: "you are signed in"
            });
        }

    }
    catch (e) {
        res.json({
            msg: "username already exists ",
            error: e

        })
    }

})
app.post("/signin", async function (req, res) {


    const parseData = signinBody.safeParse(req.body);
    if (!parseData.success) {
        res.status(401).json({
            msg: "invalid input",
            error: parseData.error
        })
        return
    }
    try {
        const user1 = await prismaClient.user.findFirst({
            where: {
                userName: parseData.data.userName
            }

        })

        if (!user1) {
            res.status(403).json({
                msg: "invalid username"
            })
            return
        }

        const passwordMatch = await bcrypt.compare(parseData.data.password, user1?.password!)
        if (!passwordMatch) {
            res.status(403).json({
                msg: "wrong password"
            })
            return
        }


        const token = jwt.sign({
            userId: user1?.id
        }, JWT_SECRET)

        res.status(200).json({
            msg: "you are signed in ",
            token: token
        })
    }
    catch (e) {
        res.json({
            msg: "internal server error",
            error: e
        })
    }


})

app.post("/room", userMiddleware, async (req, res) => {
    console.log("checkpoint 1");
    const room = roomBody.safeParse(req.body);
    if (!room.success) {
        res.json({
            msg: "invalid input",
            error: room.error
        })
    }
    try{
    const slug = req.body.name;
    const adminId = req.userId;
    if (!adminId) {
        res.status(403).json({ msg: "User ID missing, authentication failed" });
        return
    }
    const room1 = await prismaClient.room.create({
        data: {
            slug: slug,
            adminId: adminId

        }
    });
    if (room1) {
        res.json({
            msg: "room created",
            roomId: room1.id
        })
    }
}
catch(e){
    res.json({
        msg:"room exist with same name",
        error:e
    })
}



})
 
app.get("/chat/:roomId",async function(req,res){
    try{
    const roomId=Number(req.params['roomId'])
    const chats= await prismaClient.chat.findMany({
        where:{
            roomId
        },
        take:50,
        orderBy:{
            id:"desc"
        }
    });
    res.json({
        chats:chats
    });
}
    catch(e){
        res.json({
            msg:"internal server error",
            error:e
        })
    }
})
app.get("/room/:slug",async function(req,res){
    const slug=(req.params["slug"]);

    const room= await prismaClient.room.findFirst({
        where:{
            slug
        }
    })
    res.status(200).json({
        room:room
    })

})
app.listen(3000);