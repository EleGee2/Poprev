const bcrypt = require('bcryptjs')
const userQueries = require("../services/user/userQueries")
const orgQueries = require("../services/organisation/organisationQueries")
const {Op, or} = require("sequelize");
const {signToken} = require("../controllers/auth");

class UserDAO {
    async createUser(values) {
        try {
            let query = { email: values.email }
            if (values.username) {
                query = {
                    [Op.or] : [
                        { email: values.email},
                        { username: values.username.toLowerCase()}
                    ]
                }
            }

            const [user_query, organisation_query, phone_query] = await Promise.all([
                userQueries.getUserByQuery(query),
                orgQueries.getOrganisationByQuery({ email: values.email }),
                userQueries.getUserByQuery({ phone_number: values.phone })
            ])

            const checkUser = user_query || organisation_query
            if (checkUser) {
                throw new Error("This email/username is already registered with us");
            }

            if (phone_query) {
                throw new Error("This phone number is already registered with us")
            }

            const hash = bcrypt.hashSync(values.password, 10);
            const user = await userQueries.createUser({
                first_name: values.firstname,
                last_name: values.lastname,
                email: values.email,
                phone_number: values.phone,
                address: values.address,
                type: "user",
                username: values.username,
                activated: true,
                password: hash
            })

            const token = signToken(user.id, user.email, user.type)

            return {...user , token}
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async loginUser(values) {
        try {
            let user = await userQueries.getUserByQuery({ email: values.email })

            if (!user) {
                throw new Error("User not found")
            }
            user = user.dataValues
            const validPassword = bcrypt.compareSync(values.password, user.password)

            if (!validPassword) {
                throw new Error("Incorrect email or password")
            }

            const token = signToken(user.id, user.email, user.type)
            delete user['password']

            return {...user, token}
        } catch (error) {
            console.info(error)
            throw error
        }
    }
}

module.exports = new UserDAO();