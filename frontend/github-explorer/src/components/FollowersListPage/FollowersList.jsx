import React from "react";
import { useNavigate } from "react-router-dom";
import "./FollowersList.css";
import { colors, Grid, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFollowerUsername } from "../../slice/githubData";

function FollowersList() {
  let dispatch = useDispatch();
  let { username, followersList } = useSelector((state) => state.githubData);
  let navigate = useNavigate();

  return (
    <div className="followersListParent">
      <p
        className="border-bottom d-inline-block followerBack"
        onClick={() => {
          dispatch(setFollowerUsername(""));
          navigate("/", { state: username });
        }}
      >
        BACK
      </p>
      <h3 className="text-center">{username}'s followers list</h3>
      <hr />
      {followersList.length > 0 ? (
        <div className="d-flex justify-content-center">
          <div className="followerCardParent">
            <Grid container columnGap={1} rowGap={3}>
              {followersList?.map((follower) => (
                <Grid
                  item
                  xs={4}
                  sm={3}
                  md={2}
                  key={follower.login}
                  className="followerCard"
                >
                  <img src={follower.avatar_url} alt={follower.login} />
                  <p className="text-center">{follower.login}</p>
                  <span
                    className="followerDetails"
                    onClick={() => {
                      dispatch(setFollowerUsername(follower.login));
                      navigate(`${follower.login}`);
                    }}
                  >
                    more details
                  </span>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5 fw-bold" style={{ color: "red" }}>
          User Doesn't have followers
        </p>
      )}
    </div>
  );
}

export default FollowersList;
