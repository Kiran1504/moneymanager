import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import AddExpense from '../components/AddExpense'

const Home = () => {
    const [update, setUpdate] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const refresh = () => {
        console.log("refreshing");
        setUpdate(!update);
    }

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
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fun();
    }, [update])
    return (
        <div className=" flex h-3/4 gap-2 flex-col-reverse lg:flex-row max-[1024px]:h-screen bg-inherit justify-center">
            <Table tableItem={expenses} />
            <AddExpense refreshPage={refresh} />
        </div>
    )
}

export default Home
