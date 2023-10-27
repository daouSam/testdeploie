import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  formgroup :any;
  donne :any
  type : any ="USER"
  styl : boolean =false
  submitted = false;
  role : any[] =[{"id" : 1}]
  form: any;
  cand : any ="assets/img/utilisateur (1).png"
  empl: any ="assets/img/job-promotion (1).png"
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {

    this.formgroup = this.formBuilder.group({
      telephone1: ['', [Validators.required,]],
      telephone2: ['', [Validators.required,]],
  
      localite: ['',[Validators.required]],
      nom: ['',[Validators.required,Validators.minLength(4)]],
   
       email: ['',[Validators.required]],

      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
    
  },);
  }
  get f() {
    return this.formgroup.controls;
  }
  get fa() {
    return this.form.controls;
  }
  ajouterUtilisateur(fg : FormGroup){
    this.submitted=true;
    let styl : boolean =false

    if (this.formgroup.valid) {
      
      styl=true
    fg.value.roles=this.role
 
    this.service.addUtilisateur(fg.value).subscribe((data)=>{
      if(data){        
        this.service.presentToast("Inscription effectuer avec succès");
        location.replace("/inscription");
      }
    }, err => {
      this.service.presentToastError(err.error.message);
    })
    }else{
      this.service.presentToastError("merci de renseigner tous les champs")
    }
  }
  
  employeur(){
 this.role=[{"id" : 1}]
 this.cand ="assets/img/utilisateur (2).png"
 this.empl ="assets/img/job-promotion.png"
  }
  candidat(){
    this.role=[{"id" : 2}]
    this.cand ="assets/img/utilisateur (1).png"
    this.empl ="assets/img/job-promotion (1).png"
  }
}
