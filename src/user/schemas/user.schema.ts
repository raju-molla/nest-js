import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
    },
    isDelete:{
        type:String,
        default:false,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})