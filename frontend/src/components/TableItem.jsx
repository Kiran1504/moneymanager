import React, { memo } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { removeTodo } from '../features/todo/todoSlice'

const TableItem = ({ id, category, date, amount, deleteExp }) => {

    const deleteExpense = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("logintokens");
            const res = await fetch("http://20.244.32.182:5000/deleteexpense", {
                // const res = await fetch("https://exptrackerbackend.onrender.com/deleteexpense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    id
                }),
            });
            const data = await res.json();
            console.log(data);
            if (data.error) {
                window.alert("Expense not deleted");
            } else {
                ; (deleteExp)()
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <li>
            <div className="mx-6 my-4 rounded-lg bg-red-500 h-24 transition ease-in-out delay-50 hover:scale-105">
                <div className="bg-white h-full rounded-lg" style={{ width: "99%" }} >
                    <div className='flex flex-row justify-between w-full'>
                        <div className="h-12 p-2 px-4 mx-2 my-1 w-1/2 text-left font-bold text-2xl lg:text-3xl border-b-4 border-zinc-500" style={(category === "Income") ? { color: "#2fc41b" } : { color: "rgb(220 38 38)" }}>{category}</div>
                        <div className="h-10 px-4 mx-2 my-2 w-1/2 col-start-5 font-medium text-right text-2xl lg:text-3xl " style={(category === "Income") ? { color: "#2fc41b" } : { color: "rgb(220 38 38)" }}>{amount}</div>
                    </div>
                    <div className='flex flex-row justify-between w-full'>
                        <div className="lg:text-lg px-4 mx-2 text-left my-1"> {date} </div>
                        <div className="lg:text-lg md:px-4 mx-2"><button onClick={deleteExpense} className=" bg-red-600 py-1 px-4 rounded-xl text-white">Delete</button></div>
                    </div>
                </div>
            </div>
            {/* <div className="mx-6 my-4 rounded-lg bg-red-500 h-24 transition ease-in-out delay-50 hover:scale-105">
                <div className="bg-white grid grid-cols-6 h-full grid-rows-4 rounded-lg" style={{ width: "99%" }} >
                    <div className='flex flex-row justify-center w-full'>
                        <div className="h-12 p-2 px-4 mx-2 my-1 w-1/2 row-span-2 min-[319px]:col-span-3 text-left md:col-span-5 font-bold text-2xl lg:text-3xl border-b-4 border-zinc-500" style={(category === "Income") ? { color: "#2fc41b" } : { color: "rgb(220 38 38)" }}>{category}</div>
                        <div className="h-8 px-4 mx-2 my-1 w-1/2 row-span-2 min-[319px]:col-span-3 col-start-5 max-[320px]:col-start-2 md:col-start-6 font-medium text-right text-2xl lg:text-3xl " style={(category === "Income") ? { color: "#2fc41b" } : { color: "rgb(220 38 38)" }}>{amount}</div>
                    </div>
                    <div className='flex flex-row justify-center w-full'>
                        <div className=" col-span-4 min-[319px]:col-span-4 row-span-1 lg:text-lg px-4 mx-2 text-left my-1"> {date} </div>
                        <div className=" col-span-1 md:col-start-6 col-start-5 max-[320px]:col-start-2 row-span-2 lg:text-lg md:px-4 mx-2 "><button onClick={deleteExpense} className=" bg-red-600 py-1 px-4 mr-8 rounded-xl text-white">Delete</button></div>
                    </div>
                </div>
            </div> */}
        </li>
    )
}

export default memo(TableItem)
