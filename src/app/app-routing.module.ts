import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplianceListComponent } from './appliance-list/appliance-list.component';

const routes: Routes = [
  { path: '', component: ApplianceListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
