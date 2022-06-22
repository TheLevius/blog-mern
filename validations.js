import { body } from 'express-validator';

export const signinValidation = [
    body('email', 'invalid format of email').isEmail(),
    body('password', 'should be greater than 5 symbols').isLength({ min: 5 })
];
export const signupValidation = [
    body('email', 'invalid format of email').isEmail(),
    body('password', 'should be greater than 5 symbols').isLength({ min: 5 }),
    body('fullName', 'should be greater than 3 symbols').isLength({ min: 3 }),
    body('avatarUrl', 'should be a link').optional().isURL()
];
export const postCreateValidation = [
    body('title', 'Enter the header of artcle').isLength({ min: 3 }).isString(),
    body('text', 'Enter the text of article').isLength({ min: 10 }).isString(),
    body('tags', 'Format is not correct (should be array)').optional().isArray(),
    body('imageUrl', 'should be a link').optional().isString(),
];