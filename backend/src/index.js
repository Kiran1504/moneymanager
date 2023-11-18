import "dotenv/config"
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000


connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port: ${port}`);
    })
    app.on("error", (error)=>{
        console.log(error);
        throw error
    })
})
.catch((err)=>{
    console.log("MongoDB COnnection ERR!!!", err);
})