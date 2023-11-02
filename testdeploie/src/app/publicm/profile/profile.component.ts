import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formgroup :any;
  form: any;
  user: any;
  loginData: any;
  role: any;
  donne: any;
  user1 :any | null
list : any
constructor(private service : ServiceService,private router: Router,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user1 = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(this.user1);
    if(this.user !== null){
      this.loginData=this.user
      this.role=this.loginData.roles
        this.role.forEach((role: any) => {
          this.donne=role
        });
    
    }
    this.service.UtilisateurById(this.loginData?.id).subscribe((data)=>{
       this.list=data;       
    })
    this.formgroup = this.formBuilder.group({
      telephone: ['', [Validators.required,]],
      dateNaissance: ['',[Validators.required]],
      localite: ['',[Validators.required]],
      nom: ['',[Validators.required,Validators.minLength(4)]],
      lieuNaissance: ['',[Validators.required,Validators.minLength(4)]],
       email: ['',[Validators.required]],
      login: ['', [Validators.required,Validators.minLength(4)]],    
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
    
  },);
  this.form = this.formBuilder.group({
    telephone: ['', [Validators.required,]],
    description: ['',[Validators.required]],
    site: ['',[ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')] ],
    nom: ['',[Validators.required,Validators.minLength(4)]],
     email: ['',[Validators.required]],
    login: ['', [Validators.required,Validators.minLength(4)]],
    password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
  
  },);
  }
}
