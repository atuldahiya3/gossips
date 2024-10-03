export const getOtherMembers=(members,user_id)=>{
    members.find((member)=>member._id.toString() !==user_id.toString())
}