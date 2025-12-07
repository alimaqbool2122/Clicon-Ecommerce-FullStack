import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verifyMail } from "../emailVerify/verifyMail.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";

// For Registration
export const registerUser = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, password_confirmation } = req.body;

        if (!username || !first_name || !last_name || !email || !password || !password_confirmation) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== password_confirmation) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            password_confirmation: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        verifyMail(token, email);
        newUser.token = token;
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// For Verification
export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing or invalid"
            })
        }

        const token = authHeader.split(" ")[1]

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Prevent re-verification if already verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified"
            });
        }
        user.isVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// For Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(402).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        //check if user is verified 
        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "Verify your account than login"
            })
        }

        // check for existing session and delete it
        // const existingSession = await Session.findOne({ userId: user._id });
        // if (existingSession) {
        //     await Session.deleteOne({ userId: user._id })
        // }

        //create a new session
        // await Session.create({ userId: user._id })

        //Generate tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" })
        const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" })

        // user.isLoggedIn = true;
        // await user.save()

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.username}`,
            accessToken,
            refreshToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// For Logout
export const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;
        // await Session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// For ForgetPassword
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        // 1️⃣ Check Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token verification failed"
            });
        }

        // 3️⃣ Find user by decoded ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 4️⃣ Validate input
        const { username, first_name, last_name, email, password, password_confirmation } = req.body;
        if (!username || !first_name || !last_name || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields except password are required"
            });
        }

        if (password || password_confirmation) {
            if (password !== password_confirmation) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // 5️⃣ Update profile fields
        user.username = username;
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get User Profile
export const getProfile = async (req, res) => {
    try {
        // Check Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token verification failed"
            });
        }

        const userId = req.params.id; // <-- Get ID from URL params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required in URL"
            });
        }

        // Find user by decoded ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return profile data
        return res.status(200).json({
            success: true,
            data: {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Email and OTP code are required"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP not generated or already verified"
            })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one"
            })
        }
        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        // Mark OTP as verified
        user.otp = null
        user.otpExpiry = null
        user.otpVerified = true;
        await user.save()

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// RESEND OTP
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if OTP already exists
        if (user.otp && user.otpExpiry) {
            const timePassed = Date.now() - (user.lastOtpSent || 0);

            if (timePassed < 60 * 1000) {
                const remaining = Math.ceil((60 * 1000 - timePassed) / 1000);
                return res.status(429).json({
                    success: false,
                    message: `Please wait ${remaining} seconds before requesting a new OTP`
                });
            }
        }

        // Generate new OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 min

        user.otp = newOtp;
        user.otpExpiry = expiry;
        user.lastOtpSent = Date.now(); // Track resend timer

        await user.save();

        // Send OTP email again
        await sendOtpMail(email, newOtp);

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// update-password
export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword, email, token } = req.body

    if (!newPassword || !confirmPassword || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password do not match"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // OPTIONAL: verify token if you have one
        if (token && user.resetToken !== token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // IMPORTANT: BLOCK IF OTP NOT VERIFIED
        if (!user.otpVerified) {
            return res.status(401).json({
                success: false,
                message: "OTP verification required before resetting password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.otpVerified = false;
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password changed successsfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Delete User (Hard Delete)
export const deleteUser = async (req, res) => {
    try {
        // Check Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token verification failed"
            });
        }

        // 3️⃣ Get userId from URL params
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // 4️⃣ Delete the user
        const deletedUser = await User.findOneAndDelete({ userId: Number(userId) });

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




