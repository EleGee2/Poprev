const transactionService = require("../services/transaction/transaction")

class TransactionController {
    async getTokenTransactions(req, res) {
        try {
            const transactions = await transactionService.getTokenTransaction(req.user, req.params.tokenId)

            return res.status(201).json({
                message: "Token Transactions gotten successfully",
                payload: transactions
            })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new TransactionController()