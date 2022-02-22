import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from "./app.component";
import { MapComponent} from "./map/map.component";
import { RegComponent} from "./reg/reg.component";

const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'reg',component: RegComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
