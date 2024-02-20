import express from 'express'
import { createGoogleAccount, 
    getAllGoogleAccounts,
    loginGoogle,
    addProfile
} from '../controllers/googleAccountController.js'
import authenticateToken from '../middlewares/authenticateToken.js'
const router = express.Router()

router.get('/', authenticateToken, getAllGoogleAccounts)
router.post('/create', createGoogleAccount)
router.post('/login', loginGoogle)
router.post('/addprofile', addProfile)


export default router