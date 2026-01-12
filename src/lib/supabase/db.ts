import { supabase, hasSupabaseCredentials } from './client';

// Types
export type ContentType = 'essay' | 'blog' | 'whitepaper';

export interface Author {
    id: string;
    name: string;
    bio?: string;
    avatar_url?: string;
    role?: string;
    social_links?: Record<string, string>;
    created_at?: string;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    summary: string;
    category: string;
    content_type: ContentType;
    author_id?: string;
    author?: Author;
    published?: boolean;
    featured?: boolean;
    read_time?: number;
    seo_title?: string;
    seo_description?: string;
    keywords?: string[];
    image_url?: string;
    pdf_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

export type PostSummary = Omit<Post, 'content'>;

// --- Upload Helper ---
export async function uploadWhitePaperPDF(file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
        .from('whitepapers')
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading PDF:', error);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('whitepapers')
        .getPublicUrl(filePath);

    return publicUrl;
}

export interface ContactSubmission {
    id?: string;
    name: string;
    email: string;
    company?: string;
    stage?: string;
    message: string;
    priority?: number;
    status?: string;
    created_at?: string;
}

export interface NewsletterSubscriber {
    id?: string;
    email: string;
    confirmed?: boolean;
    token?: string;
    subscribed_at?: string;
}

// --- Post Functions ---

export async function getFeaturedPosts(limit = 3): Promise<PostSummary[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty featured posts');
        return [];
    }
    const { data, error } = await supabase
        .from('posts')
        .select(`
      id, title, slug, summary, category, content_type, published, featured, read_time, image_url, created_at, pdf_url,
      author:authors(id, name, avatar_url, role)
    `)
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured posts:', error);
        return [];
    }
    return (data || []).map((post: any) => ({
        ...post,
        author: post.author?.[0] || post.author
    })) as PostSummary[];
}

export async function getPublishedPosts(contentType?: ContentType): Promise<PostSummary[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty published posts');
        return [];
    }
    let query = supabase
        .from('posts')
        .select(`
      id, title, slug, summary, category, content_type, published, featured, read_time, image_url, created_at, pdf_url,
      author: authors(id, name, avatar_url, role)
    `)
        .eq('published', true);

    if (contentType) {
        query = query.eq('content_type', contentType);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching published posts:', error);
        return [];
    }
    return (data || []).map((post: any) => ({
        ...post,
        author: post.author?.[0] || post.author
    })) as PostSummary[];
}

export async function getPostsByContentType(contentType: ContentType): Promise<PostSummary[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty posts by content type');
        return [];
    }
    const { data, error } = await supabase
        .from('posts')
        .select(`
      id, title, slug, summary, category, content_type, published, featured, read_time, image_url, created_at, pdf_url,
      author:authors(id, name, avatar_url, role)
    `)
        .eq('content_type', contentType)
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by content type:', error);
        return [];
    }
    return (data || []).map((post: any) => ({
        ...post,
        author: post.author?.[0] || post.author
    })) as PostSummary[];
}


export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning null for post by slug');
        return null;
    }
    console.log(`fetching post for slug: "${slug}"`);
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
        console.error(`Error fetching post by slug "${slug}":`, JSON.stringify(error, null, 2));
        return null;
    }
    if (!data) return null;
    const post = data as any;
    return {
        ...post,
        author: post.author?.[0] || post.author
    } as Post;
}

export async function getPostsByCategory(category: string): Promise<PostSummary[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty posts by category');
        return [];
    }
    const { data, error } = await supabase
        .from('posts')
        .select(`
      id, title, slug, summary, category, content_type, published, featured, read_time, image_url, created_at, pdf_url,
      author: authors(id, name, avatar_url, role)
    `)
        .eq('category', category)
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
    return (data || []).map((post: any) => ({
        ...post,
        author: post.author?.[0] || post.author
    })) as PostSummary[];
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        return null;
    }
    return data;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating post:', error);
        return null;
    }
    return data;
}

// --- Contact Functions ---

export async function createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<boolean> {
    const { error } = await supabase
        .from('contact_submissions')
        .insert(submission);

    if (error) {
        console.error('Error creating contact submission:', error);
        return false;
    }
    return true;
}

// --- Newsletter Functions ---

export async function subscribeToNewsletter(email: string): Promise<boolean> {
    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, confirmed: false });

    if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
            console.log('Email already subscribed');
            return true; // Consider it a success
        }
        console.error('Error subscribing to newsletter:', error);
        return false;
    }
    return true;
}

// --- Admin Functions ---

export async function getAllPosts(): Promise<PostSummary[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty posts');
        return [];
    }
    const { data, error } = await supabase
        .from('posts')
        .select(`
       id, title, slug, summary, category, content_type, published, featured, read_time, image_url, created_at, pdf_url,
            author: authors(id, name, avatar_url, role)
                `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all posts:', error);
        return [];
    }
    return (data || []).map((post: any) => ({
        ...post,
        author: post.author?.[0] || post.author
    })) as PostSummary[];
}

export async function deletePost(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        return false;
    }
    return true;
}

export async function togglePublished(id: string, published: boolean): Promise<boolean> {
    const { error } = await supabase
        .from('posts')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error('Error toggling published status:', error);
        return false;
    }
    return true;
}

export async function getPostById(id: string): Promise<Post | null> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning null for post by id');
        return null;
    }
    const { data, error } = await supabase
        .from('posts')
        .select(`
        *,
            author: authors(*)
            `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
    if (!data) return null;
    const post = data as any;
    return {
        ...post,
        author: post.author?.[0] || post.author
    } as Post;
}

// --- Author Functions ---

export async function getAllAuthors(): Promise<Author[]> {
    if (!hasSupabaseCredentials) {
        console.warn('Supabase credentials missing, returning empty authors');
        return [];
    }
    const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching authors:', error);
        return [];
    }
    return (data as Author[]) || [];
}

export async function createAuthor(author: Omit<Author, 'id' | 'created_at'>): Promise<Author | null> {
    const { data, error } = await supabase
        .from('authors')
        .insert(author)
        .select()
        .single();

    if (error) {
        console.error('Error creating author:', error);
        return null;
    }
    return data;
}

export async function updateAuthor(id: string, updates: Partial<Author>): Promise<Author | null> {
    const { data, error } = await supabase
        .from('authors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating author:', error);
        return null;
    }
    return data;
}

export async function deleteAuthor(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting author:', error);
        return false;
    }
    return true;
}
