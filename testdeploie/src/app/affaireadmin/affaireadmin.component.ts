import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-affaireadmin',
  templateUrl: './affaireadmin.component.html',
  styleUrls: ['./affaireadmin.component.scss']
})
export class AffaireadminComponent implements OnInit {

  listAffaire : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listAffaireRecent: any;
   listAppelRecent: any;
   activeImage : string | undefined
   carousel : any
   p: number = 1;
   constructor(private service : ServiceService,private sanitizer: DomSanitizer) { }
 
   ngOnInit(): void {
     this.AllAffaire()
 
     this.GetCategorie()  
 
   }
   
 
  
 AllAffaire(){
   this.service.AllAffaire().subscribe({
     next : (data)=>{
       this.listAffaire =data
       this.listAffaireRecent = data
       
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllAffaire();
   }else{
     this.service.getAffaireByCategorie(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listAffaire  = data         
       }
     })
   }
   
 
   
 }

 GetCategorie(){
   this.service.getCategorieAffaire().subscribe((data)=>{
     this.listCategorie=data
   })
 }

 DeleteConfirmerAffaire(id: any) {
   
  if(confirm('êtes vous sûr de supprimer ?'))
  this.service.deleteAppelOffre(id).subscribe((data) => {
     this.ngOnInit()
   
  })
}
ConfirmerAffaire(id :any){
 if(confirm('êtes vous sûr de Confirmer ?'))
 this.service.confirmerAffaire(id).subscribe((data)=>{
   this.ngOnInit()
   this.AllAffaire()
 })
}
cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
}
