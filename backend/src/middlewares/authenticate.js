import jwt from "jsonwebtoken"
import { user } from "../models/user.js"

export const authenticate = async (req, res, next) => {
    try {
        const checkToken = req.cookies.logintokens;
        if (checkToken) {
            console.log("verifying token");
            const verify = jwt.verify(checkToken, process.env.SECRET_KEY)
            const rootuser = await user.findOne({ _id: verify._id, "tokens.token": checkToken })
            if (!rootuser) {
                throw new Error("User not found")
            }
            req.token = checkToken;
            req.rootUser = rootuser;
            req.userId = rootuser._id;
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(422).json({ error, message: error })
    }
}
