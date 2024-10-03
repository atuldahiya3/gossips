import { faker } from "@faker-js/faker"
import { User } from "../models/user.js"

export const createUser=async(numUser)=>{
    try{
        const userPromise=[]

        for (let i = 0; i < numUser; i++) {
            const tempUser=User.create({
                name:faker.person.fullName(),
                userName:faker.internet.userName(),
                bio:faker.lorem.sentence(10),
                password:"password",
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName()
                }
            })
            userPromise.push(tempUser)
        }
        await Promise.all(userPromise)
        console.log("Users created successfully", numUser)
        process.exit();
    }catch(error){
        console.log("error creating fake users",error);
        process.exit(1)
    }
}