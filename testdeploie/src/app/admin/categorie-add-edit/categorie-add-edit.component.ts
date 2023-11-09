import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notifications/notification.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-categorie-add-edit',
  templateUrl: './categorie-add-edit.component.html',
  styleUrls: ['./categorie-add-edit.component.css']
})
export class CategorieAddEditComponent {

  activeTab : string = "#multiple-options";
  constructor(
    private router : ActivatedRoute,
    private serviceCat: ServiceService,
    protected _notificationSvc: NotificationService
    )
  {
    let currentUrl = window.location.toString();
    let urlParts = currentUrl.split('#');
    if(urlParts != null && urlParts != undefined && urlParts.length > 1)
    {
      this.activeTab = "#"+urlParts[1];
    }

  }

  addCatOffre(data: NgForm){
    this.serviceCat.addCategorieOffre(data.value).subscribe({
      error: (error) => {
        this._notificationSvc.error("ERREUR","erreur lors de l'ajout la catégorie ")
      },
      complete:() => {
        data.reset()
        this._notificationSvc.success("SUCCES","catégorie entreprise ajouter avec succès ")        
      }
    })
  }
  
  addCatApplOffre(data: NgForm){
    this.serviceCat.addCategorieAppel(data.value).subscribe({
      error: (error) => {
        this._notificationSvc.error("ERREUR","erreur lors de l'ajout la catégorie ")        
      },
      complete:() => {
        data.reset()
        this._notificationSvc.success("SUCCES","catégorie entreprise ajouter avec succès ")         
      }
    })
    
  }
  
  addCatEntreprise(data: NgForm){
    this.serviceCat.addCategorieEntreprise(data.value).subscribe({
      error: (error) => {
        this._notificationSvc.error("ERREUR"," erreur lors de l'ajout la catégorie ")        
      },
      complete:() => {
        data.reset()        
        this._notificationSvc.success("SUCCES","catégorie entreprise ajouter avec succès ")        
      }
    })
    
  }
  
  addCatAnnonce(data: NgForm){
    this.serviceCat.addCategorieAnnonce(data.value).subscribe({
      error: (error) => {        
        this._notificationSvc.error("ERREUR","erreur lors de l'ajout la catégorie ")
      },
      complete:() => {
        data.reset()        
        this._notificationSvc.success("SUCCES","catégorie annonce ajouter avec succès ")        
      }
    })
    
  }
  
  addCatAffaire(data: NgForm){    
    this.serviceCat.addCategorieAffaire(data.value).subscribe({
      error: (error) => {
        this._notificationSvc.error("ERREUR","erreur lors de l'ajout la catégorie ")        
      },
      complete:() => {
        data.reset()
        this._notificationSvc.success("SUCCES","catégorie affaire ajouter avec succès ")         
      }
    })

  }

}
