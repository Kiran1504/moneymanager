import express from "express";
import { user } from "../models/user.js"
import { expenses } from "../models/expenseSchema.js";
import { authenticate } from "../middlewares/authenticate.js";

export const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "please fill details properly", message: "please fill details properly" });
  }
  try {
    const ifuser = await user.findOne({ email })
    if (ifuser) {
      return res.status(400).json({ error: "Email already registered!!!", message: "Email already registered!!!" })
    }

    const newUser = new user({ name, email, password })
    const saveUser = await newUser.save()
    if (saveUser) {
      return res.status(201).json({ message: "User Registered successfully..." })
    }
    else {
      return res.status(500).json({ error: "User Registration failed", message: "User Registration failed" })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "please fill details properly", message: "please fill details properly" });
  }
  try {
    const ifUser = await user.findOne({ email })
    if (!ifUser) {
      return res.status(400).json({ error: "User doesn't exist!!! plzz Register", message: "User doesn't exist!!! plzz Register" })
    }
    if (!ifUser.isPasswordCorrect(password)) {
      return res.status(400).json({ error: "Invalid Credentials!", message: "Invalid Credentials!" })
    }
    const token = await ifUser.generateAuthToken()
    res.cookie("jwtauth", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true
    })
    return res.status(201).json({ message: "User Login successfull..." })
  } catch (error) {
    res.status(400).json({ error: error, message: error })
  }
})

router.post("/addexpense", authenticate, async (req, res) => {
  const { date, cat, amt } = req.body;
  if (!date || !cat || !amt) {
    return res.status(400).json({ error: "Invalid income/expense detail!!!", message: "Invalid income/expense detail!!!" });
  }
  try {
    const userData = await user.findOne({ _id: req.userId })
    if (!userData) {
      return res.status(400).json({ error: "User doesn't exist!!! plzz Register", message: "User doesn't exist!!! plzz Register" })
    }
    // userData.expenses = userData.expenses.concat({ date: date, category: cat, amount: amt })
    // const saved = await userData.save()
    const expenseSaved = new expenses({ date: date, category: cat, amount: amt, createdBy: userData })
    await expenseSaved.save()
    userData.expenses = userData.expenses.concat({ expense: expenseSaved })
    await userData.save()
    res.status(200).json({ message: "expense added" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
})


