const express = require("express");

const {
    applyForJob,
    getApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

const {
    authenticate,
    requireAdmin
} = require("../middleware/authmiddleware");

const router = express.Router();

router.post(
    "/jobs/:jobId",
    authenticate,
    applyForJob
);

router.get(
    "/",
    authenticate,
    requireAdmin,
    getApplications
);

router.patch(
    "/:id/status",
    authenticate,
    requireAdmin,
    updateApplicationStatus
);

module.exports = router;
