const OrganisationDAO = require('../../dao/organisation')

class OrganisationService {
    createOrganisation(orgDto) {
        return OrganisationDAO.createOrganisation(orgDto)
    }

    loginOrganisation(orgDto) {
        return OrganisationDAO.loginOrganisation(orgDto)
    }
}

module.exports = new OrganisationService();