import { User } from "../models";
import { UserDocument } from "../models/user.model";
import { FilterQuery } from "mongoose";
import {
  fetchDataByUsername,
  fetchFollowersByUsername,
  fetchFollowingByUsername,
} from "../api/fetchGitHubData";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";
/**
 * Save a user to the database if it doesn't already exist.
 * @param {string} userName - GitHub username
 * @returns {Promise<object>} Promise that resolves to the User object saved in the database
 */
const saveUser = async (userName: string): Promise<object> => {
  try {
    // Check if the user already exists in the database
    let isUserExist = await User.findOne({ username: userName });
    if (isUserExist) {
      return isUserExist;
    }

    // Fetch user data from GitHub API
    let fetchedUser: any = await fetchDataByUsername(userName); // Type assertion to 'any'
    let {
      login: username,
      node_id: _id,
      avatar_url,
      type,
      repos_url,
      name,
      company,
      blog,
      location,
      email,
      bio,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    } = fetchedUser;

    // Create and save the user in the database
    let user = User.create({
      username,
      _id,
      avatar_url,
      type,
      repos_url,
      name,
      company,
      bio,
      location,
      email,
      blog,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    });

    return user;
  } catch (err: any) {
    throw new ApiError(
      "Failed to save user details: " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Interface representing GitHub user names.
 */
interface GitHubUserNames {
  login: string;
}
/**
 * Find mutual followers of a user.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object | string>} Promise that resolves to mutual followers information or an error message.
 */
const mutualFollowers = async (username: string): Promise<object | string> => {
  try {
    // Check if the user exists in the database
    const isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      throw new ApiError("User doesn't exist!", httpStatus.BAD_REQUEST);
    }

    // Fetch followers and following data from GitHub API
    const followersResponse = await fetchFollowersByUsername(username);
    const followingResponse = await fetchFollowingByUsername(username);

    // Ensure that the responses are arrays and map them to extract the usernames
    const followers: GitHubUserNames[] = Array.isArray(followersResponse)
      ? followersResponse.map((user) => user.login)
      : [];

    const following: GitHubUserNames[] = Array.isArray(followingResponse)
      ? followingResponse.map((user) => user.login)
      : [];

    const mutual = following.filter((user) => followers.includes(user));

    // Update the 'friends' field in the database with mutual followers
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { friends: mutual },
      { new: true }
    );

    return updatedUser ? updatedUser : { message: "Failed to update user" };
  } catch (err: any) {
    throw new ApiError(
      "Failed to find mutual followers: " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Search users based on specified queries
 * @param {object} queries - Query parameters
 * @returns {Promise<UserDocument[]>} - Array of users matching the search criteria
 */
const searchUsers = async (queries: {
  username?: string;
  location?: string;
  company?: string;
}): Promise<UserDocument[]> => {
  try {
    let { username, location, company } = queries;
    let query: FilterQuery<UserDocument> = {}; // Initialize the query object

    // conditions to the query based on the provided parameters, all operations are case-insensitive
    if (username) {
      query.username = { $regex: new RegExp(username, "i") };
    }
    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (company) {
      query.company = { $regex: new RegExp(company, "i") };
    }

    // Find users in the database based on the constructed query
    let users = await User.find(query);

    return users;
  } catch (err: any) {
    throw new ApiError(
      "Error searching users: " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Soft delete a user by marking it as deleted
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - Deleted user object
 */
const deleteUser = async (username: string): Promise<object> => {
  try {
    let deletedUser = await User.findOneAndUpdate(
      { username },
      { deleted: true },
      { new: true }
    );
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (err: any) {
    throw new ApiError(
      "Failed to soft delete user : " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Represents a user object with location, blog and bio properties.
 */
interface Update {
  location: string;
  blog: string;
  bio: string;
}
/**
 * Update user information
 * @param {object} userData - Updated user data
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - Updated user object
 */
const updateUser = async (
  userData: Partial<Update>,
  username: string
): Promise<object> => {
  try {
    let { location, blog, bio } = userData;
    let user = await User.findOneAndUpdate(
      { username },
      { location, blog, bio },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err: any) {
    throw new ApiError(
      "Failed to update user : " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * List users with optional sorting.
 * @param {object} queries - Query parameters for sorting.
 * @returns {Promise<UserDocument[]>} - Array of users with optional sorting.
 */
const listUsers = async (queries: {
  sortBy?: string;
}): Promise<UserDocument[]> => {
  try {
    let { sortBy } = queries;
    let users: UserDocument[] = await User.find({});
    let sortedList: UserDocument[];

    if (sortBy === "public_repos") {
      sortedList = users.sort(
        (a, b) => (b.public_repos || 0) - (a.public_repos || 0)
      );
    } else if (sortBy === "public_gists") {
      sortedList = users.sort(
        (a, b) => (b.public_gists || 0) - (a.public_gists || 0)
      );
    } else if (sortBy === "followers") {
      sortedList = users.sort(
        (a, b) => (b.followers || 0) - (a.followers || 0)
      );
    } else if (sortBy === "following") {
      sortedList = users.sort(
        (a, b) => (b.following || 0) - (a.following || 0)
      );
    } else if (sortBy === "created_at") {
      sortedList = users.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      return users;
    }

    return sortedList;
  } catch (err: any) {
    throw new ApiError(
      "Failed to sort user : " + err.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  saveUser,
  mutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
