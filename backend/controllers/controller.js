const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'Deek';

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({message:'user already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ email: email, userid: newUser._id }, JWT_SECRET);
        res.cookie('tokens', token);
        return res.status(200).json({message:'Your account registered successfully'});
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('An error occurred during registration.');
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message:'user not found please register'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
            res.cookie('tokens', token);
            res.status(201).json({message:'user logged in successfully'})
        } else {
            res.status(500).json({message:'server error'})
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('An error occurred during login.');
    }
};
exports.logoutUser = (req, res) => {
    res.cookie('tokens', ' '); 
};

// exports.getProfile = (req, res) => {
//     if (!req.user) {
//         return res.send('User does not exist');
//     }
//     res.render('profile', { user: req.user });
// };
