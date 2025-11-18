import Home from './components/Home/Home'
import ChatApp from './components/ChatApp/ChatApp'
import CreateAccount from './components/CreataAccount/CreatAccount'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import NewRoom from './components/NewRoom/NewRoom'
import PendingRequests from './components/PendingRequests/PendingRequests'
import Room from './components/Room/Room'
import RoomManagement from './components/RoomManagement/RoomManagement'
import Settings from './components/Settings/Settings'
import { Route, Routes} from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ChatApp' element={<ChatApp/>}/>
          <Route path='/CreateAccount' element={<CreateAccount/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Navbar' element={<Navbar/>}/>
          <Route path='/NewRoom' element={<NewRoom/>}/>
          <Route path='/PendingRequests' element={<PendingRequests/>}/>
          <Route path='/Room' element={<Room/>}/>
          <Route path='/RoomManagement' element={<RoomManagement/>}/>
          <Route path='/Settings' element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App
