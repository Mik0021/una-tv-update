import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIconsComponent } from './notification-icons.component';

describe('NotificationIconsComponent', () => {
  let component: NotificationIconsComponent;
  let fixture: ComponentFixture<NotificationIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
