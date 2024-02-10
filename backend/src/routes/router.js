import express from "express";
import { user } from "../models/user.js"
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

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }
    return res
      .status(201)
      .cookie("logintokens", token, options)
      .json({ message: "User Login successfull...", token: token })
  } catch (error) {
    res.status(400).json({ error: error, message: error })
  }
})

router.post("/addexpense", authenticate, async (req, res) => {
  const { date, category, amount } = req.body;
  if (!date || !category || !amount) {
    return res.status(400).json({ error: "Invalid income/expense detail!!!", message: "Invalid income/expense detail!!!" });
  }
  try {
    console.log(req.userId, "line no 66");
    if (!req.userId) {
      return res.status(400).json({ error: "Plzz Login", message: "Plzz Login" })
    }
    const userData = await user.findOne({ _id: req.userId })
    if (!userData) {
      return res.status(400).json({ error: "Plzz Login", message: "Plzz Login" })
    }
    userData.expenses = userData.expenses.concat({ date, category, amount })
    const saved = await userData.save()
    res.status(200).json({ message: "expense added" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
})

router.get("/updatelist", authenticate, async (req, res) => {
  try {
    res.send(req.rootUser)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: error })
  }
})

router.post("/deleteexpense", authenticate, async (req, res) => {
  try {
    const userData = await user.findOne({ _id: req.userId })
    if (!userData) {
      return res.status(400).json({ error: "Error Occurred!!!", message: "Error Occurred!!!" })
    }
    userData.expenses = userData.expenses.filter((item) => {
      return item._id.toString() !== req.body.id
    })
    const saved = await userData.save()
    res.status(200).json({ message: "Expense deleted" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
})

router.get("/logout", authenticate, async (req, res) => {
  try {
    const token = req.token
    const userData = await user.findOne({ _id: req.userId, "tokens.token": token })
    if (userData) {
      userData.tokens = userData.tokens.filter((item) => {
        return item.token !== token
      })
      const saved = await userData.save()
    }
    return res
      .status(200)
      .clearCookie("logintokens")
      .json({ message: "User Logout successfull..." })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
})

router.get("/getcurrentuser", authenticate, async (req, res) => {
  try {
    res.status(200).json({ user: req.rootUser })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error, message: error })
  }
})