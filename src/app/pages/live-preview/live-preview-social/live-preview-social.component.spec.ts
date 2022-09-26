import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePreviewSocialComponent } from './live-preview-social.component';

describe('LivePreviewSocialComponent', () => {
  let component: LivePreviewSocialComponent;
  let fixture: ComponentFixture<LivePreviewSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivePreviewSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePreviewSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
