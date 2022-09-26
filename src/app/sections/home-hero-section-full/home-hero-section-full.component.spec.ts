import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroSectionFullComponent } from './home-hero-section-full.component';

describe('HomeHeroSectionFullComponent', () => {
  let component: HomeHeroSectionFullComponent;
  let fixture: ComponentFixture<HomeHeroSectionFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeroSectionFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroSectionFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
