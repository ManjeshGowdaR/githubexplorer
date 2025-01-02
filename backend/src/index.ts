import mongoose from "mongoose"; // Importing mongoose for database connectivity
import { config } from "./config/config"; // Importing port number and MongoDB URI from config file
import app from "./app"; // Importing the Express application instance

// Connecting to MongoDB using the provided URI from the config
mongoose
  .connect(config.mongoUri || "") // Use an empty string if mongoUri is undefined (although this should ideally not happen)
  .then(() => {
    // Logging a success message upon successful database connection
    console.log("MongoDB connected");

    // Starting the Express server and listening on the specified port from the config
    app.listen(config.port, () =>
      console.log(`Server running at port ${config.port}`)
    );
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err)); // Handling errors if database connection fails
