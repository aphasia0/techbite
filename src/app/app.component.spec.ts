import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BlogService } from './services/blog.service';
import { Page } from './models/page.model';

const pages: Page[] = [
  {
    id: 'ollama-local-llm',
    title: 'Run Local LLM with Ollama',
    subtitle: 'You need a big GPU to run this',
    content: '# Ollama',
    image: 'assets/img/ollama-local-llm.webp',
    imageStyle: 'cover',
    date: '2024-05-22',
  },
];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: BlogService,
          useValue: {
            getPages: () => of(pages),
            getPage: () => of(undefined),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand and primary navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('techbite');
    expect(compiled.querySelectorAll('.desktop-nav a').length).toBe(3);
  });

  it('should filter search results without regard to case', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onInput({ target: { value: 'ollama' } } as unknown as Event);
    expect(app.options).toEqual(['Run Local LLM with Ollama']);
  });
});
