const express = require("express");
const OrganisationController = require("../controllers/organisation")

const router = express.Router();

router.post("/signup", OrganisationController.createOrganisation)
router.post("/login", OrganisationController.loginOrganisation)

module.exports = router