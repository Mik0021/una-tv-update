import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSmallContentDownNoCatComponent } from './card-small-content-down-no-cat.component';

describe('CardSmallContentDownNoCatComponent', () => {
  let component: CardSmallContentDownNoCatComponent;
  let fixture: ComponentFixture<CardSmallContentDownNoCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSmallContentDownNoCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSmallContentDownNoCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
