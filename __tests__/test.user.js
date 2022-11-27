import request from 'supertest';
import chai from 'chai';
import app from '../app.js';
import getToken from './utils.js';
import User from '../models/user.js';
import { before } from 'mocha';

const { expect } = chai;


describe('Test the users endpoints', () => {
  let token;
  let user1;
  let user2;

  before( async () => {
    token = await getToken();
    user1 = await User.create({
      'user_name': 'test',
      'user_email': 'test@test.com',
      'user_password': '123456'
    })
    user2 = await User.create({
      'user_name': 'testt',
      'user_email': 'testt@test.com',
      'user_password': '123456789'
    })
  })

  xit('should retrieve all the users', async () => {
    const { body, status } = await request(app)
      .get('/users') // peticion a user 
      .set('Authorization', `Bearer ${token}`); // sin esto no corre el test pq estan todas auth
    expect(status).to.equal(404); 
    expect(body).to.be.a('array');
    expect(body.length).to.equal(2); //igual a 2 pq son dos user
  });

  xit('get /users should retrieve unauthorized for unloged users', async () => {
    const { status } = await request(app)
      .get('/users')
    expect(status).to.equal(403); 
  }); //Si nos saltamos el AUTH nos tira el 403 porque no tiene token

  xit('should retrieve a users by id', async () => {
    const { body, status } = await request(app)
      .get(`/users/${user2.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(status).to.equal(200);
    expect(body).to.be.a('object');
    expect(body.id).to.equal(user2.id);
    expect(body.name).to.equal(user2.name);
  });

  xit('get /users/id should retrieve unauthorized for unloged users', async () => {
    const { status } = await request(app)
      .get(`/users/${user1.id}`);
    expect(status).to.equal(403);
  });

  xit('put /user/id should allow to update the object', async () => {
    const payload = { 
      name: 'uma',
    }
    const { body, status } = await request(app)
      .put(`/users/${user1.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(status).to.equal(200);
    expect(body).to.be.a('object');
    
    // retrieve the object from the database
    const user = await User.findByPk(user1.id);
    expect(user.name).to.equal(payload.name);
  });

  xit('delete /users/id should allow to delete an object', async () => {
    const userToDelete = await User.create({
      user_name: 'name to delete',
    });
    const { body, status } = await request(app)
      .delete(`/users/${userToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(status).to.equal(200);
    expect(body).to.be.a('object');
    
    // retrieve the object from the database
    const user = await User.findByPk(userToDelete.id);
    expect(user).to.equal(null);
  });
});
