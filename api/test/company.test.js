import { describe, test, before, after } from 'node:test';
import assert from 'node:assert';

const API_COMPANY = 'http://localhost:3000/api/v1/companies';
const API_ADDRESS = 'http://localhost:3000/api/v1/addresses';

const BASE64 = btoa(
  `${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASSWORD}`
);

const ADDRESS = {
  street: 'TUXPAN',
  exteriorNumber: '45',
  neighborhood: 'VERACRUZ',
  city: 'XALAPA',
  state: 'VERACRUZ',
  country: 'MEXICO',
  postalCode: '91020',
};

const COMPANY = {
  rfc: 'BETS011110H8A',
  name: 'SILU',
  comercialSociety: 'S.A DE C.V',
  taxRegime: 'PERSONA MORAL',
  address: '',
};

let id = '';

describe('/api/v1/companies', { skip: false }, () => {
  describe('rainy:GET /api/v1/companies', () => {
    test('It should respond with 404 status code', async () => {
      const res = await fetch(API_COMPANY, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });
      assert.strictEqual(res.status, 404);
    });
  });

  describe('rainy:GET /api/v1/companies/:id', () => {
    test('It should respond with 404 status', async () => {
      const res = await fetch(API_COMPANY + '/65fc8452fb68445cb97e7c81', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });
      assert.strictEqual(res.status, 404);
    });
  });

  describe('sunny:POST /api/v1/companies', () => {
    before(async () => {
      const res = await fetch(API_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASE64}`,
        },
        body: JSON.stringify(ADDRESS),
      });
      const body = await res.json();
      COMPANY.address = body._id;
    });
    test('It should respond with 201 status code', async () => {
      const res = await fetch(API_COMPANY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASE64}`,
        },
        body: JSON.stringify(COMPANY),
      });
      const body = await res.json();
      id = body._id;
      assert.strictEqual(res.status, 201);
      assert(body instanceof Object);
    });
  });

  describe('sunny:GET /api/v1/companies', () => {
    test('It should respond with 200 status code and Array instance', async () => {
      const res = await fetch(API_COMPANY, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });

      const body = await res.json();
      assert.strictEqual(res.status, 200);
      assert(body instanceof Array);
      id = body[0]._id;
    });
  });

  describe('sunny:GET /api/v1/companies/:id', () => {
    test('It should respond with 200 status code and Object instance', async () => {
      const res = await fetch(API_COMPANY + `/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });

      const body = await res.json();
      assert.strictEqual(res.status, 200);
      assert(body instanceof Object);
    });
  });

  describe('rainy:PUT /api/v1/companies/:id', () => {
    test('It should respond with 404 status', async () => {
      const res = await fetch(API_COMPANY + '/65fc8452fb68445cb97e7c81', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASE64}`,
        },
        body: JSON.stringify(COMPANY),
      });
      assert.strictEqual(res.status, 404);
    });
  });

  describe('sunny:PUT /api/v1/companies', () => {
    test('It should respond with 200 status code and Object instance', async () => {
      const res = await fetch(API_COMPANY + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${BASE64}`,
        },
        body: JSON.stringify(COMPANY),
      });
      const body = await res.json();
      assert.strictEqual(res.status, 200);
      assert(body instanceof Object);
    });
  });

  describe('rainy:DELETE /api/v1/companies/:id', () => {
    test('It should respond with 404 status', async () => {
      const res = await fetch(API_COMPANY + '/65fc8452fb68445cb97e7c81', {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });
      assert.strictEqual(res.status, 404);
    });
  });

  describe('sunny:DELETE /api/v1/companies/:id', () => {
    after(async () => {
      await fetch(API_ADDRESS + `/${COMPANY.address}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });
    });
    test('It should respond with 204 status code', async () => {
      const res = await fetch(API_COMPANY + `/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${BASE64}`,
        },
      });
      assert.strictEqual(res.status, 204);
    });
  });
});
