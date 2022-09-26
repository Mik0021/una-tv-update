import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTagsComponent } from './single-tags.component';

describe('SingleTagsComponent', () => {
  let component: SingleTagsComponent;
  let fixture: ComponentFixture<SingleTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
