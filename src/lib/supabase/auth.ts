import { supabase } from './client';

// Admin authentication functions

export interface AdminUser {
    id: string;
    email: string;
}

export async function signInWithEmail(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { user: null, error: error.message };
    }

    if (data.user) {
        return {
            user: {
                id: data.user.id,
                email: data.user.email || '',
            },
            error: null,
        };
    }

    return { user: null, error: 'Login failed' };
}

export async function signOut(): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
}

export async function getCurrentUser(): Promise<AdminUser | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        return {
            id: user.id,
            email: user.email || '',
        };
    }

    return null;
}

export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AdminUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            callback({
                id: session.user.id,
                email: session.user.email || '',
            });
        } else {
            callback(null);
        }
    });
}
