// import { userSocketIds } from "../App.js"

export const getOtherMembers=(members,user_id)=>{
    members.find((member)=>member._id.toString() !==user_id.toString())
}

// export const getSockets=(users)=>{
//     return users.map((user)=> userSocketIds.get(user._id.toString()))
// }