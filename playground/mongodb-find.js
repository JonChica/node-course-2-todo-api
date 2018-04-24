// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // db.collection('Todos').find({_id: new ObjectID('5adf0cd82637db741679a764')}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2) );
  // }, (err) => {
  //   console.log('Unable to fetch Todo list', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todo list', err);
  // });

  db.collection('Users').find({name: 'Jon'}).count().then((count) => {
    console.log(`Users name Jon count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch Users list', err);
  });
  // db.close();
});