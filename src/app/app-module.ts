import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { Home } from './page/home/home';
import { Projects } from './page/projects/projects';
import { Services } from './page/services/services';
import { Contact } from './page/contact/contact';

@NgModule({
  declarations: [App, Header, Home, Projects, Services, Contact],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
