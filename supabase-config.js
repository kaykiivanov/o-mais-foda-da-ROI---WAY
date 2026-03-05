// Supabase Configuration
const SUPABASE_URL = "https://agyseuhihxuirsnhzqyv.supabase.co";
const SUPABASE_Key = "sb_publishable_XwwCItETJ85WeYJv2vegiQ_6DWYV8fy";

// Overwrite the global 'supabase' library object with the initialized client instance
// This allows 'supabase.from()' to work as expected across the entire application
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_Key);
