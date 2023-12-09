import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Heading from './components/Heading';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Helmet } from 'react-helmet';
import AddExpense from './components/AddExpense';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './app/authSlice';
// import TableItem from './components/TableItem';

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    ; (
      async () => {
        try {
          const res = await fetch("/getcurrentuser", {
            method: "GET",
            headers: {
              Accept: "appliation/json",
              "Content-Type": "application/json",
            },
            credentials: 'include'
          })
          const data = await res.json()
          if (data.user) {
            dispatch(login({ user: data.user.email, name: data.user.name }))
          }
          else {
            dispatch(logout())
            navigate("/signin")
          }
        }
        catch (error) {
          console.log(error);
        }
        setLoading(true)
      }
    )()
  }, [dispatch, navigate])
  return loading ? (
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
          <Route path='/home' Component={() => {
            return <>
              {/* <TableItem /> */}
              <AddExpense />

            </>
          }} />
          <Route path='/signin' Component={Login} />
          <Route path='/signup' Component={Register} />
        </Routes>
      </div>
    </>
  ) : (<div className="App bg-gray-800 h-screen bg-fixed">loading</div>);
}

export default App;
