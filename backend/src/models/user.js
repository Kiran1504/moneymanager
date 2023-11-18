import mongoose  from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    tokens: [
        {
            token:{
                type:String,
                required : true
            }
        }
    ],
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ]
})



/* 
 we used normal function instead of arrow function becoz 
 "arrow function doesn't have refrence or not context is known to arrow function"
 */



userSchema.pre("save", async function (req, res, next) {   
    if(!this.isModified("password")) return next();


    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)                        // return boolean
}

export const user = mongoose.Schema("User", userSchema)
