import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionAllContentDownComponent } from './category-section-all-content-down.component';

describe('CategorySectionAllContentDownComponent', () => {
  let component: CategorySectionAllContentDownComponent;
  let fixture: ComponentFixture<CategorySectionAllContentDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySectionAllContentDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySectionAllContentDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
