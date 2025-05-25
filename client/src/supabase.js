import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zstawbfogbjcznzquahw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdGF3YmZvZ2JqY3puenF1YWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNzQzODcsImV4cCI6MjA2MTk1MDM4N30.5ImTEzhquMvnN05BPJGd4DGfz_oL-Y2QFiuf2fqKBpo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

