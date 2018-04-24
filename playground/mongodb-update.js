const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  db.collection('Users').findOneAndUpdate(
    {
      name: 'Jon'
    }, 
    {
      $inc: {age: 1}
    }, 
    {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // db.close();
});