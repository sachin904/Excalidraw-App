import mongoose from "mongoose";
import {MONGO_URL} from "@repo/backend-common/config"


const Schema=mongoose.Schema;
const objectId=Schema.ObjectId;
mongoose.connect(MONGO_URL);

const userSchema= new mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true}
})

export const User= mongoose.model("users",userSchema);