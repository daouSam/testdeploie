import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  listEntreprise : any
  list : any
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
   p: number = 1;
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {
     
     this.AllEntreprise()
     this.AllAppelOffre()
     this.GetCategorie()
     this.GetCategorieAppel()
     const user: any | null = sessionStorage.getItem('isLogin');
     this.user = JSON.parse(user);
     if(this.user !== null){
       this.loginData=this.user
       this.service.EntrepriseByUtilisateur(this.loginData.id).subscribe((data)=>{
          this.list =data
       })
     }
   }
   
 
 
 AllEntreprise(){
   this.service.AllEntrepriseByConfirmerTrue().subscribe({
     next : (data)=>{
       this.listEntreprise =data       
     }
   })
 }
 
 AllAppelOffre(){
   this.service.getAllAppelOffre().subscribe({
     next : (data)=>{
       this.listAppelOffre =data
       this.listAppelRecent = data
     }
   })
 }
 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllEntreprise();
   }else{
     this.service.getAllOffreEntrepriseByCategorieTrue(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listEntreprise  = data         
       }
     })
   }

 }

 GetCategorie(){
   this.service.getCategorieEntreprise().subscribe((data)=>{
     this.listCategorie=data
   })
 }
 GetCategorieAppel(){
   this.service.getCategorieEntreprise().subscribe((data)=>{
     this.listCategorieAppel=data
   })
 }
 logOut(){
   if(confirm('êtes-vous sûr de vouloir vous déconnecter ?'))
   sessionStorage.removeItem('isLogin');
   sessionStorage.removeItem('TOKEN');   
 }
}
