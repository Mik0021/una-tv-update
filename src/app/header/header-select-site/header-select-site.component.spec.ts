import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSelectSiteComponent } from './header-select-site.component';

describe('HeaderSelectSiteComponent', () => {
  let component: HeaderSelectSiteComponent;
  let fixture: ComponentFixture<HeaderSelectSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSelectSiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSelectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
