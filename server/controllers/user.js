import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import alert from 'alert';
import dotenv from 'dotenv';
dotenv.config();


export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) {
            alert("User does not exist!");
            return res.status(404).json({message: "User does not exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) {
            alert("Invalid credentials!");
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.secret, {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) {
            alert("User already exists!");
            return res.status(400).json({message: "User already exists"});
        }

        if(password !== confirmPassword) {
            alert("Passwords don't match!");
            return res.status(400).json({message: "Passwords don't match"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, process.env.secret, {expiresIn: "1h"});

        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
        console.log(error);
    }
};