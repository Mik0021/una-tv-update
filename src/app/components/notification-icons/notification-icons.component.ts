import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-icons',
  templateUrl: './notification-icons.component.html',
  styleUrls: ['./notification-icons.component.scss'],
})
export class NotificationIconsComponent implements OnInit {
  @Input() image: boolean = false;
  @Input() video: boolean = false;
  @Input() timeline: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
