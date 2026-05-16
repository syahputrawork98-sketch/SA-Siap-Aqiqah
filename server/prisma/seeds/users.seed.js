async function seedUsers(prisma) {
  console.log('  - Seeding Users...');
  const users = [
    { role: 'USER', email: 'user@siqah.dev' },
    { role: 'MITRA_KANDANG', email: 'kandang@siqah.dev' },
    { role: 'MITRA_CATERING', email: 'catering@siqah.dev' },
    { role: 'MITRA_KURIR', email: 'kurir@siqah.dev' },
    { role: 'ADMIN', email: 'admin@siqah.dev' },
    { role: 'SUPERADMIN', email: 'superadmin@siqah.dev' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role },
      create: {
        email: u.email,
        passwordHash: '$2b$10$placeholder',
        role: u.role,
      },
    });
  }
}

module.exports = { seedUsers };
