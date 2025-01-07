const corsOption={
    origin:["http://127.0.0.1:5173","http://localhost:3000", process.env.CLIENT_URL],
    credentials:true
}
const GOSSIPS_TOKEN="gossips-token"

export {corsOption,GOSSIPS_TOKEN}