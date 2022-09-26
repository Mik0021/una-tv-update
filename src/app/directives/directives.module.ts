import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunScriptsDirective } from './run-scripts.directive';
import { ViberShareDirective } from './viber-share.directive';

@NgModule({
  declarations: [RunScriptsDirective, ViberShareDirective],
  imports: [CommonModule],
  exports: [RunScriptsDirective, ViberShareDirective],
})
export class DirectivesModule {}
