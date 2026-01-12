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

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const ADMIN_EMAIL = 'admin@avironin.org';
const ADMIN_PASSWORD = 'Perseus_4908';

async function ensureAdmin() {
    console.log(`🔍 Checking for admin user: ${ADMIN_EMAIL}`);

    // List users (requires service role)
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('❌ Error listing users:', listError.message);
        return;
    }

    const adminUser = users.find(u => u.email === ADMIN_EMAIL);

    if (adminUser) {
        console.log('✅ Admin user exists.');

        // Update password to be sure
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            adminUser.id,
            { password: ADMIN_PASSWORD, email_confirm: true } // Ensure confirmed
        );

        if (updateError) {
            console.error('❌ Error updating admin password:', updateError.message);
        } else {
            console.log(`✅ Admin password reset to: ${ADMIN_PASSWORD}`);
            console.log('✅ Email confirmed.');
        }

    } else {
        console.log('⚠️ Admin user not found. Creating...');

        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true // Auto confirm
        });

        if (createError) {
            console.error('❌ Error creating admin:', createError.message);
        } else {
            console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
            console.log(`✅ Password: ${ADMIN_PASSWORD}`);
        }
    }
}

ensureAdmin();
