import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalitySingleComponent } from './personality-single.component';

const routes: Routes = [{ path: '', component: PersonalitySingleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalitySingleRoutingModule { }
