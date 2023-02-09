const organisationService = require("../services/organisation/organisation")

class OrganisationController {
    async createOrganisation(req, res) {
        try {
            const organisation = await organisationService.createOrganisation(req.body)

            return res.status(201).json({
                message: "Organisation created successfully",
                payload: organisation
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }

    async loginOrganisation(req, res) {
        try {
            const organisation = await organisationService.loginOrganisation(req.body)

            return res.status(200).json({
                message: "Organisation logged in successfully",
                organisation
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new OrganisationController()