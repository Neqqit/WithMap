import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';



const mapConfig: YaConfig = {
  apikey: '9e387b2c-464a-4c77-b4dc-34cd5f950664',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularYandexMapsModule.forRoot(mapConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
