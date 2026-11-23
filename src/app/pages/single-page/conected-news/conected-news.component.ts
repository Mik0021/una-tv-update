import { Article } from 'src/app/interfaces/article.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-conected-news',
    templateUrl: './conected-news.component.html',
    styleUrls: ['./conected-news.component.scss'],
    standalone: false
})
export class ConectedNewsComponent implements OnInit {
  @Input() articleList = [] as Article[];
  constructor() {}

  ngOnInit(): void {}
}
