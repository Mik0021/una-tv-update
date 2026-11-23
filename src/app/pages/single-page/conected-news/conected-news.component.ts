import { Article } from 'src/app/interfaces/article.model';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-conected-news',
    templateUrl: './conected-news.component.html',
    styleUrls: ['./conected-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class ConectedNewsComponent implements OnInit {
  @Input() articleList = [] as Article[];
  constructor() {}

  ngOnInit(): void {}
}
