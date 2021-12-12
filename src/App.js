import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">

      <Header />


      <Routes>

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />


      </Routes>

    </div>
  );
}

export default App;
