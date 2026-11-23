import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSmallContentDownComponent } from './card-small-content-down.component';

describe('CardSmallContentDownComponent', () => {
  let component: CardSmallContentDownComponent;
  let fixture: ComponentFixture<CardSmallContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSmallContentDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSmallContentDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
