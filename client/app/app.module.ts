import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [BaseComponent]
})
export class AppModule {}
