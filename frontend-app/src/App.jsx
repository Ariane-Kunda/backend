import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import NavBar from "./component/NavBar";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <BrowserRouter>

      {/* Navigation bar */}
      <NavBar />

      {/* Main application area */}
      <main className="container">

        <Routes>

          {/* Home page */}
          <Route
            path="/"
            element={
              <Navigate
                to="/jobs"
                replace
              />
            }
          />

          {/* Jobs page */}
          <Route
            path="/jobs"
            element={<Jobs />}
          />

          {/* Individual job */}
          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Unknown URL */}
          <Route
            path="*"
            element={
              <Navigate
                to="/jobs"
                replace
              />
            }
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;