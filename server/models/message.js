import mongoose,{ model, Model, models, Schema } from "mongoose";

const schema= new Schema({
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    attachments:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
});

export const Message=models.Message || model("Message",schema)