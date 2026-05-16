async function seedPartnerProfiles(prisma) {
  console.log('  - Seeding Partner Profiles...');
  
  const partners = [
    {
      email: 'kandang@siqah.dev',
      type: 'MITRA_KANDANG',
      businessName: 'Berkah Ternak Siqah',
      ownerName: 'Haji Kandang',
      phone: '081200001111',
      address: 'Kawasan Ternak Bogor',
    },
    {
      email: 'catering@siqah.dev',
      type: 'MITRA_CATERING',
      businessName: 'Dapur Aqiqah Siqah',
      ownerName: 'Ibu Catering',
      phone: '081222223333',
      address: 'Depok Jaya No. 45',
    },
    {
      email: 'kurir@siqah.dev',
      type: 'MITRA_KURIR',
      businessName: 'Siqah Express',
      ownerName: 'Bang Kurir',
      phone: '081244445555',
      address: 'Pool Kurir Jakarta Selatan',
    },
  ];

  for (const p of partners) {
    const userAccount = await prisma.user.findUnique({ where: { email: p.email } });
    if (!userAccount) continue;

    await prisma.partnerProfile.upsert({
      where: { userId: userAccount.id },
      update: {
        type: p.type,
        businessName: p.businessName,
        ownerName: p.ownerName,
        phone: p.phone,
        address: p.address,
        isVerified: true,
      },
      create: {
        userId: userAccount.id,
        type: p.type,
        businessName: p.businessName,
        ownerName: p.ownerName,
        phone: p.phone,
        address: p.address,
        isVerified: true,
      },
    });
  }
}

module.exports = { seedPartnerProfiles };
