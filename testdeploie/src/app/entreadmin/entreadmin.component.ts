import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-entreadmin',
  templateUrl: './entreadmin.component.html',
  styleUrls: ['./entreadmin.component.scss']
})
export class EntreadminComponent implements OnInit {
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
   p: number = 1;
   loginData: any;
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {
     
     this.AllEntreprise()
    
     this.GetCategorie()
     this.GetCategorieAppel()
     const user: any | null = sessionStorage.getItem('isLogin');
     this.user = JSON.parse(user);
     if(this.user !== null){
       this.loginData=this.user
       console.log(this.loginData)
       this.service.EntrepriseByUtilisateur(this.loginData.id).subscribe((data)=>{
          this.list =data
       })
     }
   }
   
 
 
 AllEntreprise(){
   this.service.AllEntreprise().subscribe({
     next : (data)=>{
       this.listEntreprise =data
       this.listOffreRecent =data
       console.log(this.listEntreprise);
       
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllEntreprise();
   }else{
     this.service.getAllOffreEntrepriseByCategorie(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listEntreprise  = data
         console.log(this.listEntreprise);
         
       }
     })
   }

 }

 GetCategorie(){
   this.service.getCategorieEntreprise().subscribe((data)=>{
     this.listCategorie=data
     console.log(this.listCategorie)
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
 DeleteEntreprise(id: any) {
   
  if(confirm('êtes vous sûr de supprimer ?'))
  this.service.deleteAppelOffre(id).subscribe((data) => {
     this.ngOnInit()
   
  })
}
ConfirmerEntrepriseToTrue(id :any){
 if(confirm('êtes vous sûr de Confirmer ?'))
 this.service.ConfirmerEntrepriseToTrue(id).subscribe((data)=>{
   this.ngOnInit()
   this.AllEntreprise()
 })
}

}
