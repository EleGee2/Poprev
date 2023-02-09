const express = require("express")
const TokenController = require("../controllers/token")
const AuthController = require("../controllers/auth")

const router = express.Router()

router
    .route("/")
    .post(AuthController.isOrganisation, TokenController.createToken)

router
    .route("/buy/:tokenId")
    .post(AuthController.isUser, TokenController.buyToken)

router
    .route("/sell/:tokenId")
    .post(AuthController.isUser, TokenController.sellToken)

router
    .route("/:tokenId/investment-details")
    .get(AuthController.isUser, TokenController.getInvestmentDetails)

module.exports = router