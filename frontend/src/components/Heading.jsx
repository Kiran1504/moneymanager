import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { toggleNavbar } from '../reducers/hamStateSlice';


const Heading = () => {
    const loginStatus = useSelector((state) => state.auth.status);
    // const user = useSelector((state) => state.user);
    const userName = useSelector((state) => state.auth.userName);
    const dispatch = useDispatch();
    return (
        <div className='bg-green-600 w-full h-14 flex flex-col md:flex-row justify-center md:h-20 items-center border-b-2 border-b-white'>
            <div
                className="absolute left-6 bg-black text-white rounded-lg mr-2 text-right min-[425px]:hidden max-h-12"
                onClick={() => dispatch(toggleNavbar())}
            >
                <MenuIcon />
            </div>
            <div className='text-white text-3xl md:text-4xl font-bold h-full flex p-2 items-center justify-center'>
                Expense Tracker
            </div>
            {loginStatus ? <>
                <div className='absolute right-8 md:right-14 text-white text-lg font-medium'><AccountCircleOutlinedIcon className='text-white' /><span className='hidden md:inline'>{"  " + userName}</span></div>
            </> : <div className='absolute right-5 text-white'></div>}
        </div>
    )
}

export default Heading
