const {Way, User, UserInfo} = require('../db/models/');
const {sortWays, sortRating} = require('../middleWares/sortWays')
const {ratingController} = require('../controllers/ratingController')

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
  let userlogIn
  // let userInfo;
  try {
    userlogIn= await User.findOne({
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
  userlogIn.isAdmin = false;
  if (userlogIn['UserInfo.role'] === 'admin') userlogIn.isAdmin = true
  if (userlogIn['UserInfo.role'] !== 'admin' && userlogIn.id !== user.id) return res.json({ message: 'У вас нет прав для редактирования профиля' });
  res.render('editProfile', {user, userlogIn})
})
// ////////////////////////////////////////////////////////////
router.put('/admin/:id', async (req, res) => {
  let user
  let userlogIn
  // console.log('////////////////////////',res.locals?.username);
  // let userInfo;
  try {
    userlogIn = await User.findOne({
      where: {name: res.locals?.username},
      include: [{
        model: UserInfo,
        attributes: ['role']
      }], raw: true 
    })
    // console.log('............///////////////..',userQuest['UserInfo.role'] === 'admin')
      if (userlogIn['UserInfo.role'] === 'admin') {
        // console.log('..............', 444444444444)
        user = await UserInfo.update({
          role: req.body.role
        },{where:{user_id:req.body.user_id}})
        //  {where:{user_id:req.body.user_id}, returning: true});
      } else {
        return res.json({ message: 'У вас нет на это прав' });
      }
      // console.log('..............', editUser)
  } catch (error) {
    return res.json({ message: 'Не удалось обновить запись в базе данных.' });
  }
  res.json({user})
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
  let userlogIn
  let ways;
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
      const ways1 = await Way.findAll({order:[['id', 'DESC']], where: {user_id: user.id}, raw: true});
      ways = await ratingController(ways1);
        // console.log('---------------------', userlogIn)
  } catch (error) {
    
  }

  user.age = user['UserInfo.age']
  user.about_me = user['UserInfo.about_me']
  user.city = user['UserInfo.city']
  user.bike = user['UserInfo.bike']
  if (userlogIn['UserInfo.role'] === 'admin' || userlogIn.id == user.id) userlogIn.isEditor = true
  // console.log( userlogIn)
  res.render('userProfile', {user , userlogIn, ways})
})
// /////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
  res.redirect('/')
})

module.exports = router;



