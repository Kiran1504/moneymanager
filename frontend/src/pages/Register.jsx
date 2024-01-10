import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleinputs = (event) => {
    // console.log("kiran");
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const submitted = async (event) => {
    event.preventDefault()
    const { name, email, password } = user
    const res = await fetch("https://expensebackend-5n0o.onrender.com/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    })
    console.log(res);
    const data = await res.json()
    if (data.error) {
      alert(data.message)
      console.log(data.message);
    } else {
      alert(data.message)
      console.log(data.message);
      navigate("/signin")
    }
  }
  return (
    <div className="text-center w-full text-white">
      <h1 className="font-bold text-3xl my-8 text-white">Sign Up</h1>
      <form
        method="POST"
        className="border-2 border-gray-600 m-auto w-2/3 md:w-1/3 rounded-xl p-4"
      >
        <div className="grid-input">
          <div className="text-lg my-3">
            <label className="mx-3 text-white mb-2">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleinputs}
              className="bg-gray-400 placeholder:text-black text-black outline-none rounded-xl px-2 py-1"
            />
          </div>

          <div className="text-lg my-3">
            <label className="mx-3 text-white mb-2">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleinputs}
              className="bg-gray-400 placeholder:text-black text-black outline-none rounded-xl px-2 py-1"
            />
          </div>


          <div className="text-lg my-3">
            <label className="mx-3 text-white mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleinputs}
              className="bg-gray-400 placeholder:text-black text-black outline-none rounded-xl px-2 py-1"
            />
          </div>


        </div>
        <div>
          <input
            type="submit"
            onClick={submitted}
            className="rounded-xl text-black bg-green-300 px-4 py-2 my-2"
          />
          <p>
            Already have an account?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/signin")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
