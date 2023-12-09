import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../app/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitted = async (event) => {
    event.preventDefault()
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.error) {
      alert(data.message)
      console.log(data.message);
    } else {
      dispatch(login({ user: email }))
      alert(data.message)
      console.log(data.message);
      navigate("/")
    }
  }

  return (
    <div className="text-center w-full text-white">
      <h1 className="font-bold text-3xl my-8 text-white">Log In</h1>
      <form
        method="POST"
        className="border-2 border-gray-600 m-auto w-2/3 md:w-1/3 rounded-xl p-4"
      >
        <div className="">
          <div className="text-lg my-3">
            <label className="mx-3 text-white">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-gray-400 placeholder:text-black text-black outline-none rounded-xl px-2 py-1"
            />
          </div>
          <div className="text-lg my-3">
            <label className="mx-3 text-white">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
            Don't have an account?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
