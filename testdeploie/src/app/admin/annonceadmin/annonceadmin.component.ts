import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-annonceadmin',
  templateUrl: './annonceadmin.component.html',
  styleUrls: ['./annonceadmin.component.scss']
})
export class AnnonceadminComponent implements OnInit {

  listAnnonce : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listAffaireRecent: any;
   listAppelRecent: any;
   p: number = 1;
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {
     this.AllAffaire() 
     this.GetCategorie() 
   }
   
 
  
 AllAffaire(){
   this.service.AllAnnonce().subscribe({
     next : (data)=>{
       this.listAnnonce = data
       this.listAnnonce = this.listAnnonce.slice().reverse()
       this.listAffaireRecent = data       
       this.listAffaireRecent = (this.listAffaireRecent || []).slice().reverse().slice(0, 3);      
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllAffaire();
   }else{
     this.service.getAnnonceByCategorie(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listAnnonce  = data
         this.listAnnonce  = this.listAnnonce.slice().reverse()
       }
     })
   }
 }

 GetCategorie(){
   this.service.getCategorieAnnonce().subscribe((data)=>{
     this.listCategorie = data
     this.listCategorie = this.listCategorie.slice().reverse()
   })
 }

 ConfirmerAnnonceToTrueToTrue(id :any){
  if(confirm('êtes vous sûr de Confirmer ?'))
  this.service.ConfirmerAnnonceToTrue(id).subscribe((data)=>{
    this.ngOnInit()
    this.AllAffaire()
  })
 }
 cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
}
