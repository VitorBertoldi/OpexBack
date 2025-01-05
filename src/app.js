import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import buildingRoutes from "./routes/buildingRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import tokenRoute from "./routes/verifyTokenRoutes.js";
import bodyParser from 'body-parser';
import cors from "cors";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next(); 
});

app.use(
    cors({
        origin: "*"
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

userRoutes(app);
authRoutes(app);
tokenRoute(app);
buildingRoutes(app);
clientRoutes(app);

export default app;
