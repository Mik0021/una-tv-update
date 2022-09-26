import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionContentRightComponent } from './category-section-content-right.component';

describe('CategorySectionContentRightComponent', () => {
  let component: CategorySectionContentRightComponent;
  let fixture: ComponentFixture<CategorySectionContentRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySectionContentRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySectionContentRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
