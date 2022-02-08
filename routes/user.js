const express = require('express');
const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  isValid,
  renderSignInForm,
  renderSignUpForm,
  renderProfile
} = require("../controllers/userControllers");

const router = express.Router();





router
  .route('/signup')
  // Страница регистрации пользователя
  .get(renderSignUpForm)
  // Регистрация пользователя
  .post(isValid,  createUserAndSession);

router
  .route('/signin')
  // Страница аутентификации пользователя
  .get(renderSignInForm)
  // Аутентификация пользователя
  .post(checkUserAndCreateSession);

router.get('/signout', destroySession);
router.get('/profile', renderProfile )


router.get('/:id', (req, res) => {
  // res.render('error')
  // console.log(req.query)
  res.send('drfgtdfhbdtfhb')
})


module.exports = router;
