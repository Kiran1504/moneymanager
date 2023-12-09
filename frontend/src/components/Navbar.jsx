import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../app/authSlice";

const Navbar = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state) => state.status);
    const navigate = useNavigate()


    const logoutUser = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "appliation/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
            const data = await res.json()
            if (data) {
                console.log("logout successfully");
                dispatch(logout())
                navigate("/signin")
            }

        } catch (error) {
            console.log(error);
        }
    }


    const classes = ({ isActive, isPending }) =>
        isActive
            ? "bg-white text-black h-full p-3 md:p-4 min-[876px]:px-14 text-xs px-2 md:text-lg  w-1/4 rounded-md  text-center m-1 shadow-red-400/40 drop-shadow-xl"
            : "bg-black hover:bg-zinc-500 text-white hover:text-white h-full p-3 md:p-4 min-[876px]:px-14 text-sm px-2 md:text-lg  w-1/4 rounded-md  text-center m-1";

    return (
        <>
            <div className="my-2">
                <ul className=" flex min-[425px]:flex-row flex-col mx-auto z-10 max-[425px]:top-5 relative justify-center align-middle max-[425px]:h-40  font-semibold sm:h-14 md:h-16 sm: sm:text-lg">
                    <li className=" m-4 max-[425px]:m-3 max-[425px]:mx-auto  hover:-translate-y-1  z-10 relative">
                        <NavLink to="/" className={classes}>Home</NavLink>
                    </li>

                    {/* <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative ">
                        <NavLink to="/budget" className={classes}>Budget</NavLink>
                    </li>

                    <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative ">
                        <NavLink to="/analysis" className={classes}>Analysis</NavLink>
                    </li> */}

                    {/* <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative ">
                        <NavLink to="/aboutus" className={classes}>About US</NavLink>
                    </li> */}

                    {!loginStatus ? (<>
                        <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative ">
                            <NavLink to="/signin" className={classes}>Login</NavLink>
                        </li>
                        <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative ">
                            <NavLink to="/signup" className={classes}>Register</NavLink>
                        </li>
                    </>) :
                        (<>
                            <li className="m-4 max-[425px]:m-3 max-[425px]:mx-auto hover:-translate-y-1  z-10 relative  ">
                                <NavLink className="bg-black text-white hover:bg-zinc-500 h-full p-3 md:p-4 min-[876px]:px-14 text-xs px-2 md:text-lg  w-1/4 rounded-md  text-center m-1" onClick={logoutUser}>Logout</NavLink>
                            </li>
                        </>)}


                </ul>
            </div>
        </>
    );
}

export default Navbar