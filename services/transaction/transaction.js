const TransactionDAO = require('../../dao/transaction')

class TransactionService {
    getTokenTransaction(userDto, token) {
        return TransactionDAO.getTokenTransaction(userDto, token)
    }
}

module.exports = new TransactionService()