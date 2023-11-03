import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listOffreEmploi : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listOffreRecent: any;
   listAppelRecent: any;
    user: any;
  loginData: any;
  isToggled: boolean = false;
  p: number = 1;
  
  constructor(private service : ServiceService,
    private sanitizer: DomSanitizer,
    private confirmationService: ConfirmetionService) { }
 
  ngOnInit(): void {
    
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.loginData=this.user
    }
    this.AllOffreEmploi()
    this.AllAppelOffre()
    this.GetCategorie()
    this.GetCategorieAppel()
  }
  
 
  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }


  
 
  AllOffreEmploi(){
    this.service.getAllOffreEmploi().subscribe({
      next : (data)=>{
        this.listOffreEmploi = data
        this.listOffreEmploi = this.listOffreEmploi.slice().reserve()
        this.listOffreRecent = (this.listOffreRecent || []).slice().reverse().slice(0, 3)        
      }
    })
  }
  
  AllAppelOffre(){
    this.service.getAllAppelOffre().subscribe({
      next : (data)=>{
        this.listAppelOffre = data
        this.listAppelOffre = this.listAppelOffre.slice().reserve()
        this.listAppelRecent = (this.listAppelRecent || []).slice().reverse().slice(0, 3)
      }
    })
  }
  
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    if(this.selectedCategory==this.tout){
      this.AllOffreEmploi();
    }else{
      this.service.getAllOffreEmploiByCategorie(this.selectedCategory).subscribe({
        next :(data)=>{
          this.listOffreEmploi  = data          
          this.listOffreEmploi  = this.listOffreEmploi.slice().reverse()          
        }
      })
    }
  }
  onCategoryAppelChange(event: any) {
    this.selectedCategoryAppel = event.target.value;
    if(this.selectedCategoryAppel==this.tout){
      this.AllAppelOffre();
    }else{
      this.service.getAllAppelOffreByCategorie(this.selectedCategoryAppel).subscribe({
        next :(data)=>{
          this.listAppelOffre  = data      
          this.listAppelOffre = this.listAppelOffre.slice().reserve()
        }
      })
    }
  }
  GetCategorie(){
    this.service.getCategorie().subscribe((data)=>{
      this.listCategorie=data
    })
  }
  GetCategorieAppel(){
    this.service.getCategorieAppel().subscribe((data)=>{
      this.listCategorieAppel=data
    })
  }
  DeleteOffreEmploi(id: any) {
    this.confirmationService
    .confirmDialog({
      title: 'Suppprimer',
      message: 'êtes vous sûr de supprimer ?',
      confirmCaption: 'Supprimer',
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {   
      if (yes) {
        this.service.deleteOffreEmploi(id).subscribe((data) => {
           this.ngOnInit()
           this.AllOffreEmploi()
        })
      }
    })
 }
 DeleteAppelOffre(id: any) {
  this.confirmationService
  .confirmDialog({
    title: 'Suppprimer',
    message: 'êtes vous sûr de supprimer ?',
    confirmCaption: 'Supprimer',
    cancelCaption: 'Annuler',
  })
  .subscribe((yes: boolean) => {   
    if (yes) {
      this.service.deleteAppelOffre(id).subscribe((data) => {
         this.ngOnInit()
         this.AllAppelOffre();
      })      
    }
  })
 }
 ConfirmerOffreEmploiToTrue(id :any){
  this.confirmationService
  .confirmDialog({
    title: 'Retirer',
    message: 'êtes vous sûr de Retirer ?',
    confirmCaption: 'Retirer',
    cancelCaption: 'Annuler',
  })
  .subscribe((yes: boolean) => {   
    if (yes) {
      this.service.ConfirmerOffreEmploiToTrue(id).subscribe((data)=>{
        this.ngOnInit()
        this.AllOffreEmploi()
      })      
    }
  })
 }
 ConfirmerAppelOffreToTrue(id :any){
  this.confirmationService
  .confirmDialog({
    title: 'Confirmation',
    message: 'êtes vous sûr de Confirmer ?',
    confirmCaption: 'Confirmer',
    cancelCaption: 'Annuler',
  })
  .subscribe((yes: boolean) => {   
    if (yes) {
      this.service.ConfirmerAppelOffreToTrue(id).subscribe((data)=>{
        this.ngOnInit()
        this.AllAppelOffre();
      })      
    }
  })
 }

 cleanHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
}
