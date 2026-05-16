async function seedConsumerProfiles(prisma) {
  console.log('  - Seeding Consumer Profiles...');
  const userAccount = await prisma.user.findUnique({ where: { email: 'user@siqah.dev' } });
  
  if (!userAccount) {
    throw new Error('User user@siqah.dev not found. Run users.seed.js first.');
  }

  await prisma.consumerProfile.upsert({
    where: { userId: userAccount.id },
    update: {},
    create: {
      userId: userAccount.id,
      fullName: 'Ahmad Konsumen',
      phone: '081234567890',
      addressDefault: 'Jl. Raya Siqah No. 1, Jakarta',
    },
  });
}

module.exports = { seedConsumerProfiles };
