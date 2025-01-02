import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  githubData: {
    username: "",
    userDetails: {},
    repos: [],
    followersList: [],
    followerUsername: "",
    followerDetails: {},
    followerRepos: [],
  },
};

// Reducer function to update input username
const set_username = (state, action) => {
  state.githubData = {
    ...state.githubData,
    username: action.payload,
  };
};

// Reducer function to update input user's details
const set_userDetails = (state, action) => {
  state.githubData = {
    ...state.githubData,
    userDetails: action.payload,
  };
};

// reducer function to update input user's repositories
const set_repos = (state, action) => {
  state.githubData = {
    ...state.githubData,
    repos: action.payload,
  };
};

// Reducer function to update input user's followers list
const set_followersList = (state, action) => {
  state.githubData = {
    ...state.githubData,
    followersList: action.payload,
  };
};

// Reducer function to update input user's follower's username
const set_followerUsername = (state, action) => {
  state.githubData = {
    ...state.githubData,
    followerUsername: action.payload,
  };
};

// Reducer function to update input user's follower's details
const set_followerDetails = (state, action) => {
  state.githubData = {
    ...state.githubData,
    followerDetails: action.payload,
  };
};

// Reducer function to update input user's follower's repositories
const set_followerRepos = (state, action) => {
  state.githubData = {
    ...state.githubData,
    followerRepos: action.payload,
  };
};

const githubDataSlice = createSlice({
  name: "githubData",
  initialState,
  reducers: {
    setUsername: set_username,
    setUserDetails: set_userDetails,
    setRepos: set_repos,
    setFollowersList: set_followersList,
    setFollowerUsername: set_followerUsername,
    setFollowerDetails: set_followerDetails,
    setFollowerRepos: set_followerRepos,
  },
});

export const {
  setUsername,
  setUserDetails,
  setRepos,
  setFollowersList,
  setFollowerUsername,
  setFollowerDetails,
  setFollowerRepos,
} = githubDataSlice.actions;
export default githubDataSlice.reducer;
