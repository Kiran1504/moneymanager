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

    const loginStatus = useSelector((state) => state.status);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const fun = async () => {

        try {
            const res = await fetch("/updatelist", {
                method: "GET",
                headers: {
                    Accept: "appliation/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
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
        <div className=" flex h-3/4 gap-2 flex-col-reverse lg:flex-row max-[1024px]:h-screen bg-inherit justify-center">
            <Table tableItem={expenses} refreshPage={refresh} />
            <AddExpense refreshPage={refresh} />
        </div>
    ) : <div>loading</div>
}

export default Home
