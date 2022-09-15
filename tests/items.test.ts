import { faker } from '@faker-js/faker';
import app from '../src/app';
import supertest from 'supertest';
import { prisma } from '../src/database';
import { createItem } from './factories/itemFactory';


const agent = supertest(app);

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items;`;
});


describe('Testa POST /items ', () => {
  const item = {
    title: faker.lorem.sentence(1),
    url: faker.internet.url(),
    description: faker.lorem.sentence(5),
    amount: Number(faker.finance.amount(0,1000000,0))
  };
  it("Deve retornar 201, se cadastrado um item no formato correto", async () => {
    const response = await agent.post("/items").send(item);
    expect(response.status).toBe(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const response = await agent.post("/items").send(item);
    expect(response.status).toBe(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {
    const response = await agent.get("/items");
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('Testa GET /items/:id ', () => {
  it.todo('Deve retornar status 200 e um objeto igual a o item cadastrado');
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});
