import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id :any
  list :any
  img1 :any
  loginData :any ="non"
  respons : any;
  mail ="id2029937@gmail.com"
  h1 :any ="ex1-pills-1"
  h2 :any ="ex1-pills-2"
  h3 :any ="ex1-pills-3"
  h4 :any ="ex1-pills-4"
  donnee : any;
  activeTabId = 1;
  listOffreEmploi: any;
  isMail: boolean = true

   constructor(
    private service : ServiceService,
    private route: ActivatedRoute) { }
 
    ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.service.OffreEmploiById(this.id).subscribe((data)=>{ 
      this.list=data
      this.list.urlCandidature.includes('http') ? this.isMail = false : this.isMail = true;
      this.service.getAllOffreEmploiByCategorie(this.list.categorie.id).subscribe({
        next :(data)=>{
          this.listOffreEmploi  = data          
        }
      })
     })
     if(localStorage["isLogin"]){
       this.loginData=JSON.parse(localStorage["isLogin"]);
     }
     
  }
  
   
}
