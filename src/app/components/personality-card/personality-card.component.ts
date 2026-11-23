import { Personality } from './../../interfaces/personality.model';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-personality-card',
    templateUrl: './personality-card.component.html',
    styleUrls: ['./personality-card.component.scss'],
    host: {
        class: 'text-base',
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PersonalityCardComponent implements OnInit {
  @Input() articleData = {} as Personality;
  hasImage: boolean = false;
  hasVideo: boolean = false;
  isTimeline: boolean = false;
  articleSlug: string = '';
  categorySlug: string = '';
  srcSet: string = '';

  constructor() {}

  ngOnInit(): void {
    this.createSrcSet();
  }

  createSrcSet() {
    if (this.articleData) {
      if (
        this.articleData.image &&
        this.articleData.image.thumbnails &&
        this.articleData.image.thumbnails[710] &&
        this.articleData.image.thumbnails[944]
      ) {
        this.srcSet = `${this.articleData.image.thumbnails[710]} 175w, ${this.articleData.image.thumbnails[944]}`;
      }
    }
  }
}
