import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-recent-appel',
  templateUrl: './recent-appel.component.html',
  styleUrls: ['./recent-appel.component.css']
})
export class RecentAppelComponent implements OnInit{
  listAppelRecent: any;

  constructor(private service : ServiceService){}

  ngOnInit(): void {
    this.allAppelOffre()
  }

  allAppelOffre(){
    this.service.getAllAppelOffreConfirmerTrue().subscribe({
      next : (data)=>{
        this.listAppelRecent = data
        this.listAppelRecent = (this.listAppelRecent || []).slice().reverse().slice(0, 3);
      }
    })
  }



}
