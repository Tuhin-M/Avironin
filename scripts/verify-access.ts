import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables for verification!');
    process.exit(1);
}

// Emulate frontend client (using ANON key)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyAccess() {
    console.log('🔍 Verifying public access to posts...');

    // 1. Get a slug first
    const { data: listData, error: listError } = await supabase
        .from('posts')
        .select('slug')
        .eq('published', true)
        .limit(1)
        .single();

    if (listError || !listData) {
        console.error('❌ Could not fetch list of posts:', listError);
        return;
    }

    const slug = listData.slug;
    console.log(`✓ Found slug: "${slug}"`);

    // 2. Try getPostBySlug logic
    console.log(`\n🔍 Testing getPostBySlug("${slug}")...`);
    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      author:authors(*)
    `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.error('❌ getPostBySlug FAILED:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ getPostBySlug SUCCESS!');
        console.log('   Title:', data.title);
        const authorName = data.author && !Array.isArray(data.author) ? data.author.name : 'Unknown';
        console.log('   Author:', authorName);
    }

    // 3. Check authors table
    const { count: authorCount } = await supabase
        .from('authors')
        .select('*', { count: 'exact', head: true });
    console.log(`\n🔍 Start check: ${authorCount} authors in database.`);
}

verifyAccess();
