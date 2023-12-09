import React, { useState } from 'react'
import CategoryList from './CategoryList';
import { useDispatch } from 'react-redux';
import { addExpense } from '../features/expense/expenseSlice';

const AddExpense = ({ refreshPage }) => {
    const [drop, setdrop] = useState(false);
    const [amount, setamount] = useState("");
    const [category, setcategory] = useState("");
    const [date, setdate] = useState("");

    const dispatch = useDispatch();

    const [incomemode, setincomemode] = useState(false);
    const [expensemode, setexpensemode] = useState(true);

    const dropdown = () => {
        setdrop(!drop);
    };
    const changemode = () => {
        setincomemode(!incomemode);
        setexpensemode(!expensemode);
        if (category === "Income") {
            setcategory("");
        }
        else {
            setcategory("Income");
        }
        setdrop(false)
    };
    const chngcat = (event) => {
        setcategory(event.target.value);
    }

    const addExp = async (event) => {
        event.preventDefault();
        dispatch(addExpense({
            category,
            date,
            amount
        }))
        try {
            const res = await fetch("/addexpense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date,
                    category,
                    amount,
                }),
            });
            const data = await res.json();
            console.log(data);
            if (data.error) {
                window.alert(data.error);
            }
            setamount("");
            setcategory("");
            setdate("");
            setincomemode(false);
            setexpensemode(true);
            setdrop(false);
            ; (refreshPage)()
        } catch (error) {
        }
    }

    return (
        <div className=" rounded-xl p-2 h-full lg:w-2/6 lg:m-2 sm:w-1/2 md:w-1/3 m-auto my-2 font-Ubuntu max-[425px]:w-full max-[425px]:m-2 max-[425px]:mx-auto max-[640px]:w-3/4">
            <div className="border-2 h-full border-gray-600 rounded-xl max-[425px]:m-4">
                <div className="flex justify-center border-b-yellow-700 border-b-2">
                    <h3
                        className='lg:text-xl font-semibold lg:m-4 sm:m-3 px-3 m-2 lg:px-6 md:px-2 py-1 lg:py-2 rounded-xl'
                        onClick={changemode}
                        style={
                            incomemode
                                ? { backgroundColor: "#ddd", color: "#2fc41b" }
                                : { color: "#2fc41b" }
                        }>
                        Income
                    </h3>
                    <h3 className=" text-2xl text-white font-semibold lg:m-4 sm:m-3 px-3 m-2 lg:px-6 md:px-2 py-1 lg:py-2">
                        |
                    </h3>
                    <h3
                        className='lg:text-xl font-semibold lg:m-4 sm:m-3 px-3 m-2 lg:px-6 md:px-2 py-1 lg:py-2 rounded-xl'
                        onClick={changemode}
                        style={
                            expensemode
                                ? { backgroundColor: "#ddd", color: "rgb(220 38 38)" }
                                : { color: "rgb(220 38 38)" }
                        }>
                        Expense
                    </h3>
                </div>
                <div
                    className="mb-10 mt-8 mx-4 border-2 border-black text-center  bg-orange-100  shadow-xl"
                    onClick={dropdown}>
                    <ul>
                        <h3 className="text-lg font-bold m-2 px-2">
                            Categories {category ? " : " + category : ""}
                        </h3>
                        {drop && expensemode ? (
                            <div className=" text-md text-black font-medium grid gap-2">
                                <CategoryList change={chngcat} val={"Grocery"} />
                                <CategoryList change={chngcat} val={"Medical"} />
                                <CategoryList change={chngcat} val={"Stationary"} />
                                <CategoryList change={chngcat} val={"Petrol"} />
                                <CategoryList change={chngcat} val={"Rent"} />
                                <CategoryList change={chngcat} val={"Miscelleneous"} />
                            </div>
                        ) : null}
                    </ul>
                </div>

                <div className="my-24 text-center mx-auto ">
                    <h3 className=" font-Ubuntu text-white">Enter the amount</h3>
                    <form onSubmit={addExp}>
                        <input
                            type="number"
                            onChange={(e) => {
                                setamount(e.target.value);
                                setdate(new Date().toLocaleDateString());
                            }}
                            value={amount}
                            placeholder="Enter the amount"
                            name="amount"
                            className=" border-2 w-3/4 m-2 text-xl p-2 border-black outline-none rounded-xl"
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-green-400 px-10 py-3 my-4 font-semibold"
                        >
                            {" "}
                            Save{" "}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddExpense
