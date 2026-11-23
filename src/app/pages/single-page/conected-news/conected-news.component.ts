import { Article } from 'src/app/interfaces/article.model';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conected-news',
  templateUrl: './conected-news.component.html',
  styleUrls: ['./conected-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class ConectedNewsComponent implements OnInit {
  readonly articleList = input([] as Article[]);
  constructor() {}

  ngOnInit(): void {}
}
