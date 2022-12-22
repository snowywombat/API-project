// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { user } = require('pg/lib/defaults');

const validateLogin = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a firstName.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a lastName.'),
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password, firstName, lastName } = req.body;

  const findUsers = await User.findAll()

  for(let i = 0; i < findUsers.length; i++) {
    let user = findUsers[i]

    if (!user.email) {
      res.status(401),
      res.json({
        message: 'Authentication required',
        statusCode: 401,
        errors: {
          email: 'The provided credentials are invalid.'
        }
      })
    }

    else if (!user.username) {
      res.status(401),
      res.json({
        message: 'Authentication required',
        statusCode: 401,
        errors: {
          username: 'The provided credentials are invalid.'
        }
      })
    }

    else if (!user.password) {
      res.status(401),
      res.json({
        message: 'Authentication required',
        statusCode: 401,
        errors: {
          password: 'The provided password is incorrect.'
        }
      })
    }
  }

  // if(credential.length === 0 && (!credential.includes('@') || !credential.includes('.com') )) {
  //   res.status(400),
  //   res.json({
  //     message: "Validation error",
  //     statusCode: 400,
  //     errors: {
  //       email: "Invalid email",
  //     }
  //   })
  // }


  const user = await User.login({ credential, password, firstName, lastName });
  console.log(user)

  await setTokenCookie(res, user);

  return res.json({
    firstName,
    lastName,
    credential,
    password
  });

});

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/', requireAuth,
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
);


module.exports = router;
