import express from "express"
import { loginUser, logoutUser, registerUser, verification, forgotPassword, verifyOTP, changePassword, resendOtp, deleteUser, updateProfile, getProfile } from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/verify-mail', verification)
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOTP)
router.post('/resend-otp', resendOtp)
router.post('/update-password', changePassword)
router.post('/update-profile', isAuthenticated, updateProfile)
router.delete('/delete-user/:user_id', isAuthenticated, deleteUser)
router.get("/profile/:id", isAuthenticated, getProfile);


export default router