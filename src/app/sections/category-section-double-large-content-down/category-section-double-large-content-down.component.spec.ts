import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionDoubleLargeContentDownComponent } from './category-section-double-large-content-down.component';

describe('CategorySectionDoubleLargeContentDownComponent', () => {
  let component: CategorySectionDoubleLargeContentDownComponent;
  let fixture: ComponentFixture<CategorySectionDoubleLargeContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySectionDoubleLargeContentDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySectionDoubleLargeContentDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
