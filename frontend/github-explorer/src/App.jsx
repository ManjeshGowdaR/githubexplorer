import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import RepoDetailsPage from "./components/RepoDetailsPage/RepoDetailsPage";
import FollowersList from "./components/FollowersListPage/FollowersList";
import FollowersRepo from "./components/FollowerRepoPage/FollowersRepo";
import "./App.css";

export const config = {
  endpoint: "https://api.github.com/users/",
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/:username/repo/:repoName"
            element={<RepoDetailsPage />}
          />
          <Route path="/:username/followers" element={<FollowersList />} />
          <Route
            path="/:username/followers/:username"
            element={<FollowersRepo />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
