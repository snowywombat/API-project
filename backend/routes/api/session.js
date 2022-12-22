// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {

    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });


    // try{
    //   const { credential, password } = req.body;

    //   let user = null;

    //   const findUsers = await User.findAll()
    //   for(let i = 0; i < findUsers.length; i++) {
    //     // console.log(findUsers[i].email + 'and' + credential)
    //     if(findUsers[i].email === credential) {
    //       user = findUsers[i]
    //     }
    //   }

    //   if(credential.length === 0) {
    //     res.status(400),
    //     res.json({
    //       message: 'Validation error',
    //       statusCode: 400,
    //       error: {
    //         credential: 'Email or username is required'
    //       }
    //     })

    //   }
    //   else if(!password) {
    //     res.status(400),
    //     res.json({
    //       message: 'Validation error',
    //       statusCode: 400,
    //       error: {
    //         credential: 'Password is required'
    //       }
    //     })
    //   }


    // else if (user !== null) {
    //     const userLogin = await User.login({ credential, password });
    //       await setTokenCookie(res, userLogin);
    //       return res.json({
    //         userLogin
    //       });
    //   }


    //   else {
    //     res.status(401),
    //     res.json({
    //       message: 'Invalid credentials',
    //       statusCode: 401
    //     })
    //   }

    // }

    // catch(error) {
    //   res.status(400),
    //   res.json({
    //     message: 'Validation error',
    //       statusCode: 400,
    //       error: error
    //   })

    // }
    //

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
