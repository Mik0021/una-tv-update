import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroCardLargeComponent } from './home-hero-card-large.component';

describe('HomeHeroCardLargeComponent', () => {
  let component: HomeHeroCardLargeComponent;
  let fixture: ComponentFixture<HomeHeroCardLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeroCardLargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroCardLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
