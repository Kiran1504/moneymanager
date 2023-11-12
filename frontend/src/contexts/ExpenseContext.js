import { createContext, useContext } from "react";

export const ExpenseContext = createContext({
    email: "",
    expenses: [],
})

export const ExpenseProvider = ExpenseContext.Provider

export const useExpContext = ()=>{
    return useContext(ExpenseContext)
}