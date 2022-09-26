import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectedNewsComponent } from './conected-news.component';

describe('ConectedNewsComponent', () => {
  let component: ConectedNewsComponent;
  let fixture: ComponentFixture<ConectedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConectedNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConectedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
