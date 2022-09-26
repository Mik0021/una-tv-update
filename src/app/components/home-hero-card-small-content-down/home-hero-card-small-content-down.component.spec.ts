import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroCardSmallContentDownComponent } from './home-hero-card-small-content-down.component';

describe('HomeHeroCardSmallContentDownComponent', () => {
  let component: HomeHeroCardSmallContentDownComponent;
  let fixture: ComponentFixture<HomeHeroCardSmallContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeroCardSmallContentDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroCardSmallContentDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
