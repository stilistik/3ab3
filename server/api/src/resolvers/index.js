const query = require('./query');
const mutation = require('./mutation');
const user = require('./user');
const post = require('./post');

module.exports = {
  Query: query,
  Mutation: mutation,
  User: user,
  Post: post,
};
