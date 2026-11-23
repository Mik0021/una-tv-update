import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { TableComponent } from './table/table.component';


@NgModule({
    imports: [CommonModule, ProgramRoutingModule, ProgramComponent, TableComponent],
})
export class ProgramModule {}
