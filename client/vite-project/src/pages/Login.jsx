// import React from 'react'
import { Avatar, Button, Container,Paper, TextField, Typography,Stack, IconButton } from "@mui/material";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import {useFileHandler, useInputValidation, useStrongPassword} from "6pp"

import { VirtuallyHiddenIcon } from "../components/StylesComponents";
import { usernameValidator } from "../utils/Validators";

function Login() {

    const [isLogin, setIsLogin] = useState(true)
    const name=useInputValidation("")
    const status=useInputValidation("")
    const username=useInputValidation("", usernameValidator)
    // const password=useStrongPassword() //initial password must be empty
    const password=useInputValidation("")  //not using passwordValidator for testing only
    const avatar= useFileHandler("single")  // 10 represents max size in mb
    
    const handleLogIn=(e)=>{
        e.preventDefault();
    }
    const handleSignUp=(e)=>{
        e.preventDefault();
    }

  return (
    <Container component={"main"} maxWidth="xs" sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Paper elevation={3} sx={{padding: "2rem", display:"flex", alignItems:"center", flexDirection:"column"}}>
            {isLogin ? (
                <>
                <Typography variant="h5">Login</Typography>
                    <form
                    style={{
                        marginTop:"1rem",
                        width:"100%"
                    }}
                    onSubmit={handleLogIn}
                    >
                        <TextField label="username" required fullWidth margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler}/>
                        <TextField label="password" type="password" required fullWidth margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler}/>
                        <Button sx={{marginTop:"1rem"}} fullWidth variant="contained" color="primary" type="submit" >Login</Button>
                        <Typography textAlign="center" margin="1rem">OR</Typography>
                        <Button  fullWidth variant="contained" color="primary" onClick={()=> setIsLogin(false)} >Sign Up</Button>
                    </form>
                    </>
            ) : 
            (
                <>
                <Typography variant="h5">Register</Typography>
                <Stack sx={{width:"10rem",position:"relative", margin:"auto" }}> 
                    <Avatar sx={{height:"10rem", width:"10rem", objectFit:"contain"}} src={avatar.preview}/>
                    {
                            avatar.error && (
                                <Typography color="error" variant="caption">
                                    {avatar.error}
                                </Typography>
                            )
                        }
                    <IconButton sx={{
                        position:"absolute",
                        // top:"10px",
                        bottom:"-30px",
                        right:"30px",
                        left:"30px",
                        color:"black",
                        backgroundColor:"rgba(0,0,0,0,5)",
                        ":hover":{
                            backgroundColor:"rgba(0,0,0,0,7)"
                        },
                    }}
                    component="label"
                    >
                        <>
                        <FaCamera/>
                        <VirtuallyHiddenIcon type="file" onChange={avatar.changeHandler}/>
                        </>
                    </IconButton>
                </Stack>
                    <form
                    style={{
                        marginTop:"1rem",
                        width:"100%"
                    }}
                    onSubmit={handleSignUp}
                    >
                        <TextField label="Name" required fullWidth margin="normal" variant="outlined" value={name.value} onChange={name.changeHandler} />
                        <TextField label="Status" required fullWidth margin="normal" variant="outlined" value={status.value} onChange={status.changeHandler}/>
                        <TextField label="username" required fullWidth margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler}/>
                        {
                            username.error && (
                                <Typography color="error" variant="caption">
                                    {username.error}
                                </Typography>
                            )
                        }
                        <TextField label="password" type="password" required fullWidth margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler}/>
                        {/* {
                            password.error && (
                                <Typography color="error" variant="caption">
                                    {password.error}
                                </Typography>
                            )
                        } */}
                        <Button sx={{marginTop:"1rem"}} fullWidth variant="contained" color="primary" type="submit" >Sign Up</Button>
                        <Typography textAlign="center" margin="1rem">OR</Typography>
                        <Button  fullWidth variant="contained" color="primary" onClick={()=> setIsLogin(true)} >Login</Button>
                    </form>
                    </>
            )}
        </Paper>

    </Container>
  )
}

export default Login