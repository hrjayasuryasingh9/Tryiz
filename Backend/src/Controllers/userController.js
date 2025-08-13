import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import * as userServices from "../Services/userServices.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "www.smdaffan5.www@gmail.com",
    pass: process.env.MAILER,
  },
});

const JWT_SECRET = process.env.JWT_SECRET;

const signUpUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const is_verified = false;
  if (!name || !email || !phone || !password) {
    res.status(400).json({ message: "Please provide all the fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Please Enter the password with more than 6 characters",
    });
  }
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = await userServices.signUpUser(
      name,
      email,
      hashedpassword,
      phone,
      is_verified,
      verificationToken
    );
    const verificationLink = `https://tryiz.onrender.com/api/auth/verify?token=${verificationToken}`;
    const mailOptions = {
      from: '"Tryiz" <www.smdaffan5.www@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 0;
                    background-color: #ffffff;
                }
                .header {
                    text-align: center;
                    padding: 30px 0;
                    background-color: #000000;
                    color: #ffffff;
                }
                .header h1 {
                    font-size: 2.5rem;
                    margin: 0;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .caption {
                    text-align: center;
                    font-size: 1.1rem;
                    color: #666;
                    margin: 20px 0;
                    letter-spacing: 1px;
                }
                .content {
                    padding: 30px;
                    border: 1px solid #e0e0e0;
                    border-top: none;
                }
                .about {
                    margin: 25px 0;
                    padding: 20px;
                    background-color: #f8f8f8;
                    border-left: 3px solid #000;
                }
                .about p {
                    margin: 10px 0;
                }
                .button-container {
                    text-align: center;
                    margin: 35px 0;
                }
                .verify-button {
                    display: inline-block;
                    padding: 14px 35px;
                    background-color: #000;
                    color: #fff;
                    text-decoration: none;
                    border: 2px solid #000;
                    font-weight: bold;
                    font-size: 1rem;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                }
                .verify-button:hover {
                    background-color: #fff;
                    color: #000;
                }
                .divider {
                    height: 1px;
                    background-color: #e0e0e0;
                    margin: 25px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.8rem;
                    color: #999;
                }
                .signature {
                    margin-top: 30px;
                    font-style: italic;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Tryiz</h1>
            </div>
            
            <div class="content">
                <p class="caption">EXPLORE YOURSELF</p>
                
                <div class="about">
                    <p>Welcome to Tryiz Optical - where clarity meets style.</p>
                    <p>Our store is dedicated to providing premium eyewear that combines precision optics with minimalist design. We believe in enhancing vision without compromising on aesthetics.</p>
                    <p>Each frame in our collection is carefully selected to offer both visual correction and timeless elegance.</p>
                </div>
                
                <p>To complete your registration and access your account, please verify your email address:</p>
                
                <div class="button-container">
                    <a href="${verificationLink}" class="verify-button">VERIFY EMAIL</a>
                </div>
                
                <div class="divider"></div>
                
                <p>If you didn't request this verification, please ignore this email or contact our support team.</p>
                
                <div class="signature">
                    <p>The Tryiz Team</p>
                </div>
                
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Tryiz Optical. All Rights Reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    if (error.code === "P2002") {
      const target = error.meta?.target;

      if (target.includes("email")) {
        res
          .status(400)
          .json({ message: "User with this email already exists" });
      } else if (target.includes("phone")) {
        res
          .status(400)
          .json({ message: "User with this phone number already exists" });
      } else {
        res
          .status(400)
          .json({ message: "User with this credential already exists" });
      }
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
const getVerified = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Invalid verification link" });
  }
  try {
    const result = await userServices.verification(token);
    if (result === "invalid or expired token") {
      res.status(500).json({ message: "invalid or expired token" });
    } else {
      res.send("<h2>Email verified successfully! You can now log in.</h2>");
      res.redirect("https://tryiz.vercel.app/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter the data in all the given fields" });
  }
  try {
    const user = await userServices.getuserdata(email);
    if (user) {
      if (user.is_verified == false) {
        return res
          .status(404)
          .json({ message: "Please verify your email before login." });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.hashed_password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      generateJWT(user.email, user.id, res);
      res.status(200).json({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        profile_pic: user.profile_pic,
        address: user.address,
        created_at: user.created_on,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateJWT = (email, userID, res) => {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    sameSite: "None", 
    secure: true,     
  });

  return token;
};

const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email Not provided" });
    }
    const userdata = await userServices.getuserdata(email);
    if (!userdata) {
      return res
        .status(400)
        .json({ message: "User didnt found with the email" });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const uese = await userServices.addVerificationToken(
      email,
      verificationToken
    );
    const verificationLink = `http://localhost:5173/changepassword?token=${verificationToken}`;
    const mailOptions = {
      from: '"Tryiz" <www.smdaffan5.www@gmail.com>',
      to: email,
      subject: "Reset Your Password - Tryiz",
      html: `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 0;
                background-color: #ffffff;
            }
            .header {
                text-align: center;
                padding: 30px 0;
                background-color: #000000;
                color: #ffffff;
            }
            .header h1 {
                font-size: 2.5rem;
                margin: 0;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
            }
            .caption {
                text-align: center;
                font-size: 1.1rem;
                color: #666;
                margin: 20px 0;
                letter-spacing: 1px;
            }
            .content {
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-top: none;
            }
            .about {
                margin: 25px 0;
                padding: 20px;
                background-color: #f8f8f8;
                border-left: 3px solid #000;
            }
            .about p {
                margin: 10px 0;
            }
            .button-container {
                text-align: center;
                margin: 35px 0;
            }
            .reset-button {
                display: inline-block;
                padding: 14px 35px;
                background-color: #000;
                color: #fff;
                text-decoration: none;
                border: 2px solid #000;
                font-weight: bold;
                font-size: 1rem;
                letter-spacing: 1px;
                transition: all 0.3s ease;
            }
            .reset-button:hover {
                background-color: #fff;
                color: #000;
            }
            .divider {
                height: 1px;
                background-color: #e0e0e0;
                margin: 25px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 0.8rem;
                color: #999;
            }
            .signature {
                margin-top: 30px;
                font-style: italic;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Tryiz</h1>
        </div>
        
        <div class="content">
            <p class="caption">RESET YOUR PASSWORD</p>
            
            <div class="about">
                <p>We received a request to reset the password for your Tryiz account.</p>
                <p>If you made this request, click the button below to set a new password.</p>
                <p>This link is valid for a limited time and can only be used once.</p>
            </div>
            
            <div class="button-container">
                <a href="${verificationLink}" class="reset-button">RESET PASSWORD</a>
            </div>
            
            <div class="divider"></div>
            
            <p>If you didn't request this, you can safely ignore this email — your current password will remain unchanged.</p>
            
            <div class="signature">
                <p>The Tryiz Team</p>
            </div>
            
            <div class="footer">
                <p>© ${new Date().getFullYear()} Tryiz Optical. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Request submited. Check your email to change password",
      token: verificationToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const token = req.query.token;
    const password = req.body.password;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and password are required" });
    }

    const userdata = await userServices.getuserdatawithToken(token);
    if (!userdata || userdata.verification_token !== token) {
      return res
        .status(400)
        .json({ message: "Authentication token is not valid" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userServices.changePassword(token, hashedPassword);

    if (!user) {
      return res
        .status(400)
        .json({ message: "The token is invalid to change the password" });
    }

    res.status(200).json({
      message: "Password changed successfully! Please continue to login.",
    });
  } catch (error) {
    console.log("Password reset error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  signUpUser,
  getVerified,
  userLogin,
  userLogout,
  checkAuth,
  forgotPassword,
  changePassword,
};
