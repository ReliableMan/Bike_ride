const router = require('express').Router();
const {Way, User, Comment, UserInfo} = require('../db/models/');
const {sortWays, sortRating} = require('../middleWares/sortWays')
const {ratingController} = require('../controllers/ratingController')



router.get('/', async (req, res) => {
  let ways;
  let ways1;
  let userlogIn
  let username 
  try {
    // console.log(res.locals?.username)
    userlogIn = await User.findOne({where: {name: res.locals?.username}, raw: true})
    ways1 = await Way.findAll({order:[['id', 'DESC']], raw: true});
    ways = await ratingController(ways1);

    // ways.forEach( async (el) => {
    //   const arrComments = await Comment.findAll({where: {way_id: el.id}, raw:true})
    //   el.rating = Number((arrComments.reduce((acc, comm) => acc += comm.rating, 0) / arrComments.length).toFixed(2)) || 'рейтинг отсутствует';
    //   // console.log(el)
    // })
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }
  console.log(userlogIn)
  return res.render('index', { ways, userlogIn });
});
// ////////////////////////////////////////////////////////////
// С ФЕТЧА
router.get('/sort/:id', async (req, res) => {
  let ways;
  let ways1;
  let user
  try {
    user = await User.findOne({where: {name: res.locals?.username}, raw: true}) 
    // Настроить параметры сортировки в соответствии с селектом
    
    ways1 = await sortWays(req.params.id)
    // if(req.params.id == 1) ways1 = await Way.findAll({order:[['id', 'ASC']], raw:true});
    // if(req.params.id == 2) ways1 = await Way.findAll({order:[['createdAt', 'DESC']], raw:true});
    // if(req.params.id == 3) ways1 = await Way.findAll({order:[['createdAt', 'ASC']], raw:true});
    // else ways1 = await Way.findAll({order:[['id', 'DESC']], raw:true});
    ways = await ratingController(ways1);
    // ways = await Promise.all(ways1.map( async (el) => {
    //   const arrComments = await Comment.findAll({where: {way_id: el.id}, raw:true})
    //   el.rating = Number((arrComments.reduce((acc, comm) => acc += comm.rating, 0) / arrComments.length).toFixed(2)) || 'рейтинг отсутствует';
    //   return el
    // }));
    if(req.params.id == 1) ways = sortRating(ways)
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }
  
  return res.json({ ways, user });
});
// ////////////////////////////////////////////////////////////
router.post('/comment', async (req, res) => {
  let newComment;
  let user;
  let newRating;
  // console.log('fsdgdfgfhfjhfdjh0')
  try {
    user = await User.findOne({where: {name: res.locals?.username}, raw: true})
    // console.log(req.body.text, req.body.rating, req.body.way_id, user.id)
    newComment = await Comment.create({ text: req.body.text, rating: req.body.rating, user_id: user.id, way_id: req.body.way_id});
    // console.log('fsdgdfgfhfjhfdjh2')
    // console.log(newComment)
    const comment = await Comment.findAll({where: {way_id: req.body.way_id}, raw: true})
    newRating = Number((comment.reduce((acc, el) => acc+= el.rating, 0) / comment.length).toFixed(2)) || 'рейтинг отсутствует';
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }
  
  return res.json({ newComment, newRating });
});

// ////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  
  try {
    const newWay = await Way.create({ title: req.body.title, body: req.body.body },{returning: true,plain: true});
    return res.redirect(`/ways/${newWay.id}`);
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {}
    });
  }

  return res.redirect(`/ways/${newWay.id}`);
});
// ////////////////////////////////////////////////////////////
// router.get('/new', (req, res) => {
//   res.render('ways/new');
// });
// ////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  let way;
  let user;
  let comment;
  // let rating;
  // console.log(req.params.id)
  try {
    userlogIn = await User.findOne({where: {name: res.locals?.username}, raw: true})
    way = await Way.findOne({where:{id:req.params.id}, include: [{model: User, attribute: ['name']}], raw: true});
    comment = await Comment.findAll({where:{way_id: way.id}, include: [{model: User, attribute: ['name']}], raw: true});
    way.rating = (comment.reduce((acc, el) => acc += el.rating, 0) / comment.length).toFixed(2);
    // console.log(comment.length)
    way.nameUser = way['User.name']
    // comment.nameUser = comment['User.name']
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {}
    });
  }
  comment.forEach(el => el.nameUser = el['User.name'])
  if (userlogIn.id === way.user_id || userlogIn.role === 'admin') userlogIn.isGrantDel = true

  // console.log(comment)
  return res.render('infoRoad', { way, comment, userlogIn });
});
// ////////////////////////////////////////////////////////////
// router.put('/:id', async (req, res) => {
//   let way;

//   try {
//     way = await Way.update({ title: req.body.title, body: req.body.body },{where:{id:req.params.id}, returning: true, plain: true});
//   } catch (error) {
//     return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
//   }

//   return res.json({ isUpdateSuccessful: true, wayID: way[1].id });
// });
// ////////////////////////////////////////////////////////////
router.get('/delete/:id', async (req, res) => {
  let user;
  let way;
  // console.log('---------------------------------------2')
  try {
    user = await User.findOne({
      where: {name: res.locals?.username},
      include: [{
        model: UserInfo,
        attributes: ['bike'], // добавить role
      }],
      raw: true
    })
    way = await Way.findOne({where: {id: req.params.id}, raw: true});
    // console.log('---------------------------------------3')
    // console.log(user.id === way.user_id)
    if (user.id === way.user_id /*|| user['UserInfo.role'] === 'admin'*/) {
     await Way.destroy({where:{id : req.params.id}});
    //  console.log('---------------------------------------------------delete')
    } else {
      return res.json('Нет прав для удаления записи из базы данных.' );
    }
    
  } catch (error) {
    return res.json({ isDeleteSuccessful: false, errorMessage: 'Не удалось удалить запись из базы данных.' });
  }
  return res.redirect('/ways');
});
// ////////////////////////////////////////////////////////////
// router.get('/:id/edit', async (req, res) => {
//   const way = await Way.findOne({where:{id:req.params.id}});
//   res.render('ways/edit', { way });
// });


module.exports = router;

