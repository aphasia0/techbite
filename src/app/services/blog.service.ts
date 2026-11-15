import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, catchError, defer, from, map, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogPageRow, Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  /**
   * The blog is read-only, so the full page list is fetched once and shared
   * between the home, article and layout components.
   */
  private readonly pages$: Observable<Page[]> = defer(() => from(this.fetchPages())).pipe(
    catchError((error: unknown) => {
      console.error('Failed to load blog pages from Supabase', error);
      return of([]);
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  getPages(): Observable<Page[]> {
    return this.pages$;
  }

  getPage(id: string): Observable<Page | undefined> {
    return this.pages$.pipe(map((pages) => pages.find((page) => page.id === id)));
  }

  private async fetchPages(): Promise<Page[]> {
    const { data, error } = await this.supabase
      .from('blog_pages')
      .select('id, title, subtitle, content, image_url, image_style, published_at')
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return ((data ?? []) as BlogPageRow[]).map((row) => this.toPage(row));
  }

  private toPage(row: BlogPageRow): Page {
    return {
      id: row.id,
      title: row.title,
      subtitle: row.subtitle ?? '',
      content: row.content,
      image: row.image_url ?? '',
      imageStyle: row.image_style ?? 'cover',
      date: row.published_at,
    };
  }
}
