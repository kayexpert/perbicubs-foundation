import { createClient } from '@/utils/supabase/server';
import BlogManager from '@/components/admin/BlogManager';

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  return <BlogManager initialPosts={posts ?? []} />;
}
