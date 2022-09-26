import { Component, Input, OnInit } from '@angular/core';
import { Article } from './../../interfaces/article.model';
@Component({
  selector: 'app-home-hero-section',
  templateUrl: './home-hero-section.component.html',
  styleUrls: ['./home-hero-section.component.scss'],
})
export class HomeHeroSectionComponent implements OnInit {
  @Input() articles = [] as Article[];
  constructor() {}

  ngOnInit(): void {}
}
