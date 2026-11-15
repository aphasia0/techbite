import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AllStoriesComponent } from './all-stories.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { BlogService } from '../../services/blog.service';

describe('AllStoriesComponent', () => {
  let component: AllStoriesComponent;
  let fixture: ComponentFixture<AllStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStoriesComponent, RouterModule.forRoot([]), IconsProviderModule],
      providers: [
        {
          provide: BlogService,
          useValue: {
            getPages: () => of([]),
            getPage: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
