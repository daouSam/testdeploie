import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../notifications/notification.service';
// import { CountryISO, SearchCountryField } from '@kovach/ngx-intl-tel-input';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // preferredCountries: CountryISO[] = [CountryISO.Mali];


  formgroup: FormGroup;
  donne :any
  type : any ="USER"
  styl : boolean = false
  submitted = false;
  role : any[] =[{"id" : 1}]
  form: any;
  cand : any ="assets/img/utilisateur (1).png"
  empl: any ="assets/img/job-promotion (1).png"
  telephone2: string|number|null;
  telephone1: string|number|null;
  
  constructor(
    private service : ServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    protected _notificationSvc: NotificationService) {}

  ngOnInit(): void {
      this.formgroup = this.formBuilder.group({
      'telephone1': ['', Validators.required],
      'telephone2': [''],  
      'localite': ['',Validators.required],
      'nom': ['',[Validators.required,Validators.minLength(4)]],   
      'email': ['',[Validators.required]],
      'password': ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]]    
  });

  }
  get f() {
    return this.formgroup.controls;
  }
  
  ajouterUtilisateur(){
    
    this.submitted = true;
    let userSigUp: SigInUser = {
      email: this.formgroup.value.email,
      localite: this.formgroup.value.localite,
      nom: this.formgroup.value.nom,
      password: this.formgroup.value.password,
      telephone1: this.formgroup.value.telephone1,
      telephone2: this.formgroup.value.telephone2,
      roles: this.role
    }
    let styl : boolean = false     
    styl = true
    this.formgroup.value.roles = this.role    
    this.service.addUtilisateur(userSigUp).subscribe((data)=>{    
    this._notificationSvc.success("succès","Inscription effectuer avec succès");
    this.router.navigate(["/home/"]); 
    }, err => {
      this._notificationSvc.error("Erreur",`${err.error.message} !`);
    })      

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
  roles?: any
}