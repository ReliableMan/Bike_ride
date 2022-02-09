const {Way, User} = require('../db/models/');

const express = require('express');
const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  isValid,
  renderSignInForm,
  renderSignUpForm,
  renderProfile
} = require('../controllers/userControllers');

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


router.get('/:id', async (req, res) => {
  let user

  try {
    user = await User.findOne({where: {name: res.locals?.username}, raw: true})
  } catch (error) {
    
  }
  // res.render('error')
  // console.log(req.query)
  res.render('infoRoad', {user})
})


module.exports = router;
