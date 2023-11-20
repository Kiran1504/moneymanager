import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';


const Heading = () => {
    const [hamstate, setHamState] = useState(false)
    return (
        <div className='bg-indigo-600 w-full h-14 flex justify-center md:h-20'>
            <div className='text-white text-3xl md:text-4xl font-bold h-full flex p-2 items-center justify-center'>
                Expense Tracker
            </div>
            <div className="mr-2 text-right min-[425px]:hidden max-h-12" onClick={() => setHamState(!hamstate)}><MenuIcon /></div>
        </div>
    )
}

export default Heading
