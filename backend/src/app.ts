import express, { Application } from "express";
import httpStatus from "http-status";
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing
import userRouter from "./routes"; // Importing the user routes

const app: Application = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(cors()); // Using CORS middleware to enable cross-origin requests

app.use("/api", userRouter); // Mounting the userRouter at the "/api" endpoint

// Default route handler for the root URL "/"
app.use("/", (req, res) =>
  res
    .status(httpStatus.OK)
    .send("<h2>GitHub Explorer server running............</h2>")
);

export default app; // Exporting the Express application instance
