import { createClient } from '@/utils/supabase/server';
import ImpactManager from '@/components/admin/ImpactManager';

export default async function ImpactAdminPage() {
  const supabase = await createClient();
  const { data: stats } = await supabase.from('impact_stats').select('*').order('ordering');
  return <ImpactManager initialStats={stats ?? []} />;
}
