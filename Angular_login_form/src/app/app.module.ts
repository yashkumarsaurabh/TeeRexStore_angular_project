import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App2 } from './app2.component';
import { HighLight } from './app.directive';


@NgModule({
  declarations: [
    AppComponent,
    HighLight,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    App2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
