const express = require("express")
const TransactionController = require("../controllers/transaction")
const AuthController = require("../controllers/auth")

const router = express.Router()

router
    .route("/:tokenId")
    .get(AuthController.isOrganisation, TransactionController.getTokenTransactions)


module.exports = router