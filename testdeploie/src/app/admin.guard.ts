import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role : any 
  donne :any
  user : any 
  constructor(
    private router : Router,
    
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLog()){
        return true
      }
      return this.router.navigate(['/accueil']);
  }

  isLog(): boolean{
    const user: any | null  = sessionStorage.getItem('isLogin')
    this.user = JSON.parse(user);
    if(this.user!==null){
    this.role=this.user?.roles
    this.role.forEach((role: any) => {
      this.donne=role
    });
  }
    if(this.donne =="ADMIN" ){
      return true
    }else {
      return false
    }
  }
}
