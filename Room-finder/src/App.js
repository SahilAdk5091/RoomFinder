import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Login from './Components/Login/Login'
import Signup from './Components/Form/Signup'


function App() {
  return (
    <Router>
    <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
