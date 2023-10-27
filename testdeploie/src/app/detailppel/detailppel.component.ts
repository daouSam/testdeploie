import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailppel',
  templateUrl: './detailppel.component.html',
  styleUrls: ['./detailppel.component.scss']
})
export class DetailppelComponent implements OnInit {

 
  id :any
  list :any
  img1 :any
  loginData :any ="non"
  listAppelOffre: any;
  
   constructor(private service : ServiceService,private route: ActivatedRoute) { }
 
   ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.service.AppelOffreById(this.id).subscribe((data)=>{
      this.list=data
      this.service.getAllAppelOffreByCategorie(this.list?.categorieAppel?.id).subscribe({
        next :(data)=>{
          this.listAppelOffre  = data          
        }
      })
     })     
   }

}
