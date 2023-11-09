import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../notifications/notification.service';
import { CountryISO, SearchCountryField } from '@kovach/ngx-intl-tel-input';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Mali];


  formgroup :any;
  donne :any
  type : any ="USER"
  styl : boolean =false
  submitted = false;
  role : any[] =[{"id" : 1}]
  form: any;
  cand : any ="assets/img/utilisateur (1).png"
  empl: any ="assets/img/job-promotion (1).png"
  telephone2: string|number|null;
 telephone1: string|number|null;
  constructor(
    private service : ServiceService,
    public formBuilder: FormBuilder,
    protected _notificationSvc: NotificationService) {}

  ngOnInit(): void {
      this.formgroup = this.formBuilder.group({
      telephone1: ['', [Validators.required,]],
      telephone2: [''],  
      localite: ['',[Validators.required]],
      nom: ['',[Validators.required,Validators.minLength(4)]],   
      email: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]]    
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
    let userSigUp: SigInUser = {
      email: fg.value.email,
      localite: fg.value.localite,
      nom: fg.value.nom,
      password: fg.value.password,
      telephone1: fg.value.telephone1.e164Number,
      telephone2: fg.value.telephone2?.e164Number
    }
    console.log(fg.value);
    console.log(userSigUp);
    let styl : boolean =false

 if (this.formgroup.valid) {
   
   styl=true
 fg.value.roles=this.role
 
 this.service.addUtilisateur(userSigUp).subscribe((data)=>{
   if(data){        
     this._notificationSvc.success("succès","Inscription effectuer avec succès");
     location.replace("/inscription");
   }
 }, err => {
   this._notificationSvc.error("Erreur",`${err.error.message} !`);
 })
 }else{
   this._notificationSvc.error("Erreur","merci de renseigner tous les champs");
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

interface SigInUser {
  email: string
  localite: string
  nom: string
  password: string
  telephone1: string
  telephone2?: string
}