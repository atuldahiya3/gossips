import { model, Model, models, Schema } from "mongoose";

const schema= new Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
},{
    timestamps:true
});

export const User=models.User || model("User",schema)