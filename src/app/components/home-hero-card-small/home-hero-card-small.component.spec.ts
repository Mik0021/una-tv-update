import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroCardSmallComponent } from './home-hero-card-small.component';

describe('HomeHeroCardSmallComponent', () => {
  let component: HomeHeroCardSmallComponent;
  let fixture: ComponentFixture<HomeHeroCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeroCardSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
