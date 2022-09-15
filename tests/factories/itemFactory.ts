import { faker } from '@faker-js/faker';

export async function createItem () {
    const item = {
      title: faker.lorem.sentence(1),
      url: faker.internet.url(),
      description: faker.lorem.sentence(5),
      amount: Number(faker.finance.amount(0,1000000,0))
    };
  
    return item;
  } 