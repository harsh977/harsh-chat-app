import path from "path";
import express from 'express';
import dotenv from "dotenv";
import connect from "./db/connect.js"
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";


import userRoutes from "./routes/user.routes.js";
import cors from "cors";

import {app, server} from './socket/socket.js';

dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT||3000;

const __dirname=path.resolve();
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

app.get("/" ,(req,res) =>{
    res.send("hello");
})
server.listen(PORT, () => {
    connect();
    console.log(`server runnning on port ${PORT}`);
});