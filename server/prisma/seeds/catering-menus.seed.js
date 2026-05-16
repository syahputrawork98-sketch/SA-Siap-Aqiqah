async function seedCateringMenus(prisma) {
  console.log('  - Seeding Catering Menus...');
  
  const cateringAccount = await prisma.user.findUnique({ where: { email: 'catering@siqah.dev' } });
  if (!cateringAccount) return;

  const partner = await prisma.partnerProfile.findUnique({ where: { userId: cateringAccount.id } });
  if (!partner) return;

  const menuData = {
    partnerId: partner.id,
    menuName: 'Paket Olahan Sate & Gule',
    description: 'Daging diolah menjadi sate maranggi dan gule kambing kental.',
    pricePerPorsi: 35000,
  };

  const existing = await prisma.cateringMenu.findFirst({
    where: {
      partnerId: partner.id,
      menuName: menuData.menuName
    }
  });

  if (!existing) {
    await prisma.cateringMenu.create({
      data: menuData,
    });
  } else {
    await prisma.cateringMenu.update({
      where: { id: existing.id },
      data: menuData
    });
  }
}

module.exports = { seedCateringMenus };
