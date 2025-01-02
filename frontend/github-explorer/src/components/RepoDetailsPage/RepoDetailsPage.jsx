import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PeopleAltOutlined,
  LocationOnOutlined,
  EmailOutlined,
  ApartmentOutlined,
} from "@mui/icons-material";
import { styled, Paper, Grid } from "@mui/material";
import "./RepoDetailsPage.css";

function RepoDetailsPage() {
  let { state } = useLocation(); // to get state that we passed during navigate while clicking on repo card
  let { repoDetails, userDetails } = state; // we have passed repo data and user data here we are unpacking it
  let navigate = useNavigate();

  // logic to handle followers if it's greater than 999 than return 1k else return the exact followers eg:- 867
  let followers =
    userDetails.followers >= 1000
      ? parseFloat(userDetails.followers / 1000).toFixed(1) + "k"
      : userDetails.followers;

  // logic to handle following if it's greater than 999 than return 1k else return the exact following eg:- 867
  let following =
    userDetails.following >= 1000
      ? parseFloat(userDetails.following / 1000).toFixed(1) + "k"
      : userDetails.following;

  // Material UI item component with some styles applied on it
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "10px 20px 5px 20px",
    color: "gray",
    fontWeight: "bold",
  }));

  return (
    <div className="repoDetailsPageParent">
      <div className="back">
        <span className="border-bottom" onClick={() => navigate("/")}>
          BACK
        </span>
      </div>
      <h1 className="text-center ">Repository Details</h1>
      <hr className="mb-5" />

      <div>
        <Grid container gap={5} justifyContent={"center"}>
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            lg={3}
            className="repoUserDetailsParent"
          >
            <div className="repoUserImg">
              <img src={userDetails.avatar_url} alt={userDetails.login} />
            </div>
            <div className="text-center">
              <p className="fw-bold">{userDetails.name}</p>
              <p>Username : {userDetails.login}</p>
            </div>
            <div className="d-flex justify-content-around ">
              <p>
                <span className="paddingRight">
                  <PeopleAltOutlined fontSize="inherit" />
                </span>
                <span className="paddingRight fw-bold">{followers}</span>
                followers
              </p>
              <p>
                <span className="paddingRight">
                  <PeopleAltOutlined fontSize="inherit" />
                </span>
                <span className="paddingRight fw-bold">{following}</span>
                following
              </p>
            </div>
            <div className="d-flex justify-content-around">
              <p>
                <span className="paddingRight">
                  <LocationOnOutlined fontSize="inherit" />
                </span>
                {userDetails.location}
              </p>
              <p>
                <span className="paddingRight">
                  <EmailOutlined fontSize="inherit" />
                </span>
                {userDetails.email || "null"}
              </p>
            </div>
            <p className="text-center">
              <span className="paddingRight">
                <ApartmentOutlined fontSize="inherit" />
              </span>
              {userDetails.company || "null"}
            </p>
            <p className="text-center">
              <span className="paddingRight fw-bold">Bio:</span>{" "}
              {userDetails.bio || "null"}
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={6}>
            <p className="m-0 mt-3">Repo Name</p>
            <Item>
              <p>Name : {repoDetails.name}</p>
            </Item>

            <p className="m-0 mt-3">Clone URLs</p>
            <Item>
              <p>HTTPS : {repoDetails.clone_url}</p>
              <p>SSH : {repoDetails.ssh_url}</p>
            </Item>
            <p className="m-0 mt-4">Timeline</p>
            <Item>
              <p>
                Created at : {new Date(repoDetails.created_at).toLocaleString()}
              </p>
              <p>
                Updated at : {new Date(repoDetails.updated_at).toLocaleString()}
              </p>
            </Item>

            <p className="m-0 mt-3">Description</p>
            <Item>
              <p>{repoDetails.description || "null"}</p>
            </Item>

            <p className="m-0 mt-3">Home Page</p>
            <Item>
              <p>
                Click to redirects :{" "}
                {repoDetails.homepage ? (
                  <a
                    href={repoDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repoDetails.homepage}
                  </a>
                ) : (
                  <span>null</span>
                )}
              </p>
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RepoDetailsPage;
