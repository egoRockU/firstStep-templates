import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import checkIfEmailExist from '../utils/checkIfEmailExists.js'
import LocalAccount from '../models/localAccountModel.js'
import GoogleAccount from '../models/googleAccountModel.js'

const authenticateToken = asyncHandler(async (req, res, next) => {
    let token = req.cookies.access_token

    if (token){
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const account = await Promise.all([
            checkIfEmailExist(decoded.email, LocalAccount, res),
            checkIfEmailExist(decoded.email, GoogleAccount, res)
        ]).then(([account1, account2]) => account1 || account2)

        const user = {
            id: account._id.toString(),
            email: account.email
        }

        req.user = user
        next()

    } else {
        res.status(403)
        throw new Error('No access token provided')
    }
})

export default authenticateToken