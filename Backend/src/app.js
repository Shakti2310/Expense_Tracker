import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Cross origin resource sharing: Giving backend access to the frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

//Limiting the json file size of request body
app.use(express.json({ limit: "16kb" }));

//Encoding the api url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Creating a memory space to save the sended by the client through request
app.use(express.static("public"));

//For accessing the cookies of client browser
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import errorHandler from "./middlewares/error.middleware.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

app.get("/", (_, res) => res.send("server running"));

app.use(errorHandler);

export default app;
