import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSmallContentRightComponent } from './card-small-content-right.component';

describe('CardSmallContentRightComponent', () => {
  let component: CardSmallContentRightComponent;
  let fixture: ComponentFixture<CardSmallContentRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSmallContentRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSmallContentRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
