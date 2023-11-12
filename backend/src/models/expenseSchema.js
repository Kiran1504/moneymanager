import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
        date: {
            type:Date,
            required : true
        },
        category: {
            type:String,
            required : true
        },
        amount: {
            type:String,
            required : true
        },
})

export const expenses = mongoose.model("Expense", expenseSchema)

