import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  user: any;
  loginData: any;
  id: any;
  loading : boolean=false
  formgroup: any;
  submitted: boolean=false;
  constructor(
    private service : ServiceService,
    public formBuilder: FormBuilder,
    protected _notificationSvc: NotificationService
    ) { }

    ngOnInit(): void {
 
       const user: any | null = sessionStorage.getItem('isLogin');
       this.user = JSON.parse(user);
       if(this.user !== null){
         this.loginData=this.user
       }
      this.id=this.loginData?.id;
       this.formgroup = this.formBuilder.group({
   
         objet: ['', [Validators.required,]],
         email: ['', Validators.required],
         body: ['', Validators.required],
         nom: ['',[Validators.required,]]
     },);
     this.formgroup.patchValue({
      email: this.user?.email,
      nom: this.user?.nom
    });
     
     }

     get registerFormControl() {
      return this.formgroup.controls;
    }

    contacter(fg : FormGroup){    
      this.submitted=true;
      this.loading = true
        if (this.formgroup.get('objet').valid && this.formgroup.get('email').valid && this.formgroup.get('body').valid 
        && this.formgroup.get('nom').valid ) {        
          this.service.Contacter(fg.value).subscribe((data)=>{  
            this._notificationSvc.success('succès','Message envoyer avec succès !')          
            fg.reset()
            this.loading=false
          }, err => {
            this._notificationSvc.error('Erreur','erreur de connexion !')          
            this.loading=false
          })
          
        }else{
        this._notificationSvc.error('Erreur','merci de renseigner les champs obligatoire !')
        this.loading=false
      }
    }

}
