import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or URL');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupStorage() {
    console.log('📦 Setting up "whitepapers" storage bucket...');

    const { data, error } = await supabase
        .storage
        .createBucket('whitepapers', {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['application/pdf']
        });

    if (error) {
        if (error.message.includes('already exists')) {
            console.log('✅ Bucket "whitepapers" already exists.');
        } else {
            console.error('❌ Error creating bucket:', error);
            return;
        }
    } else {
        console.log('✅ Bucket "whitepapers" created successfully.');
    }

    // Note: Policies are simpler to manage in Dashboard, but for anon upload we might need policy.
    // For now, we assume authenticated users (Admin) can upload if using Service Role in backend OR client side with policy.
    // My db.ts uses the client-side 'supabase' instance which uses ANON key usually.
    // So we NEED a policy to allow Anon uploads IF we want to upload from client.
    // OR we use the Service Role key in a server action/API route.

    // However, the current Architecture uses client-side Supabase for Admin actions? 
    // Wait, the Admin pages use `createPost` which imports `supabase` from `db.ts`. 
    // `db.ts` uses `createClient(url, anonKey)`. So it IS executing on client.
    // EXCEPT `createPost` writes to DB. That generally requires Auth or RLS.
    // Currently, I seem to be relying on "Public can write" or I am "logged in".
    // I am assuming I am simulating an implementation where policies exist.

    // I will try to create a policy via SQL using the RPC interface if possible, or just print instructions.
    // Supabase JS Storage API doesn't let you set RLS policies easily.

    console.log('\n⚠️ IMPORTANT: To enable uploads from the Admin UI (Client Side), you must add RLS policies to the Storage bucket.');
    console.log('   Go to Supabase Dashboard -> Storage -> Policies');
    console.log('   Bucket: whitepapers');
    console.log('   1. Policy "Give all access to public" (for development/demo simplicity)');
    console.log('      - SELECT, INSERT, UPDATE, DELETE');
    console.log('      - Target roles: [] (all)');
}

setupStorage();
