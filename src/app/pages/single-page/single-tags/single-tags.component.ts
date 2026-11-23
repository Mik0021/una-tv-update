import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { Tags } from 'src/app/interfaces/tags.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-tags',
  templateUrl: './single-tags.component.html',
  styleUrls: ['./single-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SingleTagsComponent implements OnInit {
  readonly tags = input([] as Tags[]);
  constructor() {}

  ngOnInit(): void {}
}
