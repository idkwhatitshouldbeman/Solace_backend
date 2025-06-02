import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This ensures the redirect URL uses the actual site URL instead of localhost
    redirectTo: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export the initialized Supabase client
export default supabase;
