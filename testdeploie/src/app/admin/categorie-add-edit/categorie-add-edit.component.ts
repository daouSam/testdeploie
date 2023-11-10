import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { typeCategorie } from 'src/app/models/consign';
import { NotificationService } from 'src/app/notifications/notification.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-categorie-add-edit',
  templateUrl: './categorie-add-edit.component.html',
  styleUrls: ['./categorie-add-edit.component.css']
})
export class CategorieAddEditComponent implements OnInit {

  activeTab : string = "#multiple-options";
  orderObj: any
  isAddMode: boolean = true
  consign: typeCategorie = {
    id: '',
    types: ''
  }
  formData: formData = {
    id: '',
    nom: ''
  };
  

  onSubmitEdit() {
    this.choixupdate(this.consign, this.formData);
  }
  categorie: any;
  constructor(
    private route : ActivatedRoute,
    private router: Router,
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

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        this.orderObj = { ...params.keys, ...params };
        this.consign.id = this.orderObj.params.id        
        this.consign.types = this.orderObj.params.types
        if (this.consign.types) {
          this.choixcomplexe(this.consign)
          this.isAddMode = false
        }
      }
    );
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

  getCatOffreById(id: any){
    this.serviceCat.getCatOffreById(id).subscribe(data => {
      this.categorie = data
      this.formData.id = this.categorie.id
      this.formData.nom = this.categorie.nom
    })
  }

  getCatAppelById(id: any){
    this.serviceCat.getCatAppelById(id).subscribe(data => {
      this.categorie = data
      this.formData.id = this.categorie.id
      this.formData.nom = this.categorie.nom
    })
  }
  
  getCatEntrepriseById(id: any){
    this.serviceCat.getCatEntrepriseById(id).subscribe(data => {
      this.categorie = data
      this.formData.id = this.categorie.id
      this.formData.nom = this.categorie.nom
    })
    
  }
  
  getCatAnnonceById(id: any){
    this.serviceCat.getCatAnnonceById(id).subscribe(data => {
      this.categorie = data
      this.formData.id = this.categorie.id
      this.formData.nom = this.categorie.nom
    })
    
  }
  
  getCatAffaireById(id: any){
    this.serviceCat.getCatAffaireById(id).subscribe(data => {
      this.categorie = data
      this.formData.id = this.categorie.id
      this.formData.nom = this.categorie.nom
    })

  }

  // update all categorie
  updateCatOffreById(id: any, data: formData){
    this.serviceCat.updateCatOffreById(id, data).subscribe({
      error:(error) => {
        this._notificationSvc.error('ERREUR', 'erreur lors de la modification de la catégorie')
      },
      complete:() =>{
        this._notificationSvc.success('SUCCES','la catégorie a été modifier avec succès')
        this.router.navigate(['/admin/categorie']);
      }
      
    })
  }
  
  updateCatAppelById(id: any, data: formData){
    this.serviceCat.updateCatAppelById(id, data).subscribe({
      error:(error) => {
        this._notificationSvc.error('ERREUR', 'erreur lors de la modification de la catégorie')
      },
      complete:() =>{
        this._notificationSvc.success('SUCCES','la catégorie a été modifier avec succès')
        this.router.navigate(['/admin/categorie']);
      }
  
    })
    
  }
  
  updateCatEntrepriseById(id: any, data: formData){
    this.serviceCat.updateCatEntrepriseById(id, data).subscribe({
      error:(error) => {
        this._notificationSvc.error('ERREUR', 'erreur lors de la modification de la catégorie')
      },
      complete:() =>{
        this._notificationSvc.success('SUCCES','la catégorie a été modifier avec succès')
        this.router.navigate(['/admin/categorie']);
      }
  
    })
    
  }
  
  updateCatAnnonceById(id: any, data: formData){
    this.serviceCat.updateCatAnnonceById(id, data).subscribe({
      error:(error) => {
        this._notificationSvc.error('ERREUR', 'erreur lors de la modification de la catégorie')
      },
      complete:() =>{
        this._notificationSvc.success('SUCCES','la catégorie a été modifier avec succès')
        this.router.navigate(['/admin/categorie']);
      }
  
    })
    
  }
  
  updateCatAffaireById(id: any, data: formData){
    this.serviceCat.updateCatAffaireById(id, data).subscribe({
      error:(error) => {
        this._notificationSvc.error('ERREUR', 'erreur lors de la modification de la catégorie')
      },
      complete:() =>{
        this._notificationSvc.success('SUCCES','la catégorie a été modifier avec succès')
        this.router.navigate(['/admin/categorie']);
      }
  
    })

  }
  choixupdate(data: typeCategorie, donnee: formData){
    switch (data.types) {
      case 'appel':
        this.updateCatAppelById(data.id, donnee)
        break;
        case 'offre':
        this.updateCatOffreById(data.id, donnee)
        
        break;
        case 'entreprise':
        this.updateCatEntrepriseById(data.id, donnee)
        
        break;
        case 'annonce':
        this.updateCatAnnonceById(data.id, donnee)
        
        break;
        case 'affaire':
        this.updateCatAffaireById(data.id, donnee)
        
        break;
    
      default:
        this._notificationSvc.warning('Attention', 'le type catégorie non retrouvable')
        break;
    }

  }
  choixcomplexe(data: typeCategorie){
    switch (data.types) {
      case 'appel':
        this.getCatAppelById(data.id)
        break;
        case 'offre':
        this.getCatOffreById(data.id)
        
        break;
        case 'entreprise':
        this.getCatEntrepriseById(data.id)
        
        break;
        case 'annonce':
        this.getCatAnnonceById(data.id)
        
        break;
        case 'affaire':
        this.getCatAffaireById(data.id)
        
        break;
    
      default:
        break;
    }

  }

}

interface formData {
  id: string,
  nom: string
};
