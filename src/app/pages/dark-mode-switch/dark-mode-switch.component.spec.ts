import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeSwitchComponent } from './dark-mode-switch.component';

describe('DarkModeSwitchComponent', () => {
  let component: DarkModeSwitchComponent;
  let fixture: ComponentFixture<DarkModeSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarkModeSwitchComponent]
    });
    fixture = TestBed.createComponent(DarkModeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
