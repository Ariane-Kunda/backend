import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function JobDetails() {

    const { id } = useParams();

    const [job, setJob] =
        useState(null);

    const [coverLetter, setCoverLetter] =
        useState("");

    const [cvLink, setCvLink] =
        useState("");

    useEffect(() => {

        api.get(`/jobs/${id}`)
            .then(response => {
                setJob(response.data);
            });

    }, [id]);

    async function apply() {

        try {

            await api.post(
                `/applications/jobs/${id}`,
                {
                    cover_letter: coverLetter,
                    cv_link: cvLink
                }
            );

            alert(
                "Application submitted successfully"
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Application failed"
            );
        }
    }

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div>

            <h1>{job.title}</h1>

            <h3>
                {job.company}
            </h3>

            <p>
                Location: {job.location}
            </p>

            <h3>Description</h3>

            <p>
                {job.description}
            </p>

            <h3>Requirements</h3>

            <p>
                {job.requirements}
            </p>

            <hr />

            <h2>Apply for this job</h2>

            <textarea
                placeholder="Cover letter"
                value={coverLetter}
                onChange={
                    e =>
                    setCoverLetter(e.target.value)
                }
            />

            <input
                placeholder="CV link"
                value={cvLink}
                onChange={
                    e =>
                    setCvLink(e.target.value)
                }
            />

            <button onClick={apply}>
                Submit Application
            </button>

        </div>
    );
}