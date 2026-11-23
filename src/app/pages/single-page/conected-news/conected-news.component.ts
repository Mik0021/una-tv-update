import { Article } from 'src/app/interfaces/article.model';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-conected-news',
    templateUrl: './conected-news.component.html',
    styleUrls: ['./conected-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ConectedNewsComponent implements OnInit {
  @Input() articleList = [] as Article[];
  constructor() {}

  ngOnInit(): void {}
}
