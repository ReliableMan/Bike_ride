const router = require('express').Router();
const {Way, User, Comment} = require('../db/models/');

router.get('/', async (req, res) => {
  let ways;
  let user
  try {
    console.log(res.locals?.username)
    user = await User.findOne({where: {name: res.locals?.username}, raw: true})
    ways = await Way.findAll({order:[['id', 'DESC']]});
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }
  console.log(user)
  return res.render('index', { ways, user });
});


router.get('/sort/:id', async (req, res) => {
  let ways;
  let user
  console.log(req.params.id)
  try {
    console.log(res.locals?.username)
    user = await User.findOne({where: {name: res.locals?.username}, raw: true})

    if(req.params.id == 1) ways = await Way.findAll({order:[['id', 'ASC']], raw:true});
    if(req.params.id == 2) ways = await Way.findAll({order:[['createdAt', 'DESC']], raw:true});
    if(req.params.id == 3) ways = await Way.findAll({order:[['createdAt', 'ASC']], raw:true});
    else ways = await Way.findAll({order:[['id', 'DESC']], raw:true});
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }
  console.log(ways)
  return res.json({ ways });
});

router.post('/comment', async (req, res) => {
  let newComment;
  let user;
  // console.log('fsdgdfgfhfjhfdjh0')
  try {
    user = await User.findOne({where: {name: res.locals?.username}, raw: true})
    // console.log(req.body.text, req.body.rating, req.body.way_id, user.id)
    newComment = await Comment.create({ text: req.body.text, rating: req.body.rating, user_id: user.id, way_id: req.body.way_id});
    // console.log('fsdgdfgfhfjhfdjh2')
    // console.log(newComment)
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }
  
  return res.json({ newComment });
});


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

router.get('/new', (req, res) => {
  res.render('ways/new');
});

router.get('/:id', async (req, res) => {
  let way;
  // console.log(req.params.id)
  try {
    way = await Way.findOne({where:{id:req.params.id}});
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {}
    });
  }

  return res.render('infoRoad', { way });
});

router.put('/:id', async (req, res) => {
  let way;

  try {
    way = await Way.update({ title: req.body.title, body: req.body.body },{where:{id:req.params.id}, returning: true, plain: true});
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }

  return res.json({ isUpdateSuccessful: true, wayID: way[1].id });
});

router.delete('/:id', async (req, res) => {
  try {
    await Way.destroy({where:{id:req.params.id}});
  } catch (error) {
    return res.json({ isDeleteSuccessful: false, errorMessage: 'Не удалось удалить запись из базы данных.' });
  }

  return res.json({ isDeleteSuccessful: true });
});

router.get('/:id/edit', async (req, res) => {
  const way = await Way.findOne({where:{id:req.params.id}});
  res.render('ways/edit', { way });
});


module.exports = router;

