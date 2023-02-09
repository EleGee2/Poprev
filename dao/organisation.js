const bcrypt = require('bcryptjs')
const orgQueries = require("../services/organisation/organisationQueries")
const {Op, or} = require("sequelize");
const {signToken} = require("../controllers/auth");
const userQueries = require("../services/user/userQueries");

class OrganisationDAO {
    async createOrganisation(values) {
        try {
            let query = { email: values.email }

            const [user_query, organisation_query, phone_query] = await Promise.all([
                userQueries.getUserByQuery(query),
                orgQueries.getOrganisationByQuery({ email: values.email }),
                orgQueries.getOrganisationByQuery({ phone_number: values.phone })
            ])

            const checkOrganisation = organisation_query || user_query
            if (checkOrganisation) {
                throw new Error("This email is already registered with us")
            }

            if (phone_query) {
                throw new Error("This phone number is already registered with us")
            }

            const hash = bcrypt.hashSync(values.password, 10);
            const organisation = await orgQueries.createOrganisation({
                name: values.name,
                email: values.email,
                phone_number: values.phone,
                activated: true,
                twitter: values.twitter,
                instagram: values.instagram,
                type: values.type.toLowerCase(),
                entity_type: "organisation",
                address: values.address,
                password: hash
            })

            const token = signToken(organisation.id, organisation.email, organisation.type)

            return { ...organisation, token}
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async loginOrganisation(values) {
        try {
            let organisation = await orgQueries.getOrganisationByQuery({ email: values.email })

            if (!organisation) {
                throw new Error("Organisation not found")
            }
            organisation = organisation.dataValues
            const validPassword = bcrypt.compareSync(values.password, organisation.password)

            if (!validPassword) {
                throw new Error("Incorrect email or password")
            }

            const token = signToken(organisation.id, organisation.email, organisation.type)
            delete organisation['password']

            return {...organisation, token}
        } catch (error) {
            console.info(error)
            throw error
        }
    }
}

module.exports = new OrganisationDAO()