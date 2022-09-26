import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLivePreviewComponent } from './home-live-preview.component';

describe('HomeLivePreviewComponent', () => {
  let component: HomeLivePreviewComponent;
  let fixture: ComponentFixture<HomeLivePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLivePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLivePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
