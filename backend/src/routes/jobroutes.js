const express = require("express");

const {
    listJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const {
    authenticate,
    requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", listJobs);

router.get("/:id", getJob);

router.post(
    "/",
    authenticate,
    requireAdmin,
    createJob
);

router.put(
    "/:id",
    authenticate,
    requireAdmin,
    updateJob
);

router.delete(
    "/:id",
    authenticate,
    requireAdmin,
    deleteJob
);

module.exports = router;