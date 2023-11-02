import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { CarousselComponent } from './caroussel/caroussel.component';
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
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeCVComponent } from './liste-cv/liste-cv.component';
import { LoginComponent } from './login/login.component';
import { OffreemploiComponent } from './offreemploi/offreemploi.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateappelComponent } from './updateappel/updateappel.component';
import { UpdateoffreComponent } from './updateoffre/updateoffre.component';

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent,
    children: [
      { path: '', component: AccueilComponent},
      { path: 'accueil', component: AccueilComponent},
      { path: 'detail/:id', component: DetailComponent},
      { path: 'login', component: LoginComponent},
      { path: 'inscription', component: InscriptionComponent},
      { path: 'formulaire', component: FormulaireComponent},
      { path: 'Ajoutappel', component: AjoutappelComponent},
      { path: 'offreemploi', component: OffreemploiComponent},
      { path: 'appeloffre', component: AppelofreComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'employeur', component: EmployeurComponent},
      { path: 'updateoffre/:id', component: UpdateoffreComponent},
      { path: 'updateappel/:id', component: UpdateappelComponent},
      { path: 'detaiappel/:id', component: DetailppelComponent},
      { path: 'detail', component: DetailappelComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'cv', component: ListeCVComponent},
      { path: 'ajoutCV', component: AjoutCVComponent},
      { path: 'detailcv/:id', component: DetailcvComponent},
      { path: 'entreprise', component: EntrepriseComponent},
      { path: 'ajoutEntre', component: AjoutentreComponent},
      { path: 'affaire', component: AffaireComponent},
      { path: 'ajoutaffaire', component: AjoutaffComponent},
      { path: 'annonce', component: AnnonceComponent},
      { path: 'ajoutannonce', component: AjoutannonceComponent},
      { path: 'detailann/:id', component: DetailannComponent},
      { path: 'detailaff/:id', component: DetailaffComponent},      
      { path: 'caroussel', component: CarousselComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicmRoutingModule { }
