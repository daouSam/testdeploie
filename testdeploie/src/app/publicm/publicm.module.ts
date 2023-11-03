import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicmRoutingModule } from './publicm-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AffaireComponent } from './affaire/affaire.component';
import { AjoutCVComponent } from './ajout-cv/ajout-cv.component';
import { AjoutaffComponent } from './ajoutaff/ajoutaff.component';
import { AjoutannonceComponent } from './ajoutannonce/ajoutannonce.component';
import { AjoutappelComponent } from './ajoutappel/ajoutappel.component';
import { AjoutentreComponent } from './ajoutentre/ajoutentre.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AppelofreComponent } from './appelofre/appelofre.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { DetailaffComponent } from './detailaff/detailaff.component';
import { DetailannComponent } from './detailann/detailann.component';
import { DetailappelComponent } from './detailappel/detailappel.component';
import { DetailcvComponent } from './detailcv/detailcv.component';
import { DetailppelComponent } from './detailppel/detailppel.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { FooterComponent } from './footer/footer.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { HeaderComponent } from './header/header.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeCVComponent } from './liste-cv/liste-cv.component';
import { LoginComponent } from './login/login.component';
import { OffreemploiComponent } from './offreemploi/offreemploi.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateappelComponent } from './updateappel/updateappel.component';
import { UpdateoffreComponent } from './updateoffre/updateoffre.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlideComponent } from '../slide/slide.component';
import { CarousselComponent } from './caroussel/caroussel.component';
import { SideComponent } from './side/side.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { RSocialComponent } from './r-social/r-social.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    DetailComponent,
    LoginComponent,
    InscriptionComponent,
    FormulaireComponent,
    AjoutappelComponent,
    AppelofreComponent,
    OffreemploiComponent,
    ContactComponent,
    EmployeurComponent,
    UpdateoffreComponent,
    UpdateappelComponent,
    DetailappelComponent,
    DetailppelComponent,
    ProfileComponent,
    AjoutCVComponent,
    ListeCVComponent,
    DetailcvComponent,
    AjoutentreComponent,
    AffaireComponent,
    AjoutaffComponent,
    DetailannComponent,
    DetailaffComponent,
    AjoutannonceComponent,
    AnnonceComponent,
    SlideComponent,
    SideComponent,
    CarousselComponent,
    EntrepriseComponent,
    PublicLayoutComponent,
    RSocialComponent,
  ],
  imports: [
    CommonModule,
    PublicmRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EditorModule,
    MatRadioModule
  ],
  providers: []
})
export class PublicmModule { }
