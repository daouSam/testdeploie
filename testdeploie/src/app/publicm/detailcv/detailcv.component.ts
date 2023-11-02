import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailcv',
  templateUrl: './detailcv.component.html',
  styleUrls: ['./detailcv.component.scss']
})
export class DetailcvComponent implements OnInit {
  id :any
  list :any
  img1 :any
  loginData :any ="non"
  formation :any
  formations :any
  experience :any
  experiences :any
  donne: any;
  donne1: any;
  constructor(private service : ServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.CvById(this.id).subscribe((data)=>{
     this.list=data
     if(this.list !== null){
      this.formation=this.list
      this.formations=this.formation.formations
      this.experiences=this.formation.cvexperiences
        this.formations.forEach((forma: any) => {
          this.donne=forma          
        });
        this.experiences.forEach((forma: any) => {
          this.donne1=forma          
        });
    
      }
    })
    if(localStorage["isLogin"]){
      this.loginData=JSON.parse(localStorage["isLogin"]);
    }
  }


}
