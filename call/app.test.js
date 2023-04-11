
const request = require('supertest');
const app = require('./sever.js');
const jwt = require('jsonwebtoken');
const key = 'kittiphum';

test('Get token test!', async () => {
  const res = await request(app).get('/token/arm').expect(200);
  const keys = jwt.verify(res.text, key)

  expect(keys.admin).toBe('arm');
});