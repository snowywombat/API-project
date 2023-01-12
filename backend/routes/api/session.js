// backend/routes/api/session.js
const express = require('express')


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { user } = require('pg/lib/defaults');

const validateLogin = [
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
router.post('/', validateLogin, requireAuth, async (req, res, next) => {
  const { credential, password } = req.body;

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

  const user = await User.login({ credential, password });

  if(!user) {
    res.status(401),
    res.json({
    message: 'Authentication required',
    statusCode: 401,
    errors: {
      credentials: 'The provided credentials are invalid.'
      }
    })
  }

  await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: ''

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
