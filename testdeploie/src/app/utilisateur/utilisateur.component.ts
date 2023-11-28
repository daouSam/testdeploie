import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ConfirmetionService } from '../confirmation/confirmation.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  list : any
  taille : any
  user1: any;
  constructor(
    private service: ServiceService,
    private confirmationService: ConfirmetionService,
    protected _notificationSvc: NotificationService
    ) { }
    
    ngOnInit(): void {
      this.listUtilisateur()
      this.user1 = JSON.parse(sessionStorage.getItem('isLogin')!);
    }
    
    listUtilisateur() {
      this.service.getAllUtilisateur().subscribe((data)=>{
        this.list=data
        this.taille=this.list.length
      })
    }
    
    delePermnUser(_t26: any) {
      this.confirmationService
    .confirmDialog({
      title: `Suppression définitive`,
      message: `êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ${_t26.email} ?`,
      confirmCaption: `Supprimer`,
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {  
      
      if (yes) {
        if(_t26.email == "sambadaou61@gmail.com"){
          this._notificationSvc.warning('ALERT', `Vous n\'êtes pas autorisé à supprimer l\'utilisateur ${_t26.email}`)
          return
        }else {
          this.service.deleteUtilisateur(_t26.id).subscribe(()=>{
            this._notificationSvc.success('SUCCES',`L'utilisateur ${_t26.email} à été supprimer avec succès !`)
            this.listUtilisateur()
          })
        }
      }
    })
    }

    delUser(data: any){
      let nomaction: 'Bannir' | 'Réactiver' = data.banniru == false ? 'Bannir' : 'Réactiver';
      this.confirmationService
    .confirmDialog({
      title: `${nomaction} l\'utilisateur`,
      message: `êtes-vous sûr de vouloir ${nomaction}  l\'utilisqteur ?`,
      confirmCaption: `${nomaction}`,
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {  
      let bannir: Banniru = {
        email: data.email
      } 
      if (yes) {
        this.service.banniUtilisateur(bannir).subscribe(()=> {
          this.listUtilisateur()
          this._notificationSvc.success('SUCCES',`l'utilisateur ${nomaction} avec succès !`)
        }, error => {
          this._notificationSvc.error('ERREUR',`erreur lors l'opération ${nomaction} !`)
        })
      }
    })
  }

}

interface Banniru {
  email: string
}
