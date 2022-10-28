import { Personality } from './../../interfaces/personality.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personality-home-card',
  templateUrl: './personality-home-card.component.html',
  styleUrls: ['./personality-home-card.component.scss'],
  host: {
    class: 'text-base',
  },
})
export class PersonalityHomeCardComponent implements OnInit {
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
        this.articleData.image.thumbnails[144] &&
        this.articleData.image.thumbnails[345]
      ) {
        this.srcSet = `${this.articleData.image.thumbnails[144]} 175w, ${this.articleData.image.thumbnails[345]}`;
      }
    }
  }
}
