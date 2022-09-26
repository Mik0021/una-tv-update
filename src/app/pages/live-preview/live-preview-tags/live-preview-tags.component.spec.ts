import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePreviewTagsComponent } from './live-preview-tags.component';

describe('LivePreviewTagsComponent', () => {
  let component: LivePreviewTagsComponent;
  let fixture: ComponentFixture<LivePreviewTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivePreviewTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePreviewTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
