import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import appointmentRouter from "./router/appointmentRouter.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
const app = express();

const _dirname=path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack Hospital API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

config({ path: "./config/config.env" });

// CORS helps with security by specifying which origins can access the resources.
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); 

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use(express.static(path.join(_dirname,"./FrontEnd/dist")));

app.use("*", (_, res) => {
  res.sendFile(path.resolve(_dirname,"FrontEnd","dist","index.html"));
})
dbConnection()

app.use(errorMiddleware);
export default app; 