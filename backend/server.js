import express from 'express';
import dotenv from "dotenv";
import connect from "./db/connect.js"
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT||3000;

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
app.get("/" ,(req,res) =>{
    res.send("hello");
})
app.listen(PORT, () => {
    connect();
    console.log(`server runnning on port ${PORT}`);
});