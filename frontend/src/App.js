import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Heading from './components/Heading';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

import { Helmet } from 'react-helmet';
import AddExpense from './components/AddExpense';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './reducers/authSlice';
import { useMediaQuery } from '@mui/material';
import { closeNavbar } from './reducers/hamStateSlice';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const expanded = useSelector((state) => state.hamState.expanded)
  const state = useMediaQuery("(min-width:425px)");

  useEffect(() => {
    ; (
      async () => {
        const token = localStorage.getItem("logintokens");
        try {
          // const token = Cookies.get("logintokens");
          console.log(token);

          // const res = await fetch("https://exptrackerbackend.onrender.com/getcurrentuser", {
          const res = await fetch("http://20.244.32.182:5000/getcurrentuser", {
            method: "GET",
            headers: {
              Accept: "appliation/json",
              'Authorization': `Bearer ${token}`,
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
            if (location.pathname !== "/signin" && location.pathname !== "/signup") {
              navigate("/signin")
            }
          }
        }
        catch (error) {
          console.log(error);
        }
        setLoading(true)
      }
    )()
  }, [dispatch, navigate, location])
  return loading ? (
    <>
      <div className="App bg-gray-800 h-screen bg-fixed">
        <Helmet>
          <title>Expense Tracker</title>
        </Helmet>
        <div className="flex flex-col border-b-2 border-b-white mx-2">
          <Heading />
          <div
            className="my-0 sm:my-2 sm:pt-1 max-[425px]:bg-green-600 max-[425px]:h-56 pb-1.5 relative min-[425px]:max-sm:h-14"
            style={expanded || state ? null : { display: "none" }}
          >
            <Navbar />
          </div>
        </div>
        <div onClick={() => dispatch(closeNavbar())}>
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
            <Route path='/analysis' Component={Analysis} />
          </Routes>
        </div>
      </div>
    </>
  ) : (<div className="App bg-gray-800 h-screen bg-fixed">loading</div>);
}

export default App;
