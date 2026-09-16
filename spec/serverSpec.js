const request = require('supertest');
const app = require('../server');

describe('Tax Calculator API', () => {

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /calculate should return tax for valid income', async () => {
    const res = await request(app).post('/calculate').send({ income: 20000 });
    expect(res.status).toBe(200);
    expect(res.body.tax).toBe(1000);
  });

  it('POST /calculate should return 400 for invalid income', async () => {
    const res = await request(app).post('/calculate').send({ income: -50 });
    expect(res.status).toBe(400);
  });

});
