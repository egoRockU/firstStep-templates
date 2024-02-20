import asyncHandler from 'express-async-handler'
import GoogleAccount from '../models/googleAccountModel.js'
import checkIfEmailExist from '../utils/checkIfEmailExists.js'
import LocalAccount from '../models/localAccountModel.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import sendVerificationEmail from '../utils/sendVerificationEmail.js'

const saltRounds = 10

const getAllGoogleAccounts = asyncHandler(async (req, res) => {
    console.log(req.user)
    const accounts = await GoogleAccount.find({})

    if (!accounts) {
        res.status(404)
        throw new Error('No users found')
    }

    res.status(200).json(accounts)
})

const createGoogleAccount = asyncHandler(async (req, res) => {
    const { email, sub } = req.body

    const emailExist = await checkIfEmailExist(email, GoogleAccount, res)
    const emailExistsInLocal = await checkIfEmailExist(email, LocalAccount, res)

    if (emailExist) {
        res.status(400).json({error: 'Email already exists', emailExist: true})
        throw new Error('Email already exists')
    }

    if (emailExistsInLocal) {
        res.status(400).json({error: 'This email already have an account. Try logging in by entering email and password', emailExist: true})
        throw new Error('This email already have an account. Try logging in by entering email and password')
    }

    const subHash = await bcrypt.hash(sub, saltRounds)
    const uniqueString = crypto.randomBytes(64).toString('hex')

    const insertResult = await GoogleAccount.create({email, sub: subHash, uniqueString})
    if (!insertResult) throw new Error ('Error creating account')
    sendVerificationEmail(email, uniqueString)

    res.status(201).json({
        message: 'success!',
        _id: insertResult.insertedId
    })

})

const loginGoogle = asyncHandler(async (req, res) => {
    const {email, sub} = req.body

    const emailExist = await checkIfEmailExist(email, GoogleAccount, res)

    if (!emailExist){
        res.status(401).json({error: 'This account has not been registered yet.', emailDoesNotExist: true})
        throw new Error('Email does not Exist')
    }

    const correctSub = await bcrypt.compare(sub, emailExist.sub)

    if (!correctSub) {
        res.status(401)
        throw new Error('Invalid sub string.')
    }

    generateToken(email, res)
    const user = {
        email: emailExist.email,
        id: emailExist._id.toString(),
        accountType: 'google',
        profileType: emailExist.profileType,
        profileId: emailExist.profileId
    }
    res.status(200).json({
        message: 'Google User Logged In!',
        user
    })
})

const addProfile = asyncHandler(async (req, res) => {
    const { profileType, profileId, email } = req.body

    const emailExist = await checkIfEmailExist(email, GoogleAccount, res)

    if (!emailExist) {
        res.status(401)
        throw new Error('Email does not exist')
    }

    const changeValues = {
        profileType,
        profileId
    }

    const updateResult = await GoogleAccount.findOneAndUpdate({email}, changeValues)
    if (!updateResult) throw new Error('Error Updating Profile values')

    const newEmailExist = await checkIfEmailExist(email, GoogleAccount, res)

    const user = {
        email: emailExist.email,
        id: emailExist._id.toString(),
        accountType: 'google',                                                                                      
        profileType: newEmailExist.profileType,
        profileId: newEmailExist.profileId
    }

    res.status(201).json({
        message: "Profile Values updated successfully",
        user
    })

})

export {
    getAllGoogleAccounts,
    createGoogleAccount,
    loginGoogle,
    addProfile
}