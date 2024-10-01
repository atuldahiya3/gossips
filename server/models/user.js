import { hash } from "bcrypt";
import mongoose,{ model, Model, Schema } from "mongoose";

const schema= new Schema({
    name:{
        type:String,
        required:true
    },
    bio:{
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

schema.pre("save", async function(next){
    if(!this.isModified("password")) next();
    this.password=await hash(this.password,10)
})

export const User=mongoose.models.User || model("User",schema)