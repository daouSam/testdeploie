import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  constructor(private service : ServiceService,private router: Router,) { }

  ngOnInit(): void {
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.router.navigateByUrl('/');
    }
  }

  connexion(form: NgForm){
    if(form.status=="INVALID"){
      this.service.presentToastError("merci de renseigner tous les champs")
    }else{
    this.service.login(form.value).subscribe({
      next : (user)=>{
        sessionStorage.setItem('isLogin', JSON.stringify(user));
          sessionStorage.setItem('TOKEN', JSON.stringify(user.accessToken));
          location.replace("/accueil");
      }, error: (error: any) => {
        if (error.status === 0) {
          this.service.presentToastError("Impossible de se connecter au server, veuillez réessayer plus tard");
        } else {
          this.service.presentToastError(error?.error?.message);
        }
      }
    
    })
  }
  }


}
