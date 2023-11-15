import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  donne : any
  private user: any;
  title = "D'Coders Angular Tutorials";
  isLoading = false;
  constructor(
    private service : ServiceService,
    private router: Router,
    protected _notificationSvc: NotificationService) { }

  ngOnInit(): void {
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.router.navigateByUrl('/');
    }
  }

  connexion(form: NgForm){
    this._notificationSvc.error("Erreur","merci de renseigner tous les champs")
    if(form.status=="INVALID"){
      this._notificationSvc.error("Erreur","merci de renseigner tous les champs")
    }else{
      this.service.login(form.value).subscribe({
        next : (user)=>{
          sessionStorage.setItem('isLogin', JSON.stringify(user));
          sessionStorage.setItem('TOKEN', JSON.stringify(user.accessToken));
          location.replace("/accueil");
        }, error: (error: any) => {
          console.log(error);
          
          if (error.status === 0) {
          this._notificationSvc.error("Erreur","Impossible de se connecter au server, veuillez réessayer plus tard")
        } else {
          this._notificationSvc.error("Erreur", `${error?.error?.message}`)
        }
      }
    
    })
  }
  }


}
