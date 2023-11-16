import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-appel-compo',
  templateUrl: './appel-compo.component.html',
  styleUrls: ['./appel-compo.component.css']
})
export class AppelCompoComponent implements OnInit{


  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  count = 6;
  @ViewChild('namebutton') namebutton: ElementRef;

  listAppelOffre : any[] = []
  toutappel :any ="tout"
  listCategorieAppel: any[] = [];
  selectedCategoryAppel: any;
  p: number = 1;
  constructor(private service : ServiceService) { }

  ngOnInit(): void {   
    this.allAppelOffre()
    this.getCategorieAppel()
  }

 
 allAppelOffre(){
   this.service.getAllAppelOffreConfirmerTrue().subscribe({
     next : (data)=>{
       this.listAppelOffre =data
       this.listAppelOffre =this.listAppelOffre.slice().reverse()
     }
   })
 }
 

  onCategoryAppelChange(event: any) {
    this.selectedCategoryAppel = event.target.value;
    if(this.selectedCategoryAppel == this.toutappel){
      this.allAppelOffre();
    }else{
      this.service.getAllAppelOffreByCategorieTrue(this.selectedCategoryAppel).subscribe({
        next :(data)=>{
          this.listAppelOffre  = data         
          this.listAppelOffre  = this.listAppelOffre.slice().reverse()         
        }
      })
    }   
  }

  getCategorieAppel(){
    this.service.getCategorieAppel().subscribe((data)=>{
      this.listCategorieAppel = data
      this.listCategorieAppel = this.listCategorieAppel.slice().reverse()
    })
  }

  cleanHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  countStar(appelOffreId:number, star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
      const newRating = { stars: star };
      this.service.addEvaluationAppelOffre(appelOffreId, newRating).subscribe({
        next: (response) => {
          this.allAppelOffre()
        },
        error: (error) => {
        }
      });

  }
}
