import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CvadminComponent } from './cvadmin/cvadmin.component';
import { EntreadminComponent } from './entreadmin/entreadmin.component';
import { AffaireadminComponent } from './affaireadmin/affaireadmin.component';
import { AnnonceadminComponent } from './annonceadmin/annonceadmin.component';
import { LayoutComponent } from './layout/layout.component';
import { UtilisateurComponent } from '../utilisateur/utilisateur.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieAddEditComponent } from './categorie-add-edit/categorie-add-edit.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    { path: '', component: DashboardComponent},
    { path: 'cvadmin', component: CvadminComponent},
    { path: 'entreadmin', component: EntreadminComponent},
    { path: 'affaireadmin', component: AffaireadminComponent},
    { path: 'annonceadmin', component: AnnonceadminComponent},
    { path: 'user', component: UtilisateurComponent},
    { path: 'categorie', component: CategorieListComponent},
    { path: 'categorie/add', component: CategorieAddEditComponent}
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
