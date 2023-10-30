import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-offreemploi',
  templateUrl: './offreemploi.component.html',
  styleUrls: ['./offreemploi.component.scss']
})
export class OffreemploiComponent implements OnInit {
  selectedStars: number =0;
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
   p: number = 1;
   constructor(private service : ServiceService,private sanitizer: DomSanitizer) { }
 
   ngOnInit(): void {
     this.AllOffreEmploi()
     this.GetCategorie()
     this.GetCategorieAppel()
   }
   
 
  
 AllOffreEmploi(){
   this.service.getAllOffreEmploiConfirmerTrue().subscribe({
     next : (data)=>{
       this.listOffreEmploi =data
       this.listOffreEmploi = this.listOffreEmploi.slice().reverse()
       this.listOffreRecent = data       
       this.listOffreRecent = this.listOffreRecent.slice(-3).reverse()       
     }
   })
 }
 
 AllAppelOffre(){
   this.service.getAllAppelOffre().subscribe({
     next : (data)=>{
       this.listAppelOffre =data
       this.listAppelOffre = this.listAppelOffre.slice().reverse()
       this.listAppelRecent = data
       this.listAppelRecent = this.listAppelRecent.slice(-3).reverse()
     }
   })
 }
 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllOffreEmploi();
   }else{
     this.service.getAllOffreEmploiByCategorieTrue(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listOffreEmploi  = data         
         this.listOffreEmploi  = this.listOffreEmploi.slice().reverse()        
       }
     })
   }  
 }
 onCategoryAppelChange(event: any) {
   this.selectedCategoryAppel = event.target.value;
   if(this.selectedCategoryAppel==this.tout){
     this.AllAppelOffre();
   }else{
     this.service.getAllAppelOffreByCategorie(this.selectedCategoryAppel).subscribe({
       next :(data)=>{
         this.listAppelOffre  = data         
         this.listAppelOffre  = this.listAppelOffre.slice().reverse()         
       }
     })
   } 
   
 }
 GetCategorie(){
   this.service.getCategorie().subscribe((data)=>{
     this.listCategorie = data
     this.listCategorie = this.listCategorie.slice().reverse()
   })
 }

 GetCategorieAppel(){
   this.service.getCategorieAppel().subscribe((data)=>{
     this.listCategorieAppel = data
     this.listCategorieAppel = this.listCategorieAppel.slice().reverse()
   })
 }

 cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

addRating(offreEmploiId: number) {
  if (this.selectedStars !== 0) {
    const newRating = { stars: this.selectedStars };
    this.service.submitEvaluation(offreEmploiId, newRating).subscribe({
      next: (response) => {
        this.AllOffreEmploi();
        this.selectedStars = 0; // Réinitialiser à "0" après l'ajout
      },
      error: (error) => {
      }
    });
  }
}
}
