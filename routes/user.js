const express = require('express');
const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  renderSignInForm,
  renderSignUpForm,
  renderFormEditUser,
  editUserProfile,
  renderUserProfile,
  EditIsAdmin
} = require('../controllers/userControllers');

const { isValid } = require('../middleWares/isValid')
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
  .route('/edit/:id')                          
  // Генерация страницы, редактирования профиля
  .get(isAuth, isRedactorProfile, renderFormEditUser)
  // Получение данных - редактирования профиля
  .put(isAuth, isRedactorProfile, editUserProfile);

router
  .route('/admin/:id')
  // редактирование прав админа
  .put(isAdmin, EditIsAdmin);
  
router
  .route('/:id')
  // Генерация формы информации о пользователе
  .get(isAuth, renderUserProfile);

router.get('/', async (req, res) => res.redirect('/'));
// если не введены данные то редиректим на главную страницу


module.exports = router;



