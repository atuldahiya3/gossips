import Home from  "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./pages/Chat"
import Group from "./pages/Group"

// const Home=lazy(() => import("./pages/Home"));

function App() {

  return (
   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chats/:chatId' element={<Chat/>}/>
        <Route path='/groups' element={<Group/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
