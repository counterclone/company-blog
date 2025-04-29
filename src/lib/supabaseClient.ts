// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create and export the Supabase client
// We use the anon key here as we are only reading public data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);