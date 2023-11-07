import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RepoViewComponent } from './components/repoview/repoview.component'; 
import { SearchComponent } from './components/search/search.component';
const routes: Routes = [
  { path: 'repoview/:username', component: RepoViewComponent}, 
  { path: '', component: SearchComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
