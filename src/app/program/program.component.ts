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
  schemaComplete = [] as TvProgram[];
  schemaCompleteBih = [] as TvProgram[];
  tvProgram$: Observable<TvProgram> = this.tvProgramService.tvProgram$;
  tvProgramBih$: Observable<TvProgram> = this.tvProgramService.tvProgramBih$;
  constructor(private tvProgramService: TvProgramService) {}
  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      this.tvProgramService.getTvProgram(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
      this.tvProgramService.getTvProgramBih(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
    }
    this.tvProgram$.subscribe({
      next: (res) => {
        if (!Array.isArray(res.data)) {
          this.schemaComplete.push(res);
          this.schemaComplete.sort((a, b) => {
            let aDate = new Date(a.data.date);
            let bDate = new Date(b.data.date);
            return +aDate - +bDate;
          });
          for (let i = 0; i < this.schemaComplete.length; i++) {
            i === 0
              ? (this.schemaComplete[i].active = true)
              : (this.schemaComplete[i].active = false);
          }
        }
      },
    });
    this.tvProgramBih$.subscribe({
      next: (res) => {
        if (!Array.isArray(res.data)) {
          this.schemaCompleteBih.push(res);
          this.schemaCompleteBih.sort((a, b) => {
            let aDate = new Date(a.data.date);
            let bDate = new Date(b.data.date);
            return +aDate - +bDate;
          });
          for (let i = 0; i < this.schemaCompleteBih.length; i++) {
            i === 0
              ? (this.schemaCompleteBih[i].active = true)
              : (this.schemaCompleteBih[i].active = false);
          }
        }
      },
    });
  }
}
