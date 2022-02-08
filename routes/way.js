const router = require('express').Router();
const {} = require('../db/models/');

router.get('/', async (req, res) => {
  let ways;

  try {
    ways = await Entry.findAll({order:[['id', 'DESC']]});
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }

  return res.render('ways/index', { ways });
});

router.post('/', async (req, res) => {
  
  try {
    const newWay = await .create({ title: req.body.title, body: req.body.body },{returning: true,plain: true});
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
    way = await .findOne({where:{id:req.params.id}});
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
    way = await .update({ title: req.body.title, body: req.body.body },{where:{id:req.params.id}, returning: true, plain: true});
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }

  return res.json({ isUpdateSuccessful: true, wayID: way[1].id });
});

router.delete('/:id', async (req, res) => {
  try {
    await .destroy({where:{id:req.params.id}});
  } catch (error) {
    return res.json({ isDeleteSuccessful: false, errorMessage: 'Не удалось удалить запись из базы данных.' });
  }

  return res.json({ isDeleteSuccessful: true });
});

router.get('/:id/edit', async (req, res) => {
  let way = await .findOne({where:{id:req.params.id}});
  res.render('ways/edit', { way });
});


module.exports = router;

