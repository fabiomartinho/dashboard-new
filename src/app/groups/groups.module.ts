import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material';
import { GroupsComponent } from './groups.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule
  ],
  declarations: [
    GroupsComponent,
  ],
  exports: [
    RouterModule
  ]
})
export class GroupsModule { }
