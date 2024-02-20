import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.get('/', asyncHandler(async (req, res)=>{
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User logged out successfully'})
}))

export default router
