const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

let id = '5ae0aa9b5a1c9f1832f2eeb6';

User.findById(id).then((user) => {
  if (!user) {
    return console.log('ID not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch( (e) => console.log(e) );
