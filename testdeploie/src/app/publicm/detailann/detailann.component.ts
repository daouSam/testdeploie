import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailann',
  templateUrl: './detailann.component.html',
  styleUrls: ['./detailann.component.scss']
})
export class DetailannComponent implements OnInit {

  id :any
  list :any
  img1 :any
  loginData :any ="non"
  respons : any;
  mail ="id2029937@gmail.com"

  donnee : any;
  activeTabId = 1;
  ListAnnonce: any;
   constructor(private service : ServiceService,private route: ActivatedRoute) { }
 
   ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.service.AnnonceById(this.id).subscribe((data)=>{ 
      this.list=data
      this.service.getAnnonceByCategorie(this.list?.categorieAnnonce?.id).subscribe({
        next :(data)=>{
          this.ListAnnonce  = data          
        }
      })
     })
     if(localStorage["isLogin"]){
       this.loginData=JSON.parse(localStorage["isLogin"]);
     }
     
   }

}
