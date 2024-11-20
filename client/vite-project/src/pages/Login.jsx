// import React from 'react'
import {
  Avatar,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useFileHandler, useInputValidation } from "6pp";

import { VirtuallyHiddenIcon } from "../components/StylesComponents";
import { usernameValidator } from "../utils/Validators";
import axios from "axios";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const status = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  // const password=useStrongPassword() //initial password must be empty
  const password = useInputValidation(""); //not using passwordValidator for testing only
  const avatar = useFileHandler("single"); // 10 represents max size in mb
  const dispatch=useDispatch();
  const handleLogIn =async (e) => {
    e.preventDefault();
    const config={
      withCredentials:true,
      headers:{
        "Content-type":"application/json"
      }
    }
    try{
      const response= await axios.post(`${server}/user/login`,{userName:username.value, password:password.value},config)
      console.log("response on login",response);
      dispatch(userExists(true))
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("user",response.data.user)
    }catch(error){
      toast.error(`${error.response.data.message}, Get lost Bitch`)
      console.log("error logging in",error);
    }
  };
  const handleSignUp =async(e) => {
    e.preventDefault();

    const formData=new FormData();
    formData.append("name",name.value)
    formData.append("status",status.value)
    formData.append("username",username.value)
    formData.append("password",password.value)
    formData.append("avatar",avatar.file)

    try{
      const response= await axios.post(`${server}/user/new`,formData,{
        withCredentials:true,
        headers:{
          "Content-type":"multipart/form-data"
        }
      })
      console.log("response on register",response);
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("user",response.data.user)
    }catch(err){
      toast.error(`${error.response.data.message}, Get lost Bitch`)
      console.log("error creating user",err);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,230,0.8))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                onSubmit={handleLogIn}
              >
                <TextField
                  label="username"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  label="password"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleLogIn}
                >
                  Login
                </Button>
                <Typography textAlign="center" margin="1rem">
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Register</Typography>
              <Stack
                sx={{ width: "10rem", position: "relative", margin: "auto" }}
              >
                <Avatar
                  sx={{ height: "10rem", width: "10rem", objectFit: "contain" }}
                  src={avatar.preview}
                />
                {avatar.error && (
                  <Typography color="error" variant="caption">
                    {avatar.error}
                  </Typography>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    // top:"10px",
                    bottom: "-30px",
                    right: "30px",
                    left: "30px",
                    color: "black",
                    backgroundColor: "rgba(0,0,0,0,5)",
                    ":hover": {
                      backgroundColor: "rgba(0,0,0,0,7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <FaCamera />
                    <VirtuallyHiddenIcon
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              <form
                style={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                onSubmit={handleSignUp}
              >
                <TextField
                  label="Name"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  label="Status"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={status.value}
                  onChange={status.changeHandler}
                />
                <TextField
                  label="username"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  label="password"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {/* {
                            password.error && (
                                <Typography color="error" variant="caption">
                                    {password.error}
                                </Typography>
                            )
                        } */}
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
                <Typography textAlign="center" margin="1rem">
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
