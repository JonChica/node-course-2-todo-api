const { Todo } = require('./../../models/todo');
const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'jon@jon.com',
  password: 'mypassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, '123123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'control@control.com',
  password: 'fakepassword'
}];

const todos = [{
  _id: new ObjectID,
  text: 'First todo test'
}, {
  _id: new ObjectID,
  text: 'Second todo test',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then( () => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then( () => done() );
};
module.exports = { todos, populateTodos, users, populateUsers };
