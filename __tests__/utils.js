import request from 'supertest';
import app from '../app.js';

async function getToken() {
  const payload = {
    'user_name': 'test',
    'user_email': 'test@test.com',
    'user_password': '123456789'
  }
  const { body } = await request(app).post('/auth/login').send(payload);
  return body.accessToken;
}

export default getToken;