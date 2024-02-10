import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    expenses: [
        {
            date: {
                type: String,
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
        }
    ],
});

/* 
 we used normal function instead of arrow function becoz 
 "arrow function doesn't have refrence or not context is known to arrow function"
 */

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // return boolean
};

userSchema.methods.generateAuthToken = async function () {
    try {
        const newToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        // this.tokens = this.tokens.concat({ token: newToken })
        // await this.save();
        return newToken
    } catch (error) {
        console.log(error);
    }
}

export const user = mongoose.model("User", userSchema);

