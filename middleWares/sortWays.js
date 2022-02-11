require('dotenv').config();
const {Way, User, Comment} = require('../db/models/');

exports.sortWays = async (id) => {
// const sortWays = async (id) => {
  // console.log(2134353465346)
  switch (id) {
    case 1: // по рейтингу
      return ways1 = await Way.findAll({order:[['id', 'ASC']], raw:true});
    case 2: // по дате
      return ways1 = await Way.findAll({order:[['createdAt', 'DESC']], raw:true});
    case 3: // по длинне
      return ways1 = await Way.findAll({order:[['distance', 'ASC']], raw:true});
    default: 
      return ways1 = await Way.findAll({order:[['id', 'ASC']], raw:true});
  }
};

exports.sortRating = (ways) => {
  // const sortWays = async (id) => {
    // console.log('sort')
    return ways.sort((a, b) => b.rating - a.rating)
  };
exports.sortDistance = (ways) => {
    // ways.forEach(element => {
    //   console.log('---------------------', parseInt(element.distance, 10))
    // });
      return ways.sort((a, b) => parseInt(b.distance) - parseInt(a.distance))
    };



// module.exports = sortWays

