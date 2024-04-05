import { describe, test } from 'node:test';
import assert from 'node:assert';

const API = 'http://localhost:3000/api/v1';

describe('sunny:GET /api/v1', () => {
  test('It should respond with 200 status code', { skip: false }, async () => {
    const res = await fetch(API, {
      method: 'GET',
    });
    assert.strictEqual(res.status, 200);
  });
});
