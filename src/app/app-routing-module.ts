import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './page/home/home';

const routes: Routes = [
  {path: '', component:Home, title:"Todwood - საუნების ხელოვნება"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
