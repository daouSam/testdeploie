import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Changpassd } from 'src/app/models/Changpassd';
import { OldPwdValidators } from 'src/app/models/old-pwd.validators';
import { NotificationService } from 'src/app/notifications/notification.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-email-user',
  templateUrl: './email-user.component.html',
  styleUrls: ['./email-user.component.css']
})
export class EmailUserComponent implements OnInit{

  form1: FormGroup; 
  user: any;
  self = this;
  isLoading: boolean = false
  
  constructor(
    fb: FormBuilder, 
    private services: ServiceService,
    protected _notificationSvc: NotificationService,
    private router: Router){
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }  
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('isLogin')!)
  }

  changePassd() {
    let changepassd: Changpassd = {
      email: this.user?.email,
      oldpassword: this.form1.value['oldPwd'],
      newpassword: this.form1.value['newPwd'],
      confirmpassword: this.form1.value['confirmPwd']
    }
    if (this.user == null) {
      this._notificationSvc.warning('ATTENTION', `vous devez vous connecter d'abord pour changer votre mot de passe !`)    
      return
    }
    this.services.changePassword(changepassd).subscribe({
      error:(error: HttpErrorResponse ) => {                
        if (error.status == 200) {
          this.form1.reset()
          this._notificationSvc.success('SUCCES', `${error.error.text} !`)
          this.router.navigate(['/home/acceuil'])
        } else {
          this._notificationSvc.error('ERREUR', `${error.error} !`)          
        }
      }
    })
  }
  

  get oldPwd(){
    return this.form1.get('oldPwd');
  }

   get newPwd(){
    return this.form1.get('newPwd');
  }

   get confirmPwd(){
    return this.form1.get('confirmPwd');
  }
}
