import { Component, Input, OnInit } from '@angular/core';
import { TvProgram } from './../../interfaces/tv-program.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() schema = [] as TvProgram[];
  constructor() {}

  ngOnInit(): void {}

  changeTab(index: number) {
    this.schema = this.schema.map((schema, i) =>
      i === index ? { ...schema, active: true } : { ...schema, active: false }
    );
  }

  toggleAccordion(event: any, index: number, dayIndex: number) {
    const element = event.target;
    element.parentElement.classList.toggle('active-acc');
    if (this.schema[dayIndex].data.schema[index].isActive) {
      this.schema[dayIndex].data.schema[index].isActive = false;
    } else {
      this.schema[dayIndex].data.schema[index].isActive = true;
    }
    const panel =
      element.parentElement.nextElementSibling.querySelector('.panel');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
}
