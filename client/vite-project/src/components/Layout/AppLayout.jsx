import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Title from '../Shared/Title';
import { Grid } from '@mui/material';

const AppLayout = () => (WrappedComponent) => {
  return (props)=>{
    return (
    <div>
        <Title/>
        <Header/>
        {/* <Grid container height={"calc(100vh-4rem)"}> */}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid item sm={4} md={3}
          sx={{xs:"none", sm:"block"}}
          height={"100%"}
          >
            one
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            two
          </Grid>
          <Grid item md={4} lg={3}
          sx={{display:{xs:"none", sm:"block"}, padding:"2rem", bgcolor:"red"}}
          height={"100%"}
          >
            three
          </Grid>
        </Grid>
        <WrappedComponent {...props}/>
        <Footer/>
    </div>
    );
  };
}

export default AppLayout