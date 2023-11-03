import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  listOffreEmploi : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listOffreRecent: any;
   listAppelRecent: any;
    user: any;
  loginData: any;
  isToggled: boolean = false;
  texts: string[] = ['Barragnini', 'Warrignini'];
  currentText: string = '';
  
  constructor(private service : ServiceService,
    private router: Router,
    private confirmationService: ConfirmetionService) { }
 
  ngOnInit(): void {
    this.currentText=this.texts[1]
    this.rotateTexts();
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.loginData=this.user
    }
  
  }
  rotateTexts() {
    let index = 0;
    setInterval(() => {
      this.currentText = this.texts[index];
      index = (index + 1) % this.texts.length;
    }, 2000);
  }
 
  toggleSidebar() {
    this.isToggled = !this.isToggled;
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
        this.router.navigate(["/home/accueil"])
        }
      }) 
  }




  
 

  
  
  

}
