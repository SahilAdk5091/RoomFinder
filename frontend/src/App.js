import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './components/About';
import AddRoom from './components/AddRoom';
import Book from './components/Book';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Home from './components/Home';
import Login from "./components/Login";
import LogNavbar from './components/LogNavbar';
import Profile from './components/Profile';
import Register from './components/Register';
import ShowRoom from './components/ShowRoom';
import UserNavbar from './components/UserNavbar';
import UserShowRoom from './components/UserShowRoom';
import ShowRoomByID from './components/ShowRoomByID';
import Afterlogin from './components/Afterlogin';
import FullAbout from './components/FullAbout';
import Oneroom from './components/Oneroom';



function App() {
  return (
    <div>
       <Router>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/usershowroom' element={<UserShowRoom />}  />
        <Route path='/contact' element={<Contact />}  />
        <Route path='/addroom' element={<AddRoom />}  />  
        <Route path='/hero' element={<Hero />}  /> 
        <Route path='/profile' element={<Profile />}  /> 
        <Route path='/usernavbar' element={<UserNavbar />}  /> 
        <Route path='/LogNavbar' element={<LogNavbar />}  /> 
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/footer' element={<Footer/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path="/book" element={<Book/>}/>
        <Route path='/showroom' element={<ShowRoom/>}/>
        <Route path='/showroobyid' element={<ShowRoomByID/>}/>
        <Route path='/after' element={<Afterlogin/>}/>
        <Route path="/fullabout" element={<FullAbout/>}/>
        <Route path="dashboard/fullabout" element={<FullAbout/>}/>
        <Route path='dashboard/find/:id' element={<Oneroom/>}/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
