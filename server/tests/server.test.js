const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID,
  text: 'First todo test'
}, {
  _id: new ObjectID,
  text: 'Second todo test',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then( () => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  })
});

describe('GET /todos', () => {
  it('should list all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect( (res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todo/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let id = new ObjectID;
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove todo:id', (done) => {
    let hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end( (err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById(hexID).then( (todo) => {
          expect(todo).toNotExist();
          done(); 
        }).catch((e) => done(e) );
      });
  });
  it('should return 404 if todo id not found', (done) => {
    let id = new ObjectID;
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done)
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    firstID = todos[0]._id.toHexString();
    firstText = 'Modified by Testing';
    request(app)
      .patch(`/todos/${firstID}`)
      .send({text: firstText, completed: true})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(firstText);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
      });

  it('should clear completedAt when completed is false', (done) => {
    secondID = todos[1]._id.toHexString();
    secondText = 'Testing false';
    request(app)
      .patch(`/todos/${secondID}`)
      .send({text: secondText, completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
  });
});