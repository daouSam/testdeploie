import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailaff',
  templateUrl: './detailaff.component.html',
  styleUrls: ['./detailaff.component.scss']
})
export class DetailaffComponent implements OnInit {


  id :any
  list :any
  img1 :any
  loginData :any ="non"
  respons : any;
  mail ="id2029937@gmail.com"

  donnee : any;
  activeTabId = 1;
  ListAffaire: any;
   constructor(private service : ServiceService,private route: ActivatedRoute) { }
 
   ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.service.AffaireById(this.id).subscribe((data)=>{
 
      this.list=data
      console.log(this.list)
      this.service.getAffaireByCategorie(this.list?.categorieAffaire?.id).subscribe({
        next :(data)=>{
          this.ListAffaire  = data
          console.log(this.ListAffaire);
          
        }
      })
     })
     if(localStorage["isLogin"]){
       this.loginData=JSON.parse(localStorage["isLogin"]);
     }
     
   }
}
