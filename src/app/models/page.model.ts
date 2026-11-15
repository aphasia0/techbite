export interface Page {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  imageStyle: 'cover' | 'scale';
  date: string;
}

/** Row shape returned by the public.blog_pages table. */
export interface BlogPageRow {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  image_url: string | null;
  image_style: 'cover' | 'scale' | null;
  published_at: string;
}
