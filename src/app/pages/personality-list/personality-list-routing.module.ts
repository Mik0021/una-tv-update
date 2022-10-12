import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalityListComponent } from './personality-list.component';

const routes: Routes = [{ path: '', component: PersonalityListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalityListRoutingModule { }
