// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { user } = require('pg/lib/defaults');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// // Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const findUsers = await User.findAll()

    for(let i = 0; i < findUsers.length; i++) {
      let user = findUsers[i]
      if(user.email === email) {
        res.status(403),
        res.json({
          message: 'User already exists',
          statusCode: 403,
          errors: {
            email: 'User with that email already exists'
          }
        })
      }

      else if(user.username === username) {
        res.status(403),
        res.json({
          message: 'User already exists',
          statusCode: 403,
          errors: {
            email: 'User with that username already exists'
          }
        })
      }
    }

    if(!email) {
        res.status(400),
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            email: "Invalid email",
          }
      })
    }

    else if(username.length < 4) {
      res.status(400),
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            username: "Username is required",
          }
      })

    }

    else if(firstName.length === 0) {
        res.status(400),
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            firstName: "First Name is required",
          }
      })

    }


    else if(lastName.length === 0) {
      res.status(400),
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            lastName: "Last Name is required"
          }
      })

    }

    else {
      const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        res.status(200)
        return res.json({
          user
       });

      }

    })


module.exports = router;
