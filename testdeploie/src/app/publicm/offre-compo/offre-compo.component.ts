import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Offresemploi } from 'src/app/models/offre';
import { PagingConfig } from 'src/app/models/paging.config';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-offre-compo',
  templateUrl: './offre-compo.component.html',
  styleUrls: ['./offre-compo.component.css']
})
export class OffreCompoComponent implements OnInit {


  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  count = 6;
  @ViewChild('namebutton') namebutton: ElementRef;


  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  listOffreEmploi = new Array<Offresemploi>();

  pagingConfig: PagingConfig = {} as PagingConfig;


  selectedStars: number = 0;
  selectedCategory: any;
  listCategorie: any;
  tout :any ="tout"
  config: { currentPage: number; itemsPerPage: number; };
  
  constructor(private service : ServiceService) {}
    
  ngOnInit(): void {
    this.allOffreEmploi()
    this.GetCategorie() 
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  
  allOffreEmploi(){
    this.service.getAllOffreEmploiConfirmerTrue().subscribe({
      next : (data) => {
        this.listOffreEmploi = data
        this.listOffreEmploi = this.listOffreEmploi.slice().reverse()
        this.pagingConfig.totalItems = data.length;   
      }
    })
  }


  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.allOffreEmploi();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.allOffreEmploi();
  }


  
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    if(this.selectedCategory == this.tout){
      this.allOffreEmploi();
    }else{
      this.service.getAllOffreEmploiByCategorieTrue(this.selectedCategory).subscribe({
        next :(data)=>{
          this.listOffreEmploi  = data         
          this.listOffreEmploi  = this.listOffreEmploi.slice().reverse()        
        }
      })
    }  
  }

  GetCategorie(){
    this.service.getCategorie().subscribe((data) =>{
      this.listCategorie = data
      this.listCategorie = this.listCategorie.slice().reverse()
    })
  }

  cleanHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
  countStar(offreEmploiId:number, star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
    const newRating = { stars: star };
    console.log(newRating);
    
    this.service.submitEvaluation(offreEmploiId, newRating).subscribe({
      next: (response) => {
        console.log('Value of star ok', star);
        this.allOffreEmploi();
        
        this.selectedStars = 0;
      },
      error: (error) => {
        console.log('Value of star error', star);
      }
    });
  }
}
