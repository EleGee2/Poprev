const jwt = require('jsonwebtoken')
const HttpStatus = require("http-status-codes")
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");
const { promisify } = require('util');
const Users = require("../models/user")(sequelize, DataTypes)
const Organisations = require("../models/organisation")(sequelize, DataTypes)


const OrganisationTypes = {"LABEL": "label", "ARTIST": "artist"}

const signToken = (id, email, type) => {
    const duration = 60 * 60 * 24
    return jwt.sign({ id, email, type }, process.env.JWT_SECRET, {
      expiresIn: duration,
    })
}

const validateToken = async (req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ') [1];
      }

    if (!token) {
      return res.status(401).json({ message: "You are not logged in! Please log in to get access." });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET).catch(error => {
      throw new Error("Invalid Token")
    })

    let user;
    if (decoded.type && Object.values(OrganisationTypes).includes(decoded.type)) {
      user = await Organisations.findOne({ where: { email: decoded.email }})
      user = user.toJSON()
    } else {
      user = await Users.findOne({ where: { email: decoded.email }})
      user = user.toJSON()
    }

    if(user) {
      return user
    }

    return {
      status: "failed",
      data: HttpStatus.UNAUTHORIZED,
      message: "Invalid Token"
    }

  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: "Invalid Token"})
  }
}

const isUser = async (req, res, next) => {
  const token = await validateToken(req, res)

  if(token.status === "failed") throw new Error(token.message)

  if (token.type === "user" || token.type === "admin") {
    req.user = token
    next()
  } else {
    res.status(400).json({ message: "Access not granted to this user resource"})
  }
}

const isOrganisation = async (req, res, next) => {
  const token = await validateToken(req, res)

  if(token.status === "failed") throw new Error(token.message)

  if (Object.values(OrganisationTypes).includes(token.type)) {
    req.user = token
    next()
  } else {
    res.status(400).json({ message: "Access not granted to this organisation resource"})
  }
}

exports.signToken = signToken
exports.validateToken = validateToken
exports.isUser = isUser
exports.isOrganisation = isOrganisation