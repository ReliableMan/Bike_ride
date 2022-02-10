require('dotenv').config();
const {Way, User} = require('./db/models/');

async function qwer() {
  const way = Way.create({title: '3 Magis Kohlrabi Welsh Onion', body: 'Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.', user_id: 1})
}

// qwer()
