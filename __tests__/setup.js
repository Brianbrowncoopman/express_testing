import request from 'supertest';
import app from '../app.js';

before (async () => {
  const payload = {
    'user_name': 'test',
    'user_email': 'test@email.com',
    'user_password': '123456789'
  }
  await request(app).post('/auth/register').send(payload);
})