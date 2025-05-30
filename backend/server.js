import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { connectDB } from './config/db.js';

import taskRoutes from './routes/task.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/tasks",taskRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    app.get("/*path", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(5000, ()=> {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("Failure to connect to database:", error.message);
    process.exit(1); // Exit the process with failure
})

