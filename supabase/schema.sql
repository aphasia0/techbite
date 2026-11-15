-- Blog pages: replaces src/app/static.pages.ts + src/assets/md/*.md
create table public.blog_pages (
  id            text primary key,
  title         text not null,
  subtitle      text,
  content       text not null,
  image_url     text,
  image_style   text not null default 'cover',
  published_at  date not null default current_date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint blog_pages_id_slug_check
    check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint blog_pages_image_style_check
    check (image_style in ('cover', 'scale'))
);

comment on table  public.blog_pages is 'Blog articles rendered by the Angular client.';
comment on column public.blog_pages.id is 'URL slug used by /blog/:id.';
comment on column public.blog_pages.content is 'Markdown body (replaces the old assets/md/*.md files).';
comment on column public.blog_pages.image_url is 'Hero image URL (Supabase Storage or /assets/img path).';
comment on column public.blog_pages.image_style is 'Maps to the old Page.imageStyle: cover or scale.';
comment on column public.blog_pages.published_at is 'Maps to the old Page.date; used for sidebar/home ordering.';

create index blog_pages_published_at_idx
  on public.blog_pages (published_at desc);

-- Keep updated_at fresh
create or replace function public.set_blog_pages_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger blog_pages_set_updated_at
  before update on public.blog_pages
  for each row
  execute function public.set_blog_pages_updated_at();

-- Public read-only access; writes use the service role / dashboard
alter table public.blog_pages enable row level security;

create policy "Public read access"
  on public.blog_pages
  for select
  to anon, authenticated
  using (true);

grant select on public.blog_pages to anon, authenticated;
grant all    on public.blog_pages to service_role;
