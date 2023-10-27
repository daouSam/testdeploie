import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage) { }

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
              this.service.presentToast("Message envoyer avec succès")
              fg.reset()
              this.loading=false
          }, err => {
            this.service.presentToastError("erreur de connexion");
            this.loading=false
          })
       
      }else{
        this.service.presentToastError("merci de renseigner les champs obligatoire")
        this.loading=false
      }
    }

}
