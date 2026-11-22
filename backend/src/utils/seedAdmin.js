import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'PRERA Administrator';

    if (
      !adminEmail ||
      adminEmail === 'admin@example.com' ||
      !adminPassword ||
      adminPassword === 'change-this-password'
    ) {
      throw new Error('Set a real ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env before seeding.');
    }

    console.log(`Checking for admin account: ${adminEmail}...`);

    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (existingAdmin) {
      await prisma.admin.update({
        where: { email: adminEmail },
        data: {
          name: adminName,
          password: hashedPassword,
        },
      });
      console.log(`Admin account '${adminEmail}' updated successfully.`);
    } else {
      await prisma.admin.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
        },
      });
      console.log(`Admin account '${adminEmail}' created successfully.`);
    }

    console.log('Admin credentials ready.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin account:', error);
    process.exit(1);
  }
};

seedAdmin();
