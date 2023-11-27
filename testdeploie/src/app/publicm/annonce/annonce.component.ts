import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  count = 6;
  @ViewChild('namebutton') namebutton: ElementRef;

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
   constructor(private service : ServiceService,private sanitizer: DomSanitizer) { }
 
   ngOnInit(): void {
     this.Annonce() 
     this.GetCategorie() 
   }
   
 
  
 Annonce(){
   this.service.AllAnnonceByConfirmerTrue().subscribe({
     next : (data)=>{
       this.listAnnonce =data
       this.listAffaireRecent = data       
       this.listAffaireRecent = this.listAffaireRecent.slice().reverse()       
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.Annonce();
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
 cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
countStar(affaireId:number, star: number) {
  this.selectedValue = star;
  console.log('Value of star', star);
  const newRating = { stars: star };
    this.service.addEvaluationAnnonce(affaireId, newRating).subscribe({
      next: (response) => {
        this.Annonce()
        this.selectedValue = 0; // Réinitialiser à "0" après l'ajout
      },
      error: (error) => {
      }
    });
  }
}
