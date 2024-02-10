import jwt from "jsonwebtoken"
import { user } from "../models/user.js"

export const authenticate = async (req, res, next) => {
    try {
        // const checkToken = req.cookies.logintokens || req.headers.cookie || req.headers.authorization.replace("Bearer ", "") || req.headers.authorization;
        const checkToken = req.headers.authorization.replace("Bearer ", "");
        // console.log(checkToken);
        if (checkToken) {
            // console.log("verifying token");
            const verify = jwt.verify(checkToken, process.env.SECRET_KEY)
            const rootuser = await user.findOne({ _id: verify._id })
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
