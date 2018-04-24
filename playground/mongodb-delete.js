const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // db.collection('Users').deleteMany({name: 'Jon'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete user(s)', err);
  // });

  db.collection('Users').findOneAndDelete({_id:new ObjectID('5ade1fe96a6bbd18b622102a')}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete user(s)', err);
  });

  // db.close();
});