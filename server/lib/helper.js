// import { userSocketIds } from "../App.js"

export const getOtherMembers=(members,user_id)=>{
    return members.find((member)=>member._id.toString() !==user_id.toString())
}

export const getSockets=(users)=>{
    return users.map((user)=> userSocketIds.get(user._id.toString()))
}

export const getBase64=(file)=> `data:${file.mimetype};base64,${file.buffer.toString("base64")}`  