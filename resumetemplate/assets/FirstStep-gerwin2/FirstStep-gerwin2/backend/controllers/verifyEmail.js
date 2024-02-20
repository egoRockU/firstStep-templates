import asyncHandler from 'express-async-handler'
import LocalAccount from '../models/localAccountModel.js'
import GoogleAccount from '../models/googleAccountModel.js'

const verifyEmail = asyncHandler(async(req, res) => {
    const {uniqueString} = req.params

    const account = await Promise.all([
        LocalAccount.findOne({ uniqueString }),
        GoogleAccount.findOne({ uniqueString })
    ]).then(([account1, account2])=> account1 || account2 )

    if (account) {
        account.isVerified = true
        account.uniqueString = ""
        await account.save()
        console.log(`${account.email} is now verified`)
    } else {
        res.status(404).send(`<h3>Page not Found</h3>
                            <p>Token already expired</p>`)
        throw new Error('Account not Found')
    }

    res.status(200).send(`
    <body style="text-align: center;">
        <h3>Your email is now verified!</h3>
        <p>Thank you for verifying your email.</p>
    </body>
    `)
})

export default verifyEmail