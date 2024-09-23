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
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const Admin = () => {
    const isAdmin=false;
    const secretKey=useInputValidation("")

    const handleSubmit=()=>{
        console.log("admin logged in");
    }

    if(isAdmin) return <Navigate to={"/admin/dashboard"}/>
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
        <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                marginTop: "1rem",
                width: "100%",
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Secret Key"
                type="password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
              
            </form>
          </>
      </Paper>
    </Container>
  </div>
  )
}

export default Admin