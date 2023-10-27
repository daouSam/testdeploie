import { Component, OnInit } from '@angular/core';
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
  constructor(private service : ServiceService,) { }
 
  ngOnInit(): void {
    this.currentText=this.texts[1]
    this.rotateTexts();
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    console.log(this.user);
    if (this.user !== null) {
      this.loginData=this.user
      console.log(this.user);
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
    if(confirm('êtes-vous sûr de vouloir vous déconnecter ?'))
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('TOKEN');
   
    location.replace("/accueil")
  }


  
 

  
  
  

}
