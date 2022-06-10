
import { Document } from "mongoose";
export interface User extends Document {
    name:string;
    age:number;
    email:string;
    password:string;
    isDelete:string;
    createAt:Date
}