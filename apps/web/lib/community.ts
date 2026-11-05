import { createPublicClient } from "@/lib/supabase/public";

export type LivePost = {
  id: string;
  category: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
};

export async function listCommunityPosts(): Promise<LivePost[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, category, title, body, author_name, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id as string,
    category: row.category as string,
    title: row.title as string,
    body: row.body as string,
    authorName: row.author_name as string,
    createdAt: row.created_at as string,
  }));
}

export async function getCommunityPost(id: string): Promise<LivePost | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, category, title, body, author_name, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id as string,
    category: data.category as string,
    title: data.title as string,
    body: data.body as string,
    authorName: data.author_name as string,
    createdAt: data.created_at as string,
  };
}
