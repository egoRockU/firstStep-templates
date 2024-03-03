import asyncHandler from 'express-async-handler'
import LocalAccount from '../models/localAccountModel.js'
import bcrypt from 'bcrypt'
import checkIfEmailExist from '../utils/checkIfEmailExists.js'
import generateToken from '../utils/generateToken.js'
import GoogleAccount from '../models/googleAccountModel.js'
import crypto from 'crypto'
import sendVerificationEmail from '../utils/sendVerificationEmail.js'

const saltRounds = 10

const getAllLocalAccounts = asyncHandler(async (req, res) => {
    const accounts = await LocalAccount.find({})

    if(!accounts) {
        res.status(404)
        throw new Error('No users found')
    }

    res.status(200).json(accounts)
})

const createLocalAccount = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const emailExist = await checkIfEmailExist(email, LocalAccount, res)
    const emailExistsInGoogle = await checkIfEmailExist(email, GoogleAccount, res)

    if (emailExist) {
        res.status(400).json({error: 'Email already exists', emailExist: true})
        throw new Error('Email already exists')
    }

    if (emailExistsInGoogle) {
        res.status(400).json({error: 'This email already have an account. Try logging in using Google', emailExist: true})
        throw new Error('This email already have an account. Try logging in using Google')
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const uniqueString = crypto.randomBytes(64).toString('hex')

    const insertResult = await LocalAccount.create({email, password: passwordHash, uniqueString})
    if (!insertResult) throw new Error ('Error creating account')

    sendVerificationEmail(email, uniqueString)

    res.status(201).json({
        message: 'success!',
        _id: insertResult.insertedId
    })

})

const loginLocal = asyncHandler(async (req, res)=>{
    const { email, password } = req.body

    const emailExists = await checkIfEmailExist(email, LocalAccount,res)

    if (!emailExists) {
        res.status(401).json({error: 'Email does not Exist'})
        throw new Error('Email does not Exist')
    }

    const correctPassword = await bcrypt.compare(password, emailExists.password)
    
    if (correctPassword) {
        generateToken(email, res)
        const user = {
            email: emailExists.email,
            id: emailExists._id.toString(),
            accountType: 'local',
            profileType: emailExists.profileType,
            profileId: emailExists.profileId
        }
        res.status(200).json({
            message: 'User Logged In!',
            user
        })
    } else {
        res.status(401).json({error: 'Incorrect Password'})
        throw new Error('Incorrect Password')
    }
})


const changeLocalPassword = asyncHandler(async (req, res) => {
    const {email, password, newPassword} = req.body

    const emailExists = await checkIfEmailExist(email, res)

    if (!emailExists) {
        res.status(401)
        throw new Error('Email does not Exist')
    }

    const correctPassword = await bcrypt.compare(password, emailExists.password)
    if (!correctPassword){
        res.status(401)
        throw new Error('Incorrect Password')
    }

    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

    const updateResult = await LocalAccount.findOneAndUpdate({email}, {password: newPasswordHash})
    if (!updateResult) throw new Error ('Error Updating Password')

    res.status(201).json({
    message: 'Password Changed Successfully!',
    _id: updateResult.id
    })
})

const addProfile = asyncHandler(async (req, res) => {
    const { profileType, profileId, email } = req.body

    const emailExist = await checkIfEmailExist(email, LocalAccount, res)

    if (!emailExist) {
        res.status(401)
        throw new Error('Email does not exist')
    }

    const changeValues = {
        profileType,
        profileId
    }

    const updateResult = await LocalAccount.findOneAndUpdate({email}, changeValues)
    if (!updateResult) throw new Error('Error Updating Profile values')

    const newEmailExist = await checkIfEmailExist(email, LocalAccount, res)

    const user = {
        email: emailExist.email,
        id: emailExist._id.toString(),
        accountType: 'local',
        profileType: newEmailExist.profileType,
        profileId: newEmailExist.profileId
    }
    res.status(201).json({
        message: "Profile Values updated successfully",
        user
    })

})

const logout = asyncHandler(async (req, res)=>{
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User logged out successfully'})
})

export {
    getAllLocalAccounts,
    createLocalAccount,
    loginLocal,
    changeLocalPassword,
    logout,
    addProfile
}