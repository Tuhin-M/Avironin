import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔒 Applying RLS policies...');

    try {
        // 1. Enable RLS on tables (idempotent if already enabled, but good to ensure)
        await prisma.$executeRawUnsafe(`ALTER TABLE posts ENABLE ROW LEVEL SECURITY;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE authors ENABLE ROW LEVEL SECURITY;`);

        // 2. Drop existing policies to avoid conflicts (optional, but safe)
        try {
            await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public read access for published posts" ON posts;`);
            await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public read access for authors" ON authors;`);
        } catch (e) {
            // Ignore if policies don't exist
        }

        // 3. Create Policies
        await prisma.$executeRawUnsafe(`
      CREATE POLICY "Public read access for published posts" 
      ON posts FOR SELECT 
      USING (published = true);
    `);
        console.log('✅ Policy created: Public read access for published posts');

        await prisma.$executeRawUnsafe(`
      CREATE POLICY "Public read access for authors" 
      ON authors FOR SELECT 
      TO public 
      USING (true);
    `);
        console.log('✅ Policy created: Public read access for authors');

    } catch (error) {
        console.error('❌ Error applying policies:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
