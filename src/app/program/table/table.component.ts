import { Component, Input, OnInit } from '@angular/core';
import { Tabs } from 'src/app/interfaces/tabs.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tabs = [] as Tabs[];

  constructor() {}

  ngOnInit(): void {}
  changeTab(index: number) {
    this.tabs = this.tabs.map((tab, i) =>
      i === index ? { ...tab, active: true } : { ...tab, active: false }
    );
  }
}
