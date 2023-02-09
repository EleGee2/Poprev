const TokenDAO = require('../../dao/token')

class TokenService {
    createToken(tokenDto, organisation) {
        return TokenDAO.createToken(tokenDto, organisation)
    }

    buyToken(userDto, tokenDto, values) {
        return TokenDAO.buyToken(userDto, tokenDto, values)
    }

    sellToken(userDto, tokenDto, values) {
        return TokenDAO.sellToken(userDto, tokenDto, values)
    }

    getInvestmentDetails(userDto, tokenDto) {
        return TokenDAO.getInvestmentDetails(userDto, tokenDto)
    }
}

module.exports = new TokenService()