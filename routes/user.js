const {Way, User, UserInfo} = require('../db/models/');

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

// ////////////////////////////////////////////////////////////
router.get('/edit/:id', async (req, res) => {
  let user
  // let userInfo;
  try {
    user = await User.findOne({
      where: {name: res.locals?.username},
      include: [{
        model: UserInfo,
        attributes: ['bike', 'city', 'about_me', 'age']
      }],
       raw: true
      })

  } catch (error) {
    
  }
  user.age = user['UserInfo.age']
  user.about_me = user['UserInfo.about_me']
  user.city = user['UserInfo.city']
  user.bike = user['UserInfo.bike']

  userlogIn = {id: user.id}
  res.render('editProfile', {user, userlogIn})
})
// ////////////////////////////////////////////////////////////
router.put('/edit/:id', async (req, res) => {
  // let user
  // let userInfo;
  // console.log('------------------')
  console.log('------------------', req.body)
  try {
    const editUser = UserInfo.update({
        city: req.body.city, 
        bike: req.body.bike ,
        age: req.body.age,
        about_me: req.body.about_me,
        // role: req.body.age
      },
       {where:{user_id:req.body.user_id}});
  } catch (error) {
    
  }
  res.json({})
})
// ////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  let user
  // let user2
  // let userInfo;
  try {
  // console.log(req.params?.id)
    user = await User.findOne({
      where: {id: req.params?.id},
      include: [{
        model: UserInfo,
        attributes: ['bike', 'city', 'about_me', 'age']
      }],
       raw: true
      })
        // вставить инклюд и роль
      userlogIn = await User.findOne({
        where: {name: res.locals?.username},
        raw: true
        })
        // console.log('---------------------', userlogIn)
  } catch (error) {
    
  }

  user.age = user['UserInfo.age']
  user.about_me = user['UserInfo.about_me']
  user.city = user['UserInfo.city']
  user.bike = user['UserInfo.bike']
  if (userlogIn.role === 'admin' || userlogIn.id == user.id) user.userHome = true
  console.log(user)
  res.render('userProfile', {user , userlogIn})
})
// /////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
  res.redirect('/')
})

module.exports = router;



