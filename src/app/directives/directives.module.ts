import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunScriptsDirective } from './run-scripts.directive';
import { ViberShareDirective } from './viber-share.directive';

@NgModule({
    imports: [CommonModule, RunScriptsDirective, ViberShareDirective],
    exports: [RunScriptsDirective, ViberShareDirective],
})
export class DirectivesModule {}
