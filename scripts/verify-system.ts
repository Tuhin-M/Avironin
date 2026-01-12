import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or URL');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verifySystem() {
    console.log('🔍 Starting System Verification...\n');
    let errors = 0;

    // 1. Database Connection & Row Counts
    console.log('📊 Checking Database Tables...');
    const tables = ['posts', 'authors', 'contact_submissions', 'newsletter_subscribers'];

    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) {
            console.error(`   ❌ Error checking ${table}:`, error.message);
            errors++;
        } else {
            console.log(`   ✅ ${table}: ${count} rows accessible.`);
        }
    }

    // 2. Storage Buckets
    console.log('\n📦 Checking Storage Buckets...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    if (bucketError) {
        console.error('   ❌ Error listing buckets:', bucketError.message);
        errors++;
    } else {
        const expectedBuckets = ['whitepapers']; // images might be standard or not
        expectedBuckets.forEach(b => {
            const found = buckets.find(Bucket => Bucket.name === b);
            if (found) {
                console.log(`   ✅ Bucket found: "${b}"`);
            } else {
                console.error(`   ❌ Bucket MISSING: "${b}"`);
                errors++;
            }
        });
    }

    // 3. User Accounts (Admin)
    console.log('\n👤 Checking Auth...');
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
        console.error('   ❌ Error listing users:', authError.message);
        errors++;
    } else {
        const admin = users.find(u => u.email === 'admin@avironin.org');
        if (admin) {
            console.log(`   ✅ Admin user exists: ${admin.email} (Confirmed: ${admin.email_confirmed_at ? 'Yes' : 'No'})`);
        } else {
            console.error('   ❌ Admin user missing!');
            errors++;
        }
    }

    console.log('\n' + '='.repeat(30));
    if (errors === 0) {
        console.log('🎉 SYSTEM VERIFICATION PASSED');
    } else {
        console.log(`⚠️ SYSTEM VERIFICATION FAILED (${errors} errors)`);
        process.exit(1);
    }
}

verifySystem();
