import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailappel',
  templateUrl: './detailappel.component.html',
  styleUrls: ['./detailappel.component.scss']
})
export class DetailappelComponent implements OnInit {

  id :any
  list :any
  img1 :any
  loginData :any ="non"
  respons : any;
  mail ="id2029937@gmail.com"
  
  donnee : any;
   constructor(private service : ServiceService,private route: ActivatedRoute) { }
 
   ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.service.AppelOffreById(this.id).subscribe((data)=>{
      this.list=data
     })
     if(localStorage["isLogin"]){
       this.loginData=JSON.parse(localStorage["isLogin"]);
     }
     
   }
}
