import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const expenses = mongoose.model("Expense", expenseSchema)

