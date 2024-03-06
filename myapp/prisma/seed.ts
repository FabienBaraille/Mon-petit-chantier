import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  try {
    for (let i = 0; i < 20; i++) {
      await prisma.item.create({
        data: {
          name: faker.commerce.product(),
          unit: faker.science.unit().symbol,
          description: faker.commerce.productDescription(),
          rank: faker.helpers.arrayElement(["CATEGORY", "PRODUCT", "BY_PRODUCT"]),
          order: faker.number.int({min: 0, max: 10})
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });