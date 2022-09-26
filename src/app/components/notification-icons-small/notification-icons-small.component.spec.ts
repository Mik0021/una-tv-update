import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIconsSmallComponent } from './notification-icons-small.component';

describe('NotificationIconsSmallComponent', () => {
  let component: NotificationIconsSmallComponent;
  let fixture: ComponentFixture<NotificationIconsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationIconsSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationIconsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
