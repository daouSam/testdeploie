import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-appelofre',
  templateUrl: './appelofre.component.html',
  styleUrls: ['./appelofre.component.scss']
})
export class AppelofreComponent implements OnInit {
  selectedStarsAppelOffre: number =0;
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
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {   
     this.AllAppelOffre()
     this.GetCategorie()
     this.GetCategorieAppel()
   }
   
 


 
 AllAppelOffre(){
   this.service.getAllAppelOffreConfirmerTrue().subscribe({
     next : (data)=>{
       this.listAppelOffre =data
       this.listAppelOffre =this.listAppelOffre.slice().reverse()
       this.listAppelRecent = data
       this.listAppelRecent = (this.listAppelRecent || []).slice().reverse().slice(0, 3);
     }
   })
 }
 

 onCategoryAppelChange(event: any) {
   this.selectedCategoryAppel = event.target.value;
   if(this.selectedCategoryAppel == this.tout){
     this.AllAppelOffre();
   }else{
     this.service.getAllAppelOffreByCategorieTrue(this.selectedCategoryAppel).subscribe({
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
addRatingAppelOffre(appelOffreId: number) {
  if (this.selectedStarsAppelOffre !== 0) {
    const newRating = { stars: this.selectedStarsAppelOffre };
    this.service.addEvaluationAppelOffre(appelOffreId, newRating).subscribe({
      next: (response) => {
        this.AllAppelOffre()
        this.selectedStarsAppelOffre = 0; // Réinitialiser à "0" après l'ajout
      },
      error: (error) => {
      }
    });
  }
}
}
