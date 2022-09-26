import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLargeContentDownNoCatComponent } from './card-large-content-down-no-cat.component';

describe('CardLargeContentDownNoCatComponent', () => {
  let component: CardLargeContentDownNoCatComponent;
  let fixture: ComponentFixture<CardLargeContentDownNoCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLargeContentDownNoCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLargeContentDownNoCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
