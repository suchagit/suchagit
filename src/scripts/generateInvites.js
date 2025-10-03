import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import fs from 'fs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role key required for inserts
const supabase = createClient(supabaseUrl, supabaseKey);

// Example list of invitees
const invitees = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
];

async function generateInvites() {
  for (const guest of invitees) {
    const token = crypto.randomBytes(8).toString('hex');
    const { error } = await supabase
      .from('invites')
      .insert([{ name: guest.name, email: guest.email, token }]);
    if (error) console.error(error);
    else console.log(`Created invite for ${guest.name} with token ${token}`);
  }
}

generateInvites();
