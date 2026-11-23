import { SectionsModule } from './../../sections/sections.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule, HomeRoutingModule, ComponentsModule, SectionsModule, HomeComponent],
})
export class HomeModule {}
