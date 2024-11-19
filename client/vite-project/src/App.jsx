import ProtectRoutes from "./components/Auth/ProtectRoutes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import { LayoutLoader } from "./components/Layout/Loaders";
import axios from 'axios';
import { server } from "./constants/config";


const Home=lazy(() => import("./pages/Home")); 
const Chat=lazy(() => import("./pages/Chat")); 
const Group=lazy(() => import("./pages/Group")); 
const Login=lazy(() => import("./pages/Login")); 
const NotFound=lazy(() => import("./pages/NotFound")); 
const Admin=lazy(() => import("./pages/Admin/Admin")); 
const Dashboard=lazy(() => import("./pages/Admin/Dashboard")); 
const user=true;
const App=()=> {

  useEffect(()=>{
    axios.get(`${server}/user/myProfile`).then((res)=>{
      console.log("res",res);
    }).catch((err)=>console.log("error getting user details",err))
    
  },[])

  return (
   
      <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectRoutes user={user}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/chats/:chatId' element={<Chat/>}/>
          <Route path='/groups' element={<Group/>}/>
        </Route>
        <Route path='/login' element={
        <ProtectRoutes user={!user} redirect="/">
          <Login/>
        </ProtectRoutes>
        }/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<NotFound/>} />   {/* if some unmatched url is typed then it will be redirected to not found page */}

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
