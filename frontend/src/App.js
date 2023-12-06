import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Heading from './components/Heading';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <div className="App bg-gray-800 h-screen bg-fixed">
        <Helmet>
          <title>Expense Tracker</title>
        </Helmet>
        <div className="flex flex-col border-b-2 border-b-white mx-2">
          <Heading />
          <Navbar />
        </div>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/signin' Component={Login} />
          <Route path='/signup' Component={Register} />
        </Routes>
      </div>
    </>
  );
}

export default App;
