import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../notifications/notification.service';
import { ConfirmetionService } from '../../confirmation/confirmation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;

  isLoading: boolean = false;
  public showPassword = false;

  connexionemail(form2: NgForm) {    
    const btnclosemail = document.getElementById('btnclosemail');
    if(form2.status=="INVALID"){
      this._notificationSvc.error('Erreur','merci de renseigner le champ email !')
    }else{
      this.isLoading = true
      btnclosemail?.click()
      this.service.forgotPassd(form2.value).subscribe(        
        (response) => {
          this.isLoading = false
        },
        (error) => {
          this.isLoading = false
          form2.reset()
          if (error?.status == 200) {
            this._notificationSvc.success('SUCCES','Verifier votre email, nous avons ré-initialiser votre mot de passe.')            
          }else {
            this._notificationSvc.error('ERREUR',`${error.error}`)
          }
        }
      )
    }
  }
  forgotPassd() {
    const btnclose = document.getElementById('btnclose');
    const btnforgot = document.getElementById('btnforgot');   
    btnclose?.addEventListener('click', () => {});
    setTimeout(() => {
        btnclose?.click();
        setTimeout(() => {
            btnforgot?.click();
        }, 1000);
    });
  }

  texts: string[] = ['Barragnini', 'Warrignini'];
  currentText: string = '';
  title = "D'Coders Angular Tutorials"; 
  user: any;
  loginData: any;
  role: any;
  donne: any;
  user1 :any | null
  prendre : any

  constructor(
    private service : ServiceService,
    private router: Router,
    protected _notificationSvc: NotificationService,
    private confirmationService: ConfirmetionService) { }
  
    ngOnInit(): void {
      this.currentText=this.texts[1]
      this.rotateTexts();
      this.user1 = sessionStorage.getItem('isLogin');
      this.user = JSON.parse(this.user1);
      if(this.user !== null){
        this.loginData=this.user
        this.role=this.loginData.roles
          this.role.forEach((role: any) => {
            this.donne=role          
          });
      
      }
    }
   
    connexion(form: NgForm){
      const btnclose = document.getElementById('btnclose');
      if(form.status=="INVALID"){
        this._notificationSvc.error('Erreur','merci de renseigner les champs !')
      }else{
        this.service.login(form.value).subscribe({
          next : (user)=>{
            console.log(user.id);
            console.log(user);
            
            if (user.id === null) {
              this._notificationSvc.warning('ATTENTION','Vous n\'êtes pas autorisé à acceder à cet site !')
              form.reset()
              btnclose?.click()
              return
            }
            sessionStorage.setItem('isLogin', JSON.stringify(user));
            sessionStorage.setItem('TOKEN', JSON.stringify(user.accessToken));
            form.reset()
            btnclose?.click()
            this.ngOnInit()
          }, error: (error: any) => {
            if (error.status === 0) {
              this._notificationSvc.error('Erreur','Impossible de se connecter au server, veuillez réessayer plus tard !')
            } else {
              this._notificationSvc.error('Erreur',`${error?.error?.message}, mot de passe | email incorrect `)
            }
        }
      
      })
    }
  }
  rotateTexts() {
    let index = 0;
    setInterval(() => {
      this.currentText = this.texts[index];
      index = (index + 1) % this.texts.length;
    }, 2000);
  }

  logOut(){
      this.confirmationService
        .confirmDialog({
          title: 'Déconnexion',
          message: 'êtes-vous sûr de vouloir vous déconnecter ?',
          confirmCaption: 'Oui',
          cancelCaption: 'Non',
        })
        .subscribe((yes: boolean) => {   
          if (yes) {
            sessionStorage.removeItem('isLogin');
            sessionStorage.removeItem('TOKEN');
            this.ngOnInit()
        }
      })   
    }

    togglePasswordVisibility() {
      const passd: Element = document.getElementById('id_password')!
      const type = passd.getAttribute('type') === 'password' ? 'text' : 'password';
      passd.setAttribute('type', type);
      this.showPassword = !this.showPassword
    }
  
  }





