import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CvadminComponent } from './cvadmin/cvadmin.component';
import { EntreadminComponent } from './entreadmin/entreadmin.component';
import { AffaireadminComponent } from './affaireadmin/affaireadmin.component';
import { AnnonceadminComponent } from './annonceadmin/annonceadmin.component';
import { LayoutComponent } from './layout/layout.component';
import { UtilisateurComponent } from '../utilisateur/utilisateur.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    { path: '', component: DashboardComponent},
    { path: 'cvadmin', component: CvadminComponent},
    { path: 'entreadmin', component: EntreadminComponent},
    { path: 'affaireadmin', component: AffaireadminComponent},
    { path: 'annonceadmin', component: AnnonceadminComponent},
    { path: 'user', component: UtilisateurComponent},
  ]
 },
 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
