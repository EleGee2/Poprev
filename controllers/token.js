const tokenService = require("../services/token/token")

class TokenController {
    async createToken(req, res) {
        try {
            const token = await tokenService.createToken(req.body, req.user)

            return res.status(201).json({
                message: "Token created successfully",
                payload: token
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    async buyToken(req, res) {
        try {
            await tokenService.buyToken(req.user, req.params.tokenId, req.body)

            return res.status(201).json({
                message: `${req.body.amount} tokens bought successfully`
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }

    async sellToken(req, res) {
        try {
            await tokenService.sellToken(req.user, req.params.tokenId, req.body)

            return res.status(201).json({
                message: `${req.body.amount} tokens sold successfully`
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new TokenController()