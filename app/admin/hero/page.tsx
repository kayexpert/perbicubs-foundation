import { createClient } from '@/utils/supabase/server';
import HeroManager from '@/components/admin/HeroManager';

export default async function HeroAdminPage() {
  const supabase = await createClient();
  const { data: slides } = await supabase.from('hero_slides').select('*').order('ordering');
  return <HeroManager initialSlides={slides ?? []} />;
}
