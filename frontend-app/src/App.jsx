import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import NavBar from "./components/NavBar";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";

export default function App() {

    return (
        <BrowserRouter>

            <NavBar />

            <main className="container">

                <Routes>

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/jobs"
                            />
                        }
                    />

                    <Route
                        path="/jobs"
                        element={<Jobs />}
                    />

                    <Route
                        path="/jobs/:id"
                        element={
                            <JobDetails />
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={
                            <Register />
                        }
                    />

                </Routes>

            </main>

        </BrowserRouter>
    );
}
