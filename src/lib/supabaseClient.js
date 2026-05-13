import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oicqcsaoebyjplxvwehg.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pY3Fjc2FvZWJ5anBseHZ3ZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDUzMTksImV4cCI6MjA5NDA4MTMxOX0.drEPK9igkGoaKhzIxnJp91tYMiTmUDPN0CZcJG3ACtU";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
