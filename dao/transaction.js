const transactionQueries = require("../services/transaction/transactionQueries")
const tokenQueries = require("../services/token/tokenQueries")

class TransactionDAO {
    async getTokenTransaction(user, token) {
        if (typeof token === "string") {
            token = await tokenQueries.getTokenById(token)
            if (!token) {
                throw new Error("Token not found")
            }
        }

        if (String(token.orgId) !== String(user.id)) {
            throw new Error("You don't have access to this transaction")
        }

        return await transactionQueries.getTransactionsByQuery({tokenId: token.id})
    }
}

module.exports = new TransactionDAO()