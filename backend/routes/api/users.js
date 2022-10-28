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
      const user = await User.signup({ firstName, lastName, email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
  );

// Sign up
// router.post('/', async(req, res, next) => {

//   const { firstName, lastName, email, username, password } = req.body;

//   const userList = await User.findAll({
//     where: {
//       firstName,
//       lastName,
//       email,
//       username,
//       password
//     }
//   });

//   if(userList.length) {
//     const err = newError('This user already exists')
//     err.status = 403
//     next(err)
//   } else if (!userList) {
//     const userErr = new Error ('This user cannot be found')
//     err.status = 400
//     next(userErr)
//   } else {
//     const users = await User.create ({
//       firstName,
//       lastName,
//       email,
//       username,
//       password

//     })

//     res.json(users)

//   }
  // const user = {
  //   firstName,
  //   lastName,
  //   email,
  //   username,
  //   password
  // };
  // console.log(user)

//   await setTokenCookie(res, user);


// });


module.exports = router;
