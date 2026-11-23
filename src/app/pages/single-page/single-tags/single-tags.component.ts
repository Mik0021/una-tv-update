import { Component, Input, OnInit } from '@angular/core';
import { Tags } from 'src/app/interfaces/tags.model';

@Component({
    selector: 'app-single-tags',
    templateUrl: './single-tags.component.html',
    styleUrls: ['./single-tags.component.scss'],
    standalone: false
})
export class SingleTagsComponent implements OnInit {
  @Input() tags = [] as Tags[];
  constructor() {}

  ngOnInit(): void {}
}
