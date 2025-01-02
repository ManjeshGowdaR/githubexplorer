/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { TextField, Button } from "@mui/material";
import { config } from "../../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import ReposDashboard from "../RepoDashboardPage/RepoDashboard";
import "./LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setUserDetails, setRepos } from "../../slice/githubData";

function LandingPage() {
  let dispatch = useDispatch();
  let { username, userDetails, repos } = useSelector(
    (state) => state.githubData
  );
  let { enqueueSnackbar } = useSnackbar();

  // handling user input to fetch github user
  const handleChange = (e) => dispatch(setUsername(e.target.value));

  // conditionally fetching api || and clearing data
  const handleClick = (type) => {
    if (type === "submit") {
      fetchUserDetails();
      fetchRepos();
    } else if (type === "clear") {
      dispatch(setUsername(""));
      dispatch(setUserDetails({}));
      dispatch(setRepos([]));
    }
  };

  // Function to fetch user details from github API
  const fetchUserDetails = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}`);
      if (res.status === 200) {
        enqueueSnackbar("User profile load successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });
        dispatch(setUserDetails(res.data));
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else {
        enqueueSnackbar("Internal server error", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    }
  };

  // Function to fetch user repositories from github API
  const fetchRepos = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}/repos`);
      if (res.status === 200) {
        enqueueSnackbar("Repos fetch successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });
        dispatch(setRepos(res.data));
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else {
        enqueueSnackbar("Internal server error", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    }
  };

  return (
    <div>
      <h1 className="text-center pb-3 mb-0 pt-3 assignment">
        Autonomize AI - GitHub Explorer
      </h1>
      <hr className="mt-0" />
      <div className="d-flex gap-2 justify-content-center">
        <TextField
          type="text"
          className="w-50"
          fullWidth
          id="username"
          placeholder="Enter github username......"
          color="success"
          value={username}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          size="large"
          className="Button"
          onClick={() => handleClick("submit")}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="large"
          className="Button"
          onClick={() => handleClick("clear")}
        >
          Clear
        </Button>
      </div>
      <div>
        {/* rendering repository dashboard by passing repos and user data as props */}
        <ReposDashboard repos={repos} details={userDetails} />
      </div>
    </div>
  );
}

export default LandingPage;
