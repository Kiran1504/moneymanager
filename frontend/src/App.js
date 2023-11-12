
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signin' Component={Login}/>
        <Route path='/signup' Component={Register}/>
      </Routes>
    </div>
  );
}

export default App;
