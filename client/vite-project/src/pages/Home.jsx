import React from 'react'
import AppLayout from '../components/Layout/AppLayout'
import { Stack, Typography } from '@mui/material'
import { lightPink } from '../constants/colour'

const Home = () => {
  return (
    <Stack height={"100vh"} bgcolor={lightPink}>
      <Typography variant='h5' textAlign={"center"} paddingTop={"40vh"} >Select a friend to chat</Typography>

    </Stack>


  )
}

export default AppLayout()(Home)