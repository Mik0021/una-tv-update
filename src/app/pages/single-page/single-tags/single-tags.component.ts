import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Tags } from 'src/app/interfaces/tags.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-tags',
  templateUrl: './single-tags.component.html',
  styleUrls: ['./single-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class SingleTagsComponent implements OnInit {
  @Input() tags = [] as Tags[];
  constructor() {}

  ngOnInit(): void {}
}
