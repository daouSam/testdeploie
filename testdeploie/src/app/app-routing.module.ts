import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';


import { CarousselComponent } from './publicm/caroussel/caroussel.component';


const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./publicm/publicm.module')
    .then(m => m.PublicmModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule), canActivate: [AdminGuard]
  },  
  { path: '**', redirectTo: '/home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
