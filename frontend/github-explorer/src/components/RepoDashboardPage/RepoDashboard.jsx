import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./RepoDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setFollowersList } from "../../slice/githubData";
import axios from "axios";
import { config } from "../../App";
import { useSnackbar } from "notistack";

// Function for repository dashboard
function ReposDashboard() {
  let { repos, userDetails, followerUsername, followerRepos } = useSelector(
    (state) => state.githubData
  );
  let navigate = useNavigate();

  return (
    <div>
      {(repos.length > 0 || followerRepos.length > 0) && (
        <div>
          {/*Rendering user details by passing user data to this function component*/}
          <UserProfile />
        </div>
      )}
      <div className="mt-5 p-3 pb-5">
        {(repos.length > 0 || followerRepos.length > 0) && (
          <h3 className="text-center mb-3">Repos</h3>
        )}
        <Grid container spacing={2}>
          {(followerUsername ? followerRepos : repos).map((repo) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={repo.id}>
                <Card className="repoCard">
                  <p className="repoName">{repo.name}</p>
                  {!followerUsername && (
                    <p
                      className="moreDetails text-end"
                      onClick={() =>
                        // whenever user click on specific repo card it redirects to repo details page as well as we are passing repo and user data as url state
                        navigate(`${userDetails.login}/repo/${repo.name}`, {
                          state: { repoDetails: repo, userDetails },
                        })
                      }
                    >
                      Click for more details
                    </p>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

// Function for user profile
const UserProfile = () => {
  let location = useLocation().state?.username;
  let dispatch = useDispatch();
  let {
    userDetails,
    username,
    followerUsername,
    followerDetails,
    followersList,
  } = useSelector((state) => state.githubData);
  let navigate = useNavigate();
  let { enqueueSnackbar } = useSnackbar();

  // function to handle fetching followers list
  const handleFollowerClick = () => {
    if (followersList.length === 0 || username !== location) {
      fetchFollowersList();
    }
    navigate(`${userDetails.login}/followers`);
  };

  // Function to fetch followers list
  const fetchFollowersList = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}/followers`);
      if (res.status === 200) {
        enqueueSnackbar(`Successfully fetch ${username}'s followers`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        dispatch(setFollowersList(res.data));
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
    <div className="m-auto mt-5 userProfileParent">
      <h3 className="text-center">Profile</h3>
      <div className="d-flex flex-column gap-3 align-items-center">
        <div className="userProfileImg">
          <img
            src={(followerUsername ? followerDetails : userDetails).avatar_url}
            alt={(followerUsername ? followerDetails : userDetails).login}
          />
        </div>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {(followerUsername ? followerDetails : userDetails).login}
            </Typography>
            <div className="d-flex userDetails">
              <p>
                Followers :{" "}
                {(followerUsername ? followerDetails : userDetails).followers}
              </p>
              <p>
                Follwing :{" "}
                {(followerUsername ? followerDetails : userDetails).following}
              </p>
              <p>
                Public Repos :{" "}
                {
                  (followerUsername ? followerDetails : userDetails)
                    .public_repos
                }
              </p>
              <p>
                Location :{" "}
                {(followerUsername ? followerDetails : userDetails).location}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="userDetails">
                Fullname :{" "}
                {(followerUsername ? followerDetails : userDetails).name}{" "}
              </p>
              {!followerUsername && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleFollowerClick}
                >
                  Show Followers
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReposDashboard;
