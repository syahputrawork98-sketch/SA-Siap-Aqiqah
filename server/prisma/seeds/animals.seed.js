async function seedAnimals(prisma) {
  console.log('  - Seeding Animals...');
  
  const kandangAccount = await prisma.user.findUnique({ where: { email: 'kandang@siqah.dev' } });
  if (!kandangAccount) return;
  
  const partner = await prisma.partnerProfile.findUnique({ where: { userId: kandangAccount.id } });
  if (!partner) return;

  const animalData = {
    partnerId: partner.id,
    type: 'Kambing',
    weight: '30-35kg',
    gender: 'Jantan',
    price: 2000000,
    status: 'AVAILABLE',
    imageUrl: 'https://res.cloudinary.com/dcida9qys/image/upload/v1761097701/goat-2_fpt7xt.jpg',
  };

  // Find existing by type and partner to avoid duplicates (naive check)
  const existing = await prisma.animal.findFirst({
    where: {
      partnerId: partner.id,
      type: animalData.type,
      price: animalData.price
    }
  });

  if (!existing) {
    await prisma.animal.create({
      data: animalData,
    });
  } else {
    await prisma.animal.update({
      where: { id: existing.id },
      data: animalData
    });
  }
}

module.exports = { seedAnimals };
