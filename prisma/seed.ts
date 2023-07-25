const { PrismaClient } = require('@prisma/client');
const { users } = require('./data');
const prisma = new PrismaClient();

const load = async () => {
  try {
    //user table

    // in case id is autoincremented integer
    // await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
    // console.log('reset product auto increment to 1');

    await prisma.user.deleteMany();
    console.log('Deleted records in user table');

    console.log('Adding user  data');

    await prisma.user.createMany({
      data: users,
    });

    console.log('Added user data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();

// TODO
//add     "seed":"node prisma/seed.ts"  inside scripts in package.json
// run   npm run seed
