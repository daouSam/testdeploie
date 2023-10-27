import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  texts: string[] = ['Barragnini', 'Warrignini'];
  currentText: string = '';
  title = "D'Coders Angular Tutorials";
  isLoading = false;
  
  user: any;
  loginData: any;
  role: any;
  donne: any;
  user1 :any | null
  prendre : any
constructor(private service : ServiceService,private router: Router,) { }

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
  rotateTexts() {
    let index = 0;
    setInterval(() => {
      this.currentText = this.texts[index];
      index = (index + 1) % this.texts.length;
    }, 2000);
  }
  logOut(){
    if(confirm('êtes-vous sûr de vouloir vous déconnecter ?'))
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('TOKEN');
   
    location.replace("/accueil")
  }

}




