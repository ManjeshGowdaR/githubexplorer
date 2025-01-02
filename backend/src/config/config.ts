import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVars = process.env;

/**
 * Configuration object containing environment variables.
 * @typedef {Object} Config
 * @property {string | undefined} [port] - Port number for the server.
 * @property {string | undefined} [mongoUri] - MongoDB connection URI.
 * @property {string | undefined} [githubApi] - GitHub API base URL.
 */
interface Config {
  port?: string;
  mongoUri?: string;
  githubApi?: string;
}

/**
 * Configuration object containing environment variables.
 */
const config: Config = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  githubApi: envVars.GITHUB_API,
};

export { config };
