import jwt from 'jsonwebtoken';
import bcrytp from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from './../models/User.js';

export const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const passwod = req.body.password;
        const salt = await bcrytp.genSalt(10);
        const hash = await bcrytp.hash(passwod, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        const user = await doc.save();

        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '10d' });
        const { passwordHash, ...userData } = user._doc;
        res.json({
            userData,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to signup'
        })
    }
};
export const signin = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isValidPass = await bcrytp.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'login or password is not correct'
            })
        }
        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '10d' });

        const { passwordHash, ...userData } = user._doc
        res.json({
            userData,
            token,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to signin'
        });
    }
};
export const me = async (req, res) => {

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'no access'
        })
    }
};