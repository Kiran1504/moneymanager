import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Heading from './components/Heading';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="flex flex-col">
        <Heading />
        <Navbar />
      </div>
      <Routes>
        <Route path='/signin' Component={Login} />
        <Route path='/signup' Component={Register} />
      </Routes>
    </div>
  );
}

export default App;
