import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from 'cloudflare:workers'

let _supabase: SupabaseClient | null = null

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  }
  return _supabase
}
