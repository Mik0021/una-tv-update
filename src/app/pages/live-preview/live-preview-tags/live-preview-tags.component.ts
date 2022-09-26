import { Component, Input, OnInit } from '@angular/core';
import { Tags } from 'src/app/interfaces/tags.model';

@Component({
  selector: 'app-live-preview-tags',
  templateUrl: './live-preview-tags.component.html',
  styleUrls: ['./live-preview-tags.component.scss'],
})
export class LivePreviewTagsComponent implements OnInit {
  @Input() tags = [] as Tags[];

  constructor() {}

  ngOnInit(): void {}
}
