import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),

    //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
