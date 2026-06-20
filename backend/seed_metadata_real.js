const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = 'https://aws-1-ap-southeast-2.pooler.supabase.com'; // This is actually the DB URL, but the client needs the REST API.
// Wait, the previous seed script used Postgres client or Supabase JS?
// Let me check the previous seed script.
