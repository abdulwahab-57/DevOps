const { prisma } = require('../PrismaClient');

async function main() {
  // Create dummy users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'john.doe@example.com',
        name: 'John Doe',
      },
      {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
      },
      {
        email: 'susan.lee@example.com',
        name: 'Susan Lee',
      },
      {
        email: 'michael.jones@example.com',
        name: 'Michael Jones',
      },
      {
        email: 'emily.davis@example.com',
        name: 'Emily Davis',
      },
    ],
  });

  console.log('Dummy users added:', users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
