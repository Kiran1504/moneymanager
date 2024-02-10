import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import AddExpense from '../components/AddExpense'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [update, setUpdate] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const refresh = () => {
        setUpdate(!update);
    }

    const loginStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const fun = async () => {

        try {
            // const token = sessionStorage.getItem('logintokens');
            const res = await fetch("https://exptrackerbackend.onrender.com/updatelist", {
                method: "GET",
                headers: {
                    Accept: "appliation/json",
                    'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
                    "Content-Type": "application/json",
                },
                credentials: 'include',

            })
            console.log(document.cookie);
            const data = await res.json()
            if (data) {
                setExpenses(data.expenses);
                setLoading(true);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fun();
    }, [update, loginStatus, navigate])
    return loading ? (
        <>
            <div className="flex flex-col sm:flex-row-reverse sm:justify-center sm:gap-4 h-5/6 w-full bg-inherit sm:overflow-hidden">
                <div className="md:h-full max-[620px]:w-full max-[640px]:w-1/2 max-[640px]:mx-auto h-5/6 bg-inherit my-4">
                    <AddExpense refreshPage={refresh} />
                </div>
                <div className="h-full md:w-2/3 bg-inherit my-4">
                    <Table tableItem={expenses} refreshPage={refresh} />
                </div>
            </div>
        </>
    ) : <div>loading</div>
}

export default Home
