import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityListComponent } from './personality-list.component';

describe('PersonalityListComponent', () => {
  let component: PersonalityListComponent;
  let fixture: ComponentFixture<PersonalityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PersonalityListComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PersonalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
