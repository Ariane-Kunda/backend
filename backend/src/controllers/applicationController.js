const connectDatabase =
    require("../database/db");

async function applyForJob(req, res) {

    const {
        cover_letter,
        cv_link
    } = req.body;

    if (!cover_letter || !cv_link) {

        return res.status(400).json({
            message:
                "Cover letter and CV link are required"
        });
    }

    const db = await connectDatabase();

    try {

        const job = await db.get(
            "SELECT * FROM jobs WHERE id = ?",
            [req.params.jobId]
        );

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });
        }

        await db.run(
            `INSERT INTO applications
            (job_id, user_id, cover_letter, cv_link)
            VALUES (?, ?, ?, ?)`,
            [
                req.params.jobId,
                req.user.id,
                cover_letter,
                cv_link
            ]
        );

        res.status(201).json({
            message: "Application submitted successfully"
        });

    } catch (error) {

        if (
            error.message.includes("UNIQUE")
        ) {

            return res.status(400).json({
                message:
                    "You already applied for this job"
            });
        }

        res.status(500).json({
            message: "Application failed"
        });

    } finally {

        await db.close();
    }
}

async function getApplications(req, res) {

    const db = await connectDatabase();

    const applications = await db.all(
        `SELECT
            applications.*,
            users.name,
            users.email,
            jobs.title,
            jobs.company
         FROM applications
         JOIN users
           ON applications.user_id = users.id
         JOIN jobs
           ON applications.job_id = jobs.id
         ORDER BY applications.created_at DESC`
    );

    await db.close();

    res.json(applications);
}

async function updateApplicationStatus(req, res) {

    const {
        status
    } = req.body;

    const allowed = [
        "Pending",
        "Reviewed",
        "Accepted",
        "Rejected"
    ];

    if (!allowed.includes(status)) {

        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const db = await connectDatabase();

    await db.run(
        `UPDATE applications
         SET status = ?
         WHERE id = ?`,
        [
            status,
            req.params.id
        ]
    );

    await db.close();

    res.json({
        message:
            "Application status updated"
    });
}

module.exports = {
    applyForJob,
    getApplications,
    updateApplicationStatus
};