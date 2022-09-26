import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLargeContentDownComponent } from './card-large-content-down.component';

describe('CardLargeContentDownComponent', () => {
  let component: CardLargeContentDownComponent;
  let fixture: ComponentFixture<CardLargeContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLargeContentDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLargeContentDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
