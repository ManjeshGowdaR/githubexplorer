import { config } from "../config/config";
import axios from "axios";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

/**
 * Fetches user details by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} Promise that resolves to the User details object.
 */
const fetchDataByUsername = async (username: string): Promise<object> => {
  try {
    const { data } = await axios.get(`${config.githubApi}${username}`);
    return data;
  } catch (err: any) {
    if (err.response && err.response.status) {
      throw new ApiError("Failed to fetch user details", err.response.status);
    } else {
      throw new ApiError("Invalid username", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

/**
 * Fetches followers data by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} Promise that resolves to the Followers data object.
 */
const fetchFollowersByUsername = async (username: string): Promise<object> => {
  try {
    const { data } = await axios.get(
      `${config.githubApi}${username}/followers`
    );
    return data;
  } catch (err: any) {
    if (err.response && err.response.status) {
      throw new ApiError("Failed to fetch user details", err.response.status);
    } else {
      throw new ApiError("Invalid username", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

/**
 * Fetches following data by username from the GitHub API.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object>} Promise that resolves to the Following data object.
 */
const fetchFollowingByUsername = async (username: string): Promise<object> => {
  try {
    const { data } = await axios.get(
      `${config.githubApi}${username}/following`
    );
    return data;
  } catch (err: any) {
    if (err.response && err.response.status) {
      throw new ApiError("Failed to fetch user details", err.response.status);
    } else {
      throw new ApiError("Invalid username", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export {
  fetchDataByUsername,
  fetchFollowersByUsername,
  fetchFollowingByUsername,
};
