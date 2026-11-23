import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityHomeCardComponent } from './personality-home-card.component';

describe('PersonalityHomeCardComponent', () => {
  let component: PersonalityHomeCardComponent;
  let fixture: ComponentFixture<PersonalityHomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalityHomeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalityHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
