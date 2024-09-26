import mongoose,{ model, Model, models, Schema } from "mongoose";

const schema= new Schema({
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending",  "accepted", "rejected"]
    }
},{
    timestamps:true
});


export const Request=models.Request || model("Request",schema)