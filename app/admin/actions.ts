'use server';

/**
 * Admin CRUD server actions.
 *
 * ─── SECURITY NOTE ─────────────────────────────────────────────────────────
 * The Supabase RLS policies in `supabase/migrations/003_add_write_policies.sql`
 * currently allow the `anon` role to INSERT/UPDATE/DELETE on all content
 * tables. This is intentional for the single-editor admin (so the `createClient()`
 * returned by `@/utils/supabase/server` can mutate without service-role
 * credentials), but it means the public Supabase URL + anon key are enough to
 * write or delete every record. Mitigations:
 *
 *   1. The /admin UI is the only known writer; rows can be locked down later.
 *   2. The `proxy.ts` middleware blocks all non-admin users from the UI.
 *   3. Recommended hardening: add `SUPABASE_SERVICE_ROLE_KEY` to env, create
 *      a second `createAdminClient()` here, switch all writes to it, and
 *      restore the original restrictive RLS policies (see migration 001).
 *
 * If you change the RLS, every upsert/delete below continues to work
 * unchanged as long as it goes through the service-role client.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { createClient, createAdminClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// ─── Authentication helper ────────────────────────────────────
async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  
  if (!token || !process.env.ADMIN_SESSION_SECRET) {
    throw new Error('Unauthorized');
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
    await jwtVerify(token, secret);
  } catch {
    throw new Error('Unauthorized');
  }
}

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

// ─── Generic CRUD helper ──────────────────────────────────────

/** Fields that, when changed, require deleting the previous storage object. */
type StorageField = 'image' | 'src';

interface ResourceConfig {
  /** Table name */
  table: 'hero_slides' | 'impact_stats' | 'gallery_images' | 'blog_posts' | 'team_members';
  /** Public route(s) to revalidate after a write. */
  revalidate: string[];
  /** Field in the row whose value is a storage URL. Cleaned up on replace. */
  storageField?: StorageField;
}

async function upsert(
  cfg: ResourceConfig,
  data: Record<string, unknown>,
  id?: number,
) {
  await verifyAdminSession();
  const supabase = await createAdminClient();

  if (id !== undefined && id !== null) {
    if (cfg.storageField) {
      const { data: existing } = await supabase
        .from(cfg.table)
        .select(cfg.storageField)
        .eq('id', id as number)
        .single();

      const prevUrl = (existing as Record<string, unknown> | null)?.[cfg.storageField] as
        | string
        | undefined;
      if (prevUrl && prevUrl !== data[cfg.storageField]) {
        await deleteStorageFile(supabase, prevUrl);
      }
    }

    const { data: updated, error } = await supabase
      .from(cfg.table)
      .update(cleanData(data))
      .eq('id', id as number)
      .select()
      .single();

    cfg.revalidate.forEach((p) => revalidatePath(p));
    return { error: error?.message, record: updated };
  }

  const { data: inserted, error } = await supabase
    .from(cfg.table)
    .insert(cleanData(data))
    .select()
    .single();

  cfg.revalidate.forEach((p) => revalidatePath(p));
  return { error: error?.message, record: inserted };
}

async function remove(cfg: ResourceConfig, id: number) {
  await verifyAdminSession();
  const supabase = await createAdminClient();

  if (cfg.storageField) {
    const { data: existing } = await supabase
      .from(cfg.table)
      .select(cfg.storageField)
      .eq('id', id)
      .single();

    const prevUrl = (existing as Record<string, unknown> | null)?.[cfg.storageField] as
      | string
      | undefined;
    if (prevUrl) {
      await deleteStorageFile(supabase, prevUrl);
    }
  }

  const { error } = await supabase.from(cfg.table).delete().eq('id', id);
  cfg.revalidate.forEach((p) => revalidatePath(p));
  return { error: error?.message };
}

// ─── Resource configurations ──────────────────────────────────

const HERO_CFG: ResourceConfig = {
  table: 'hero_slides',
  revalidate: ['/', '/admin/hero'],
  storageField: 'image',
};

const IMPACT_CFG: ResourceConfig = {
  table: 'impact_stats',
  revalidate: ['/', '/admin/impact'],
};

const GALLERY_CFG: ResourceConfig = {
  table: 'gallery_images',
  revalidate: ['/', '/admin/gallery'],
  storageField: 'src',
};

const BLOG_CFG: ResourceConfig = {
  table: 'blog_posts',
  revalidate: ['/', '/blog', '/admin/blog'],
  storageField: 'image',
};

const TEAM_CFG: ResourceConfig = {
  table: 'team_members',
  revalidate: ['/about', '/our-solution', '/admin/team'],
  storageField: 'image',
};

// ─── Public server actions ────────────────────────────────────

export async function upsertHeroSlide(data: Record<string, unknown>, id?: number) {
  return upsert(HERO_CFG, data, id);
}

export async function deleteHeroSlide(id: number) {
  return remove(HERO_CFG, id);
}

export async function upsertImpactStat(data: Record<string, unknown>, id?: number) {
  return upsert(IMPACT_CFG, data, id);
}

export async function deleteImpactStat(id: number) {
  return remove(IMPACT_CFG, id);
}

export async function upsertGalleryImage(data: Record<string, unknown>, id?: number) {
  return upsert(GALLERY_CFG, data, id);
}

export async function deleteGalleryImage(id: number) {
  return remove(GALLERY_CFG, id);
}

export async function upsertBlogPost(data: Record<string, unknown>, id?: number) {
  return upsert(BLOG_CFG, data, id);
}

export async function deleteBlogPost(id: number) {
  return remove(BLOG_CFG, id);
}

export async function upsertTeamMember(data: Record<string, unknown>, id?: number) {
  return upsert(TEAM_CFG, data, id);
}

export async function deleteTeamMember(id: number) {
  return remove(TEAM_CFG, id);
}
