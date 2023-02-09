const dotenv = require('dotenv');
const uuid = require("generate-uuid")
dotenv.config({ path: '../config.env' });
const { sequelize } = require('../models')
const tokenQueries = require("../services/token/tokenQueries")
const transactionQueries = require("../services/transaction/transactionQueries")
const walletQueries = require("../services/wallet/walletQueries")
const { generateTransactionReference } = require("../utils/random")

class TokenDAO {

    constructor() {
        this.sequelize = sequelize
    }

    async createToken(values, organisation) {
        try {
            const symbolExists = await tokenQueries.getTokenByQuery({symbol: values.symbol})

            if (symbolExists) {
                throw new Error("This symbol has already been used")
            }

            const token = await tokenQueries.createToken({
                name: values.name,
                image: values.image,
                symbol: values.symbol,
                raise_amount: values.raise_amount,
                orgId: organisation.id,
                total_supply: values.valuation / Number(process.env.SELL_PRICE),
                total_raised: (values.total_raised || 0) / Number(process.env.SELL_PRICE),
                supply: values.raise_amount / Number(process.env.SELL_PRICE),
                valuation: values.valuation,
                buy_price: process.env.BUY_PRICE,
                sell_price: process.env.SELL_PRICE
            })

            return token
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async buyToken(user, tokenId, values) {

        return await sequelize.transaction(async (t) => {
            const token = await tokenQueries.getTokenById(tokenId)

            if (!token) {
                throw new Error("Token not found")
            }

            if (token.completed_raise || token.total_raised === token.supply) {
                throw new Error("This token cannot be traded")
            }

            await tokenQueries.updateToken(values.amount, {id: token.id}, t)
            const wallet = await walletQueries.getWalletByQuery({userId: user.id, tokenId: token.id})

            if (wallet) {
                await walletQueries.updateWallet(values.amount, {userId: user.id, tokenId: token.id}, t)
            } else {
                await walletQueries.createWallet({userId: user.id, tokenId: token.id, amount: values.amount, balance: Number(values.amount)}, t)
            }

            await Promise.all([
                transactionQueries.createTransaction({
                    userId: user.id,
                    tokenId: token.id,
                    reference: `GETXN_TKN_BUY_${generateTransactionReference(9)}`,
                    type: "Buy",
                    from: token.orgId,
                    to: user.id,
                    volume: values.amount,
                    price: process.env.BUY_PRICE,
                    status: "Completed",
                    owner_model: "user"
                }, t),
                transactionQueries.createTransaction({
                    organisationId: token.orgId,
                    tokenId: token.id,
                    reference: `GETXN_TKN_SELL_${generateTransactionReference(9)}`,
                    type: "Sell",
                    from: token.orgId,
                    to: user.id,
                    volume: values.amount,
                    price: process.env.BUY_PRICE,
                    status: "Completed",
                    owner_model: "organisation"
                }, t)
            ])

            return true
        })
    }

    async sellToken(user, tokenId, values) {
        return await sequelize.transaction(async (t) => {
            const token = await tokenQueries.getTokenById(tokenId)

            if (!token) {
                throw new Error("Token not found")
            }

            const wallet = await walletQueries.getWalletByQuery({ userId: user.id, tokenId: token.id })
            if (values.amount > wallet.balance) {
                throw new Error(`You can sell more than ${wallet.balance} tokens`)
            }

            await walletQueries.decrementWallet(values.amount, { userId: user.id, tokenId: token.id}, t);

            await Promise.all([
                transactionQueries.createTransaction({
                    userId: user.id,
                    tokenId: token.id,
                    reference: `GETXN_TKN_BUY_${generateTransactionReference(9)}`,
                    type: "Buy",
                    from: user.id,
                    to: uuid(),
                    volume: values.amount,
                    price: process.env.BUY_PRICE,
                    status: "Pending",
                    owner_model: "user"
                }, t),
                transactionQueries.createTransaction({
                    userId: user.id,
                    tokenId: token.id,
                    reference: `GETXN_TKN_SELL_${generateTransactionReference(9)}`,
                    type: "Sell",
                    from: user.id,
                    to: uuid(),
                    volume: values.amount,
                    price: process.env.BUY_PRICE,
                    status: "Pending",
                    owner_model: "user"
                }, t)
            ])

            return true
        })
    }

    async getTokenDetails(user, tokenId) {
        const token = await tokenQueries.getTokenById(tokenId)
        if(!token) {
            throw new Error("Token not found")
        }
        const wallet = await walletQueries.getWalletByQuery({userId: user.id, tokenId: tokenId })

        if(!wallet) {
            throw new Error("You don't have any investment in this token")
        }

        const transaction = await transactionQueries.getTransactionByQuery({ user: user.id, tokenId: tokenId, owner_model: "user"})


        return {
            "number_of_tokens_owned": wallet.balance,
            "total_amount_invested": wallet.balance * process.env.BUY_PRICE,
            "current_value_of_token": token
        }
    }
}

module.exports = new TokenDAO()