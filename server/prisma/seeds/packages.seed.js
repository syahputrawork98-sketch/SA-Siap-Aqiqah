async function seedPackages(prisma) {
  console.log('  - Seeding Packages...');
  const packages = [
    {
      name: 'Paket Aqiqah Hemat',
      slug: 'paket-hemat',
      description: 'Layanan aqiqah ekonomis dengan kualitas terjaga.',
      priceBase: 2500000,
      imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761262212/paket-hemat_ebt8wa.jpg',
    },
    {
      name: 'Paket Aqiqah Premium',
      slug: 'paket-premium',
      description: 'Layanan aqiqah eksklusif dengan menu spesial.',
      priceBase: 4500000,
      imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761262212/paket-premium_y5pyhe.jpg',
    },
  ];

  for (const p of packages) {
    await prisma.package.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceBase: p.priceBase,
        imageUrl: p.imageUrl,
      },
      create: p,
    });
  }
}

module.exports = { seedPackages };
