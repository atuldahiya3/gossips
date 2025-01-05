import ProtectRoutes from "./components/Auth/ProtectRoutes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import { LayoutLoader } from "./components/Layout/Loaders";
import axios from 'axios';
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvier } from "./socket";


const Home=lazy(() => import("./pages/Home")); 
const Chat=lazy(() => import("./pages/Chat")); 
const Group=lazy(() => import("./pages/Group")); 
const Login=lazy(() => import("./pages/Login")); 
const NotFound=lazy(() => import("./pages/NotFound")); 
const Admin=lazy(() => import("./pages/Admin/Admin")); 
const Dashboard=lazy(() => import("./pages/Admin/Dashboard")); 
const App=()=> {
  const {user,isLoading}=useSelector(state=>state.auth);
  const dispatch=useDispatch()

  useEffect(()=>{
    axios.get(`${server}/user/myProfile`, {withCredentials:"true"}).then((res)=>{
      dispatch(userExists(res.data.data))
    }).catch((err)=>dispatch(userNotExists()))
    
  },[dispatch])

  return isLoading?(<LayoutLoader/>) : (
   
      <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<SocketProvier>
          <ProtectRoutes user={user}/>
        </SocketProvier>}>
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
      <Toaster position="botton-center" />
    </BrowserRouter>
  )
}

export default App
