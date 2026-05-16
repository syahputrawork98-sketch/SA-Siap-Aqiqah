const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { seedPlatformSettings } = require('./seeds/platform-settings.seed');
const { seedUsers } = require('./seeds/users.seed');
const { seedConsumerProfiles } = require('./seeds/consumer-profiles.seed');
const { seedPartnerProfiles } = require('./seeds/partner-profiles.seed');
const { seedPackages } = require('./seeds/packages.seed');
const { seedAnimals } = require('./seeds/animals.seed');
const { seedCateringMenus } = require('./seeds/catering-menus.seed');

async function main() {
  console.log('🌱 Starting modular seed process...');

  try {
    // Sequence is important due to relations
    await seedPlatformSettings(prisma);
    await seedUsers(prisma);
    await seedConsumerProfiles(prisma);
    await seedPartnerProfiles(prisma);
    await seedPackages(prisma);
    await seedAnimals(prisma);
    await seedCateringMenus(prisma);

    console.log('✅ All seeds completed successfully.');
  } catch (error) {
    console.error('❌ Modular seed process failed:');
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
