import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySectionPersonalitiesComponent } from './category-section-personalities.component';

describe('CategorySectionPersonalitiesComponent', () => {
  let component: CategorySectionPersonalitiesComponent;
  let fixture: ComponentFixture<CategorySectionPersonalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CategorySectionPersonalitiesComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CategorySectionPersonalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
