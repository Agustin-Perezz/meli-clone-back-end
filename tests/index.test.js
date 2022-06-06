const app = require('../index'); 
const request = require('supertest');

describe('GET /', () => { 

  test('basic test base-endpoint', async () => { 
    const response = await request(app).get('/').send();
    expect( response.status ).toBe( 200 );
   })
  
});
