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
  let userQuest
  // let userInfo;
  try {
    userQuest = await User.findOne({
      where: {name: res.locals?.username},
      include: [{
        model: UserInfo,
        attributes: ['role']
      }],
       raw: true
      })
    user = await User.findOne({
      where: {id: req.params?.id},
      include: [{
        model: UserInfo,
        attributes: ['bike', 'city', 'about_me', 'age', 'role']
      }],
       raw: true
      })

  } catch (error) {
    
  }
  user.age = user['UserInfo.age']
  user.about_me = user['UserInfo.about_me']
  user.city = user['UserInfo.city']
  user.bike = user['UserInfo.bike']
  user.userRole = user['UserInfo.role'] !== 'admin'
  let isAdmin = false;
  if (userQuest['UserInfo.role'] === 'admin') isAdmin = true
  userlogIn = {id: user.id}
  res.render('editProfile', {user, userlogIn, isAdmin})
})
// ////////////////////////////////////////////////////////////
router.put('/admin/:id', async (req, res) => {
  let user
  let editUser
  let userQuest
  // console.log('////////////////////////',res.locals?.username);
  // let userInfo;
  try {
    userQuest = await User.findOne({
      where: {name: res.locals?.username},
      include: [{
        model: UserInfo,
        attributes: ['role']
      }], raw: true 
    })
    // console.log('............///////////////..',userQuest['UserInfo.role'] === 'admin')
      if (userQuest['UserInfo.role'] === 'admin') {
        // console.log('..............', 444444444444)
        editUser = await UserInfo.update({
          role: req.body.role
        },{where:{user_id:req.body.user_id}})
        //  {where:{user_id:req.body.user_id}, returning: true});
      }
      // console.log('..............', editUser)
  } catch (error) {
    return res.json({ message: 'Не удалось обновить запись в базе данных.' });
  }

  res.json({editUser})
})

// ////////////////////////////////////////////////////////////
router.put('/edit/:id', async (req, res) => {
  let user
  let userInfo;
  let finddit
  // console.log('------------------')
  // console.log('------------------', req.body)
  try {
    // finddit = await UserInfo.findOne({where:{user_id: req.body.user_id}})
    // if (!finddit) {
      const editUser = await UserInfo.update({
            city: req.body.city, 
            bike: req.body.bike ,
            age: req.body.age,
            about_me: req.body.about_me,
            // role: req.body.age
          },
           {where:{user_id:req.body.user_id}});
        if (!editUser[0]) {
          // user = await User.findOne({ where: {name: res.locals?.username}, raw: true})
        userInfo = await UserInfo.create({ 
          age: req.body.age, 
          bike: req.body.bike,
          city: req.body.city,
          about_me: req.body.about_me,
          user_id: req.body.user_id,
          role: 'user'
        });
      }
      
    // console.log('------------------86', finddit)
  } catch (error) {
    // return res.json({ message: 'Не удалось обновить запись в базе данных.' });
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
        attributes: ['bike', 'city', 'about_me', 'age', 'role']
      }],
       raw: true
      })
        // вставить инклюд и роль
      userlogIn = await User.findOne({
        where: {name: res.locals?.username},
        include: [{
          model: UserInfo,
          attributes: ['role'] 
        }],
        raw: true
        })
        // console.log('---------------------', userlogIn)
  } catch (error) {
    
  }

  user.age = user['UserInfo.age']
  user.about_me = user['UserInfo.about_me']
  user.city = user['UserInfo.city']
  user.bike = user['UserInfo.bike']
  if (userlogIn['UserInfo.role'] === 'admin' || userlogIn.id == user.id) user.userHome = true
  // console.log( userlogIn)
  res.render('userProfile', {user , userlogIn})
})
// /////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
  res.redirect('/')
})

module.exports = router;



