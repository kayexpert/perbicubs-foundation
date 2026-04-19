'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// ─── Storage helpers ──────────────────────────────────────────
const BUCKET = 'content-images';

/** Extract the storage path from a Supabase public URL.
 *  Returns null if the URL is not from our managed bucket
 *  (e.g. it's a /public folder path or an external URL). */
function extractPath(publicUrl: string | undefined | null): string | null {
  if (!publicUrl) return null;
  const marker = `/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(publicUrl.slice(idx + marker.length));
}

/** Delete a file from Supabase Storage. Non-fatal if it fails. */
async function deleteStorageFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  publicUrl: string | undefined | null,
) {
  const path = extractPath(publicUrl);
  if (!path) return; // not a managed file — skip
  try {
    await supabase.storage.from(BUCKET).remove([path]);
  } catch {
    // non-fatal: file may already be gone
  }
}

/** Strip DB-managed fields before sending to update/insert */
function cleanData(data: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, ...rest } = data;
  return rest;
}

// ─────────────────────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────────────────────

export async function upsertHeroSlide(data: Record<string, unknown>, id?: number) {
  const supabase = await createClient();

  if (id) {
    // If image changed, clean up old storage file first
    const { data: existing } = await supabase
      .from('hero_slides')
      .select('image')
      .eq('id', id)
      .single();

    if (existing?.image && existing.image !== data.image) {
      await deleteStorageFile(supabase, existing.image as string);
    }

    const { data: updated, error } = await supabase
      .from('hero_slides')
      .update(cleanData(data))
      .eq('id', id)
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/hero');
    return { error: error?.message, record: updated };
  } else {
    const { data: inserted, error } = await supabase
      .from('hero_slides')
      .insert(cleanData(data))
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/hero');
    return { error: error?.message, record: inserted };
  }
}

export async function deleteHeroSlide(id: number) {
  const supabase = await createClient();

  // Fetch image URL before deleting so we can clean up storage
  const { data: existing } = await supabase
    .from('hero_slides')
    .select('image')
    .eq('id', id)
    .single();

  if (existing?.image) {
    await deleteStorageFile(supabase, existing.image as string);
  }

  const { error } = await supabase.from('hero_slides').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/hero');
  return { error: error?.message };
}

// ─────────────────────────────────────────────────────────────
// IMPACT STATS
// ─────────────────────────────────────────────────────────────

export async function upsertImpactStat(data: Record<string, unknown>, id?: number) {
  const supabase = await createClient();

  if (id) {
    const { data: updated, error } = await supabase
      .from('impact_stats')
      .update(cleanData(data))
      .eq('id', id)
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/impact');
    return { error: error?.message, record: updated };
  } else {
    const { data: inserted, error } = await supabase
      .from('impact_stats')
      .insert(cleanData(data))
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/impact');
    return { error: error?.message, record: inserted };
  }
}

export async function deleteImpactStat(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from('impact_stats').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/impact');
  return { error: error?.message };
}

// ─────────────────────────────────────────────────────────────
// GALLERY IMAGES
// ─────────────────────────────────────────────────────────────

export async function upsertGalleryImage(data: Record<string, unknown>, id?: number) {
  const supabase = await createClient();

  if (id) {
    // If image (src) changed, delete old storage file
    const { data: existing } = await supabase
      .from('gallery_images')
      .select('src')
      .eq('id', id)
      .single();

    if (existing?.src && existing.src !== data.src) {
      await deleteStorageFile(supabase, existing.src as string);
    }

    const { data: updated, error } = await supabase
      .from('gallery_images')
      .update(cleanData(data))
      .eq('id', id)
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { error: error?.message, record: updated };
  } else {
    const { data: inserted, error } = await supabase
      .from('gallery_images')
      .insert(cleanData(data))
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { error: error?.message, record: inserted };
  }
}

export async function deleteGalleryImage(id: number) {
  const supabase = await createClient();

  // Fetch src before deleting
  const { data: existing } = await supabase
    .from('gallery_images')
    .select('src')
    .eq('id', id)
    .single();

  if (existing?.src) {
    await deleteStorageFile(supabase, existing.src as string);
  }

  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/gallery');
  return { error: error?.message };
}

// ─────────────────────────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────────────────────────

export async function upsertBlogPost(data: Record<string, unknown>, id?: number) {
  const supabase = await createClient();

  if (id) {
    // If cover image changed, delete old storage file
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('image')
      .eq('id', id)
      .single();

    if (existing?.image && existing.image !== data.image) {
      await deleteStorageFile(supabase, existing.image as string);
    }

    const { data: updated, error } = await supabase
      .from('blog_posts')
      .update(cleanData(data))
      .eq('id', id)
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { error: error?.message, record: updated };
  } else {
    const { data: inserted, error } = await supabase
      .from('blog_posts')
      .insert(cleanData(data))
      .select()
      .single();

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { error: error?.message, record: inserted };
  }
}

export async function deleteBlogPost(id: number) {
  const supabase = await createClient();

  // Fetch image before deleting
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('image')
    .eq('id', id)
    .single();

  if (existing?.image) {
    await deleteStorageFile(supabase, existing.image as string);
  }

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { error: error?.message };
}

// ─────────────────────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────────────────────

export async function upsertTeamMember(data: Record<string, unknown>, id?: number) {
  const supabase = await createClient();

  if (id) {
    const { data: existing } = await supabase
      .from('team_members')
      .select('image')
      .eq('id', id)
      .single();

    if (existing?.image && existing.image !== data.image) {
      await deleteStorageFile(supabase, existing.image as string);
    }

    const { data: updated, error } = await supabase
      .from('team_members')
      .update(cleanData(data))
      .eq('id', id)
      .select()
      .single();

    revalidatePath('/about');
    revalidatePath('/our-solution');
    revalidatePath('/admin/team');
    return { error: error?.message, record: updated };
  } else {
    const { data: inserted, error } = await supabase
      .from('team_members')
      .insert(cleanData(data))
      .select()
      .single();

    revalidatePath('/about');
    revalidatePath('/our-solution');
    revalidatePath('/admin/team');
    return { error: error?.message, record: inserted };
  }
}

export async function deleteTeamMember(id: number) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from('team_members')
    .select('image')
    .eq('id', id)
    .single();

  if (existing?.image) {
    await deleteStorageFile(supabase, existing.image as string);
  }

  const { error } = await supabase.from('team_members').delete().eq('id', id);
  revalidatePath('/about');
  revalidatePath('/our-solution');
  revalidatePath('/admin/team');
  return { error: error?.message };
}
