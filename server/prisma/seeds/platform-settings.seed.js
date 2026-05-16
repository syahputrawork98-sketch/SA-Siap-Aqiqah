async function seedPlatformSettings(prisma) {
  console.log('  - Seeding Platform Settings...');
  const settings = [
    { key: 'dp_pct', value: '50' },
    { key: 'platform_fee_pct', value: '10' },
  ];

  for (const s of settings) {
    await prisma.platformSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
}

module.exports = { seedPlatformSettings };
