const router = require('express').Router();
const {Way, User} = require('../db/models/');

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

  try {
    way = await Way.findOne({where:{id:req.params.id}});
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {}
    });
  }

  return res.render('ways/show', { way });
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

