import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionSmallCardsContentDownComponent } from './category-section-small-cards-content-down.component';

describe('CategorySectionSmallCardsContentDownComponent', () => {
  let component: CategorySectionSmallCardsContentDownComponent;
  let fixture: ComponentFixture<CategorySectionSmallCardsContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySectionSmallCardsContentDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CategorySectionSmallCardsContentDownComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
