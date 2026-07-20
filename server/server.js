import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config"
import departmentRoutes from "./routes/Department.js"
import studentRoutes from "./routes/Student.js"
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

app.use("/api/students",studentRoutes);
app.use("/api/departments",departmentRoutes);

app.get("/",(req,res)=>{res.send("api working")})


app.listen(PORT,()=>console.log("Server running"));