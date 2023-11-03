import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CvadminComponent } from './cvadmin/cvadmin.component';
import { EntreadminComponent } from './entreadmin/entreadmin.component';
import { AffaireadminComponent } from './affaireadmin/affaireadmin.component';
import { AnnonceadminComponent } from './annonceadmin/annonceadmin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TistiqueComponent } from '../tistique/tistique.component';
import { UtilisateurComponent } from '../utilisateur/utilisateur.component';
import { RsocialModule } from '../publicm/r-social/r-social.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DashboardComponent,
    CvadminComponent,
    EntreadminComponent,
    AffaireadminComponent,
    AnnonceadminComponent,
    LayoutComponent,
    TistiqueComponent,
    UtilisateurComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RsocialModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class AdminModule { }
