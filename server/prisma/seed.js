const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed process...');

  // 1. Platform Settings
  console.log('Settings platform configuration...');
  await prisma.platformSetting.upsert({
    where: { key: 'dp_pct' },
    update: {},
    create: { key: 'dp_pct', value: '50' },
  });
  await prisma.platformSetting.upsert({
    where: { key: 'platform_fee_pct' },
    update: {},
    create: { key: 'platform_fee_pct', value: '10' },
  });

  // 2. Developer Personas (Users)
  console.log('Creating developer personas...');
  const roles = [
    { role: 'USER', email: 'user@siqah.dev' },
    { role: 'MITRA_KANDANG', email: 'kandang@siqah.dev' },
    { role: 'MITRA_CATERING', email: 'catering@siqah.dev' },
    { role: 'MITRA_KURIR', email: 'kurir@siqah.dev' },
    { role: 'ADMIN', email: 'admin@siqah.dev' },
    { role: 'SUPERADMIN', email: 'superadmin@siqah.dev' },
  ];

  for (const r of roles) {
    await prisma.user.upsert({
      where: { email: r.email },
      update: { role: r.role },
      create: {
        email: r.email,
        passwordHash: '$2b$10$placeholder', // Not used in dev persona switcher
        role: r.role,
      },
    });
  }

  // 3. Profiles & Partners
  console.log('Creating profiles and partners...');
  
  // Consumer Profile
  const userAccount = await prisma.user.findUnique({ where: { email: 'user@siqah.dev' } });
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

  // Mitra Kandang
  const kandangAccount = await prisma.user.findUnique({ where: { email: 'kandang@siqah.dev' } });
  const mitraKandang = await prisma.partnerProfile.upsert({
    where: { userId: kandangAccount.id },
    update: {},
    create: {
      userId: kandangAccount.id,
      type: 'MITRA_KANDANG',
      businessName: 'Berkah Ternak Siqah',
      ownerName: 'Haji Kandang',
      phone: '081200001111',
      address: 'Kawasan Ternak Bogor',
      isVerified: true,
    },
  });

  // Mitra Catering
  const cateringAccount = await prisma.user.findUnique({ where: { email: 'catering@siqah.dev' } });
  const mitraCatering = await prisma.partnerProfile.upsert({
    where: { userId: cateringAccount.id },
    update: {},
    create: {
      userId: cateringAccount.id,
      type: 'MITRA_CATERING',
      businessName: 'Dapur Aqiqah Siqah',
      ownerName: 'Ibu Catering',
      phone: '081222223333',
      address: 'Depok Jaya No. 45',
      isVerified: true,
    },
  });

  // Mitra Kurir
  const kurirAccount = await prisma.user.findUnique({ where: { email: 'kurir@siqah.dev' } });
  await prisma.partnerProfile.upsert({
    where: { userId: kurirAccount.id },
    update: {},
    create: {
      userId: kurirAccount.id,
      type: 'MITRA_KURIR',
      businessName: 'Siqah Express',
      ownerName: 'Bang Kurir',
      phone: '081244445555',
      address: 'Pool Kurir Jakarta Selatan',
      isVerified: true,
    },
  });

  // 4. Packages
  console.log('Creating packages...');
  await prisma.package.upsert({
    where: { slug: 'paket-hemat' },
    update: {},
    create: {
      name: 'Paket Aqiqah Hemat',
      slug: 'paket-hemat',
      description: 'Layanan aqiqah ekonomis dengan kualitas terjaga.',
      priceBase: 2500000,
      imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761262212/paket-hemat_ebt8wa.jpg',
    },
  });

  await prisma.package.upsert({
    where: { slug: 'paket-premium' },
    update: {},
    create: {
      name: 'Paket Aqiqah Premium',
      slug: 'paket-premium',
      description: 'Layanan aqiqah eksklusif dengan menu spesial.',
      priceBase: 4500000,
      imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761262212/paket-premium_y5pyhe.jpg',
    },
  });

  // 5. Animals (Mitra Kandang)
  console.log('Creating animals...');
  await prisma.animal.create({
    data: {
      partnerId: mitraKandang.id,
      type: 'Kambing',
      weight: '30-35kg',
      gender: 'Jantan',
      price: 2000000,
      status: 'AVAILABLE',
      imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761097701/goat-2_fpt7xt.jpg',
    },
  });

  // 6. Catering Menu (Mitra Catering)
  console.log('Creating catering menus...');
  await prisma.cateringMenu.create({
    data: {
      partnerId: mitraCatering.id,
      menuName: 'Paket Olahan Sate & Gule',
      description: 'Daging diolah menjadi sate maranggi dan gule kambing kental.',
      pricePerPorsi: 35000,
    },
  });

  console.log('✅ Seed process completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed process failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
