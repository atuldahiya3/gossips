import ProtectRoutes from "./components/Auth/ProtectRoutes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import { LayoutLoader } from "./components/Layout/Loaders";

const Home=lazy(() => import("./pages/Home")); 
const Chat=lazy(() => import("./pages/Chat")); 
const Group=lazy(() => import("./pages/Group")); 
const Login=lazy(() => import("./pages/Login")); 
const NotFound=lazy(() => import("./pages/NotFound")); 
const user=true;
const App=()=> {

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
        
        <Route path="*" element={<NotFound/>} />   {/* if some unmatched url is typed then it will be redirected to not found page */}

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
