import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../../App";
import ReposDashboard from "../RepoDashboardPage/RepoDashboard";
import { useDispatch, useSelector } from "react-redux";
import {
  setFollowerDetails,
  setFollowerRepos,
  setFollowerUsername,
} from "../../slice/githubData";

function FollowersRepo() {
  let dispatch = useDispatch();
  let { followerUsername } = useSelector((state) => state.githubData);
  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  // Function to fetch user details from github API
  const fetchUserDetails = async () => {
    try {
      if (followerUsername) {
        let res = await axios.get(`${config.endpoint}${followerUsername}`);
        if (res.status === 200) {
          enqueueSnackbar("User profile load successfully", {
            variant: "success",
            autoHideDuration: 1500,
          });

          dispatch(setFollowerDetails(res.data));
        }
      }
    } catch (err) {
      enqueueSnackbar("Failed to load user profile", {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
  };

  // Function to fetch user repositories from github API
  const fetchRepos = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${followerUsername}/repos`);
      if (res.status === 200) {
        enqueueSnackbar("Repos fetch successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });
        dispatch(setFollowerRepos(res.data));
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else if (err?.response?.status === 403) {
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

  // useEffect to handle searched user and it's follower details as well as repos
  useEffect(() => {
    fetchUserDetails();
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followerUsername]);

  return (
    <div>
      <span
        className="m-5 d-inline-block border-bottom cursor-pointer"
        style={{ color: "blue" }}
        onClick={() => {
          dispatch(setFollowerUsername(""));
          dispatch(setFollowerDetails({}));
          dispatch(setFollowerRepos([]));
          navigate("/");
        }}
      >
        BACK
      </span>
      <ReposDashboard />
    </div>
  );
}

export default FollowersRepo;
