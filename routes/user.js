// const {Way, User, UserInfo} = require('../db/models/');
// const {sortWays, sortRating} = require('../middleWares/sortWays')
// const {ratingController} = require('../controllers/ratingController') // 1111

const express = require('express');
const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  isValid,
  renderSignInForm,
  renderSignUpForm,
  renderFormEditUser,
  editUserProfile,
  renderUserProfile,
  EditIsAdmin
  // renderProfile
} = require('../controllers/userControllers');

const { isAdmin } = require('../middleWares/isAdmin')
const { isAuth } = require('../middleWares/isAuth')
const { isRedactorProfile } = require('../middleWares/isRedactor')
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

router
  .route('/edit/:id')                          //  1111 роутер перенаправлен
  // Генерация страницы, редактирования профиля
  .get(isAuth, isRedactorProfile, renderFormEditUser)
  // Получение данных - редактирования профиля
  .put(editUserProfile);

router
  .route('/admin/:id')
  // редактирование прав админа
  .put(isAdmin, EditIsAdmin);
  
router
  .route('/:id')
  // Генерация формы информации о пользователе
  .get(isAuth, renderUserProfile);

router.get('/', async (req, res) => {
  res.redirect('/') // если не введены данные то редиректим на главную страницу
})

module.exports = router;



