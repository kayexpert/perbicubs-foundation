import { createClient } from '@/utils/supabase/server';
import TeamManager from '@/components/admin/TeamManager';

export default async function TeamAdminPage() {
  const supabase = await createClient();
  const { data: members } = await supabase.from('team_members').select('*').order('ordering');
  return <TeamManager initialMembers={members ?? []} />;
}
