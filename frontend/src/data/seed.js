import { PrismaClient, Domain, Roles } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomUserName = () => `User${getRandomInt(1, 1000)}`;
const randomGender = () => (Math.random() < 0.5 ? 'Male' : 'Female');

async function seed() {
  // Create dummy Domains
  await Promise.all(
    Object.values(Domain).map(async (domain) => {
      return prisma.domains.create({
        data: {
          domainName: domain,
          domainDescription: `${domain} training description.`,
        },
      });
    })
  );

  // Create dummy Training
  const trainingData = [];
  for (let i = 1; i <= 50; i++) {
    trainingData.push({
      trainingName: `Training ${i}`,
      description: `Description for training ${i}`,
      domainName: Object.values(Domain)[getRandomInt(0, Object.values(Domain).length)],
      duration: getRandomInt(1, 10), // Duration in hours
      startDate: new Date(Date.now() + getRandomInt(1, 365) * 24 * 60 * 60 * 1000), // Random future date
    });
  }
  await prisma.training.createMany({ data: trainingData });

  // Create dummy Users with hashed passwords
  const users = [];
  for (let i = 1; i <= 100; i++) {
    const password = `Password${i}`; // Simple password for testing
    console.log(password,`user${i}@example.com`)
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    users.push({
      userName: randomUserName(),
      email: `user${i}@example.com`,
      role: Math.random() < 0.2 ? Roles.Admin : Roles.Employee, // 20% Admin, 80% Employee
      designation: `Designation ${getRandomInt(1, 10)}`,
      gender: randomGender(),
      password: hashedPassword, // Use the hashed password here
    });
  }
  await prisma.user.createMany({ data: users });

  // Create dummy Responses
  const responses = [];
  const userIds = await prisma.user.findMany({ select: { userId: true } });
  const trainingIds = await prisma.training.findMany({ select: { trainingId: true } });

  for (let i = 0; i < 500; i++) {
    responses.push({
      userId: userIds[getRandomInt(0, userIds.length)].userId,
      trainingId: trainingIds[getRandomInt(0, trainingIds.length)].trainingId,
      score: getRandomInt(1, 100), // Score between 1 and 100
      responseDate: new Date(),
    });
  }
  await prisma.response.createMany({ data: responses });

  // Create dummy Retention records
  const retentionData = [];
  for (const user of userIds) {
    for (const training of trainingIds) {
      retentionData.push({
        trainingId: training.trainingId,
        userId: user.userId,
        isRetained: Math.random() < 0.8, // 80% chance of being retained
      });
    }
  }
  await prisma.retention.createMany({ data: retentionData });

  console.log('Dummy data seeded successfully!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
