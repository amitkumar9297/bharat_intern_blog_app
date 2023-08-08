const userModel = require('../models/userModel');

const bcrypt = require("bcrypt");

// create user register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                sources: false,
                message: 'please fill all field'
            })
        }
        // exiting users
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(401).send({
                sucess: false,
                message: 'user already exist',
                // error
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user
        const user = new userModel({ username, email, password: hashedPassword })
        user.save();

        return res.status(201).send({
            success: true,
            message: 'New User Created',
            user,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error in register callback",
            success: false
            // error
        })
    }
};

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all user data",
            users,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in the get all user",
            err,
        })
    }
};

// login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email or password",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invlid username or password"
            });
        }
        return res.status(200).send({
            success: true,
            messgae: "login successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error
        });
    }
};