import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { TableComponent } from './table/table.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [ProgramComponent, TableComponent],
  imports: [CommonModule, ProgramRoutingModule, PipesModule],
})
export class ProgramModule {}
