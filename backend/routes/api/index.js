const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const { requireAuth } = require('../../utils/auth.js');


router.get('/test', requireAuth, (req, res) => {
  res.json({ message: 'success'})
})

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.post('/test', function(req, res) { //PHASE 1/2
  res.json({ requestBody: req.body });
});

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// // GET /api/restore-user
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
// router.use(restoreUser);

// router.get( //PHASE 3
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/set-token-cookie //PHASE 3
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// // GET /api/require-auth //PHASE 3
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
