import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';
import { typeCategorie } from 'src/app/models/consign';
import { NotificationService } from 'src/app/notifications/notification.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit{
  categoryForm: FormGroup;
  nomCategorie: string = 'Catégorie différent catégorie'
  categorie: any;
  orderObj: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
     private serviceCat: ServiceService,
     protected _notificationSvc: NotificationService,
     private confirmationService: ConfirmetionService) {
    this.categoryForm = this.fb.group({
      categorie: ['appel']
    });

    this.categoryForm.get('categorie')?.valueChanges.subscribe({
      next: (value) => {
        this.choixcategr(value)
          },
          error: (error) => {
            this._notificationSvc.warning("WARRNING","vous devez séléctioner une catégorie !")
      },
      complete: () => {        
      },
    });
  }

  ngOnInit(): void {
      this.getCatAppel()
  }
  choixcategr(types: any) {
    switch (types) {
      case 'appel':
        this.getCatAppel()
        break;
        case 'offre':
          this.getCatOffre()
          break;
        case 'entreprise':
          this.getCatEntreprise()
          break;
        case 'annonce':
          this.getCatAnnonce()
          break;
        case 'affaire':
          this.getCatAffaire()
          break;
        default:
          this._notificationSvc.warning("WARRNING","vous devez séléctioner une catégorie !")
          break;
      }
  }

  edit(id: any){
    let consign: typeCategorie = {
      id: id,
      types: this.categoryForm.value.categorie
    } 
    this.router.navigate(['/admin/categorie/add'], { queryParams: consign });
  }
  
  deletec(id: any){
    let consign: typeCategorie = {
      id: id,
      types: this.categoryForm.value.categorie
    }
    this.confirmationService
    .confirmDialog({
      title: 'Supprimer',
      message: 'êtes-vous sûr de vouloir supprimer ?',
      confirmCaption: 'Supprimer',
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {   
      if (yes) {
        switch (consign.types) {
          case 'appel':
            this.suppimeCatAppel(consign.id)
            break;
            case 'offre':
            this.suppimeCatOffre(consign.id)
            
            break;
            case 'entreprise':
            this.suppimeCatEntreprise(consign.id)
            
            break;
            case 'annonce':
            this.suppimeCatAnnonce(consign.id)
            
            break;
            case 'affaire':
            this.suppimeCatAffaire(consign.id) 

            break;
        
          default:
            this._notificationSvc.warning('Attention', 'vous devez cliquer sur delete icon pour supprimer')
            break;
        }       
      }
    })
  }

  getCatAppel(){
    this.serviceCat.getCategorieAppel().subscribe(
      (value1) => {
        this.categorie = value1;
        this.nomCategorie = 'catégorie d\'Appel d\'Offre'
      },
      (error) => {
        this._notificationSvc.error("échec", "Catégorie introuvable, il y a eu une erreur !");
      }
    );
  }
  getCatOffre(){
    this.serviceCat.getCategorie().subscribe(data => {
      this.categorie = data
      this.nomCategorie = 'catégorie d\'Offre d\'Emploie'
    }, error => this._notificationSvc.error("échec","catégorie introuvable il y a eu un erreur !"))
  }
  getCatEntreprise(){
    this.serviceCat.getCategorieEntreprise().subscribe(data => {
      this.categorie = data
      this.nomCategorie = 'catégorie d\'Entreprise'
    }, error => this._notificationSvc.error("échec","catégorie introuvable il y a eu un erreur !"))
  }
  getCatAnnonce(){
    this.serviceCat.getCategorieAnnonce().subscribe(data => {
      this.categorie = data
      this.nomCategorie = 'catégorie d\'Annonce'
    }, error => this._notificationSvc.error("échec","catégorie introuvable il y a eu un erreur !"))
  }
  getCatAffaire(){
    this.serviceCat.getCategorieAffaire().subscribe(data => {
      this.categorie = data
      this.nomCategorie = 'catégorie d\'Affaire'
    }, error => this._notificationSvc.error("échec","catégorie introuvable il y a eu un erreur !"))
  }

  suppimeCatAppel(id: any){
    this.serviceCat.delCategorieAppel(id).subscribe({
      error: (error) =>{
        this._notificationSvc.error("ERREUR","catégorie appel introuvable il y a eu un erreur !")
      },
      complete: () => {
        this.getCatAppel()
        this._notificationSvc.success("SUCCES","catégorie appel offre supprimer avec succès !")
      }
    })
  }

  suppimeCatOffre(id: any){
    this.serviceCat.delCategorieOffre(id).subscribe({  
      error: (error) =>{
        this._notificationSvc.error("ERREUR","catégorie offre emploi introuvable il y a eu un erreur !")
      },
      complete: () => {
        this.getCatOffre()
        this._notificationSvc.success("SUCCES","catégorie offre emploi supprimer avec succès !")        
      }
    })
  }

  suppimeCatEntreprise(id: any){
    this.serviceCat.delCategorieEntreprise(id).subscribe({  
        error: (error) =>{
          this._notificationSvc.error("ERREUR","catégorie entreprise introuvable il y a eu un erreur !")  
        },
        complete: () => {
          this.getCatEntreprise()
          this._notificationSvc.success("SUCCES","catégorie entreprise supprimer avec succès !")          
        }
      })
    }
    
    suppimeCatAnnonce(id: any){
      this.serviceCat.delCategorieAnnonce(id).subscribe({
        error: (error) =>{
          this._notificationSvc.error("ERREUR","catégorie annonce introuvable il y a eu un erreur !")  
        },
        complete: () => {
          this.getCatAnnonce()
          this._notificationSvc.success("SUCCES","catégorie annonce supprimer avec succès !")          
        }
      })
    }

    suppimeCatAffaire(id: any){
      this.serviceCat.delCategorieAffaire(id).subscribe({
        error: (error) =>{
          this._notificationSvc.error("ERREUR","catégorie affaore introuvable il y a eu un erreur !")  
        },
        complete: () => {
          this.getCatAffaire()
          this._notificationSvc.success("SUCCES","catégorie affaore supprimer avec succès !")          
        }
      })
    }

  }


