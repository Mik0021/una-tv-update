import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-icons-small',
  templateUrl: './notification-icons-small.component.html',
  styleUrls: ['./notification-icons-small.component.scss'],
})
export class NotificationIconsSmallComponent implements OnInit {
  @Input() image: boolean = false;
  @Input() video: boolean = false;
  @Input() timeline: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
