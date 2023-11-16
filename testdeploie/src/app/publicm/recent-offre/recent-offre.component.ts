import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-recent-offre',
  templateUrl: './recent-offre.component.html',
  styleUrls: ['./recent-offre.component.css']
})
export class RecentOffreComponent implements OnInit {
  listOffreRecent: any;

  constructor(private service : ServiceService,){}

  ngOnInit(): void {
    this.allOffreEmploi()
  }

  allOffreEmploi(){
    this.service.getAllOffreEmploiConfirmerTrue().subscribe({
      next : (data)=>{
        this.listOffreRecent = data
        this.listOffreRecent = (this.listOffreRecent || []).slice().reverse().slice(0, 3);
      }
    })
  }



}
