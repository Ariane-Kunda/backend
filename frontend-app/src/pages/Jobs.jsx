import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Jobs() {

    const [jobs, setJobs] =
        useState([]);

    const [search, setSearch] =
        useState("");

    async function loadJobs() {

        const response =
            await api.get(
                `/jobs?search=${search}`
            );

        setJobs(response.data);
    }

    useEffect(() => {

        loadJobs();

    }, []);

    return (
        <div>

            <h1>Available Jobs</h1>

            <div className="search">

                <input
                    placeholder="Search jobs..."
                    value={search}
                    onChange={
                        e =>
                        setSearch(e.target.value)
                    }
                />

                <button onClick={loadJobs}>
                    Search
                </button>

            </div>

            <div className="jobs">

                {jobs.map(job => (

                    <div
                        className="job-card"
                        key={job.id}
                    >

                        <h2>
                            {job.title}
                        </h2>

                        <p>
                            <strong>
                                Company:
                            </strong>{" "}
                            {job.company}
                        </p>

                        <p>
                            <strong>
                                Location:
                            </strong>{" "}
                            {job.location}
                        </p>

                        <p>
                            {job.description}
                        </p>

                        <Link
                            to={`/jobs/${job.id}`}
                        >
                            View Details
                        </Link>

                    </div>

                ))}

            </div>

        </div>
    );
}