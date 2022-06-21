import { body } from 'express-validator';

export const signupValidation = [
    body('email', 'invalid format of email').isEmail(),
    body('password', 'should be greater than 5 symbols').isLength({ min: 5 }),
    body('fullName', 'should be greater than 3 symbols').isLength({ min: 3 }),
    body('avatarUrl', 'should be a link').optional().isURL(),
]