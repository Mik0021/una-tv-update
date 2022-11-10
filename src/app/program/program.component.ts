import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TvProgram } from './../interfaces/tv-program.model';
import { TvProgramService } from './../services/tv-program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  showTab: boolean = true;
  schemaComplete = {} as TvProgram;
  schemaCompleteBih = {} as TvProgram;
  tvProgram$: Observable<TvProgram> = this.tvProgramService.tvProgram$;
  tvProgramBih$: Observable<TvProgram> = this.tvProgramService.tvProgramBih$;
  constructor(private tvProgramService: TvProgramService) {}
  ngOnInit(): void {
    this.tvProgramService.getTvProgram();
    this.tvProgramService.getTvProgramBih();

    this.tvProgram$.subscribe({
      next: (res) => {
        this.schemaComplete = res;
        for (let i = 0; i < this.schemaComplete.data.length; i++) {
          i === 0
            ? (this.schemaComplete.data[i].active = true)
            : (this.schemaComplete.data[i].active = false);
        }
      },
    });
    this.tvProgramBih$.subscribe({
      next: (res) => {
        this.schemaCompleteBih = res;
        for (let i = 0; i < this.schemaCompleteBih.data.length; i++) {
          i === 0
            ? (this.schemaCompleteBih.data[i].active = true)
            : (this.schemaCompleteBih.data[i].active = false);
        }
      },
    });
  }
}
