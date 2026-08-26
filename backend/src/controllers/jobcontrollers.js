const connectDatabase =
    require("../database/database");

async function listJobs(req, res) {

    try {

        const db = await connectDatabase();

        const search =
            req.query.search || "";

        const location =
            req.query.location || "";

        const jobs = await db.all(
            `SELECT *
             FROM jobs
             WHERE
             (title LIKE ? OR description LIKE ?)
             AND location LIKE ?
             ORDER BY created_at DESC`,
            [
                `%${search}%`,
                `%${search}%`,
                `%${location}%`
            ]
        );

        await db.close();

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch jobs"
        });
    }
}

async function getJob(req, res) {

    const db = await connectDatabase();

    const job = await db.get(
        "SELECT * FROM jobs WHERE id = ?",
        [req.params.id]
    );

    await db.close();

    if (!job) {

        return res.status(404).json({
            message: "Job not found"
        });
    }

    res.json(job);
}

async function createJob(req, res) {

    const {
        title,
        description,
        company,
        location,
        requirements
    } = req.body;

    if (
        !title ||
        !description ||
        !company ||
        !location ||
        !requirements
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const db = await connectDatabase();

    const result = await db.run(
        `INSERT INTO jobs
        (title, description, company, location, requirements)
        VALUES (?, ?, ?, ?, ?)`,
        [
            title,
            description,
            company,
            location,
            requirements
        ]
    );

    await db.close();

    res.status(201).json({
        message: "Job created successfully",
        id: result.lastID
    });
}

async function updateJob(req, res) {

    const {
        title,
        description,
        company,
        location,
        requirements
    } = req.body;

    const db = await connectDatabase();

    const result = await db.run(
        `UPDATE jobs
         SET title = ?,
             description = ?,
             company = ?,
             location = ?,
             requirements = ?,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
            title,
            description,
            company,
            location,
            requirements,
            req.params.id
        ]
    );

    await db.close();

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Job not found"
        });
    }

    res.json({
        message: "Job updated successfully"
    });
}

async function deleteJob(req, res) {

    const db = await connectDatabase();

    const result = await db.run(
        "DELETE FROM jobs WHERE id = ?",
        [req.params.id]
    );

    await db.close();

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Job not found"
        });
    }

    res.json({
        message: "Job deleted successfully"
    });
}

module.exports = {
    listJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};