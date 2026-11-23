import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { TableComponent } from './table/table.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, ProgramRoutingModule, PipesModule, ProgramComponent, TableComponent],
})
export class ProgramModule {}
