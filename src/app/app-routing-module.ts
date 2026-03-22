import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Projects } from './page/projects/projects';
import { Services } from './page/services/services';
import { Contact } from './page/contact/contact';

const routes: Routes = [
  {path: '', component:Home, title:"Todwood - საუნების ხელოვნება"},
  {path: 'projects', component:Projects, title:"ჩვენი ნამუშევრები | Todwood"},
  {path: 'services', component:Services, title:"სერვისები | Todwood"},
  {path: 'contact', component:Contact, title:"კონტაქტი | Todwood"},
  
  
  
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
