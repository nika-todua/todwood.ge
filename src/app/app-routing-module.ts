import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Projects } from './page/projects/projects';

const routes: Routes = [
  {path: '', component:Home, title:"Todwood - საუნების ხელოვნება"},
  {path: 'projects', component:Projects, title:"ჩვენი ნამუშევრები"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
