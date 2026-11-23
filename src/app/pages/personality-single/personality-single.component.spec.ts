import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitySingleComponent } from './personality-single.component';

describe('PersonalitySingleComponent', () => {
  let component: PersonalitySingleComponent;
  let fixture: ComponentFixture<PersonalitySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalitySingleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalitySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
