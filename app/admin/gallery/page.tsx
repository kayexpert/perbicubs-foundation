import { createClient } from '@/utils/supabase/server';
import GalleryManager from '@/components/admin/GalleryManager';

export default async function GalleryAdminPage() {
  const supabase = await createClient();
  const { data: images } = await supabase.from('gallery_images').select('*').order('ordering');
  return <GalleryManager initialImages={images ?? []} />;
}
