import request from "supertest";
import chai from 'chai';
import app from '../app.js';
import User from '../models/user.js'


const { expect } = chai;

describe('Test the auth endpoints', () => {

    it('should allow to create users', async () => {
        const payload = {
            'user_name': 'brian',
            'user_email': 'brian@gmail.com',
            'user_password': '123456789'
        }
        const { body, status } = await request(app).post('/auth/register').send(payload);
        expect(status).to.equal(201);
//check user id
        expect(body).to.have.property('user_id');
        const user_id = body.user_id;
        const user = await User.findByPk(user_id);
        expect(user.user_name).to.equal(payload.user_name);
    });

    it('should return 400 if payload is incomplete', async () => {
        const payload = {
            'user_name': 'brian',
            'user_password': '123456789'
        }
        const { status } = await request(app).post('/auth/register').send(payload);
        expect(status).to.equal(400);
    });

    it('should return 400 if password is shorter than 6 characters', async () => {
        const payload = {
            'user_name': 'brian',
            'user_email': 'brian@email.com',
            'user_password': '12345'
        }
        const { body, status } = await request(app).post('/auth/register').send(payload);
        expect(status).to.equal(400);
        expect(body.message).contains('password must be at least 6 characters');
    });

    it('should return 400 if email does not have an @ character', async () => {
        const payload = {
            'user_name': 'brian',
            'user_email': 'brian.gmail.com',
            'user_password': '123456789'
        }
        const { body, status } = await request(app).post('/auth/register').send(payload);
        expect(status).to.equal(400);
        expect(body.message).contains('email must contain @ character');
    });

    it('should allow to login', async () => {
        const payload = {
            
            'user_email': 'brian@gmail.com',
            'user_password': '123456'
        }
        const { body, status } = await request(app)
            .post('/auth/login')
            .type("json")
            .send(payload);
        expect(status).to.equal(401);
    });

    it("should fail if email is not incorrect", async () => {
        const payload = {
            'user_email': 'unexisted@Emai.com',
            'user_password': '123456'
        }
        const { body, status } = await request(app)
            .post('/auth/login')
            .type("json")
            .send(payload);
        expect(status).to.equal(404);
        expect(body.message).contains('No user found with email');
    });

    it("should fail if password is not incorrect", async () => {
        const payload = {
            'user_email': 'brian@gmail.com',
            'user_password': 'wrong password'
        }
        const { body, status } = await request(app)
            .post('/auth/login')
            .type("json")
            .send(payload);
        expect(status).to.equal(401);
        expect(body.message).contains('Invalid Password');
    });
});