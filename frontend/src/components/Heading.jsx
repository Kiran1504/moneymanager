import React, { } from 'react'
// import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Heading = () => {
    const loginStatus = useSelector((state) => state.status);
    // const user = useSelector((state) => state.user);
    const userName = useSelector((state) => state.userName);
    // const [hamstate, setHamState] = useState(false)
    return (
        <div className='bg-green-600 w-full h-14 flex justify-center md:h-20 items-center border-b-2 border-b-white'>
            <div className='text-white text-3xl md:text-4xl font-bold h-full flex p-2 items-center justify-center'>
                Expense Tracker
            </div>
            {/* <div className="mr-2 text-right min-[425px]:hidden max-h-12" onClick={() => setHamState(!hamstate)}><MenuIcon /></div> */}
            {loginStatus ? <>
                <div className='absolute right-14 text-white text-lg font-medium'><AccountCircleOutlinedIcon className='text-white' />{"  " + userName}</div>
            </> : <div className='absolute right-5 text-white'></div>}
        </div>
    )
}

export default Heading
