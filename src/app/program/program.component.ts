import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { TvProgramService } from '../services/tv-program.service';
import { lastValue } from '../utils/resource';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
})
export class ProgramComponent {
  protected readonly program = lastValue(inject(TvProgramService).tvProgram());

  constructor() {
    inject(SeoService).set({
      title: 'UNA TV PROGRAM',
      description: 'Pogledajte program UNA TELEVIZIJE',
      keywords: 'program, una tv',
      shareTitle: 'Una tv program',
    });
  }
}
