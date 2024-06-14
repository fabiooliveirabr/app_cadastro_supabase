import { createClient } from "@supabase/supabase-js";
const link = "https://huyliupgqxcxbkchefap.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1eWxpdXBncXhjeGJrY2hlZmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNjQ2MDEsImV4cCI6MjAzMzY0MDYwMX0.2gVHyM5zmxKn-KWPKIbLeLnEtzrB-Xr1GxmqJWg3NoI"
export const supabase = createClient(link, chave);
