import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';
import { NotificationService } from 'src/app/notifications/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns = ['logo', 'nomOffre', 'dateCreation', 'nomEntreprise','confirmer'];
  displayedColumnsAppel = ['logo', 'titre','ville', 'nomEntreprise','confirmer'];
  
  listOffreEmploi : any

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  dataSourceAppel = new MatTableDataSource<any>([]);
  @ViewChild('paginatorPageSizeAppel') paginatorPageSizeAppel: MatPaginator;

  pageSizes = [3, 5, 7];
  
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
    private confirmationService: ConfirmetionService,
    protected _notificationSvc: NotificationService) { }
 
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorPageSize;
    this.dataSourceAppel.paginator = this.paginatorPageSizeAppel;
  }
 
  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }


  
 
  AllOffreEmploi(){
        this.service.getAllOffreEmploi().subscribe(
      data =>{
        this.listOffreEmploi = data
        this.dataSource = new MatTableDataSource(this.listOffreEmploi)
        this.dataSource.paginator = this.paginatorPageSize;      
        this.listOffreRecent = (this.listOffreRecent || []).slice().reverse().slice(0, 3)        
      
    })
  }
  
  AllAppelOffre(){
    this.service.getAllAppelOffre().subscribe({
      next : (data)=>{
        this.listAppelOffre = data
        this.dataSourceAppel = new MatTableDataSource(this.listAppelOffre)
        this.dataSourceAppel.paginator = this.paginatorPageSizeAppel; 
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
          this.dataSource = new MatTableDataSource(this.listOffreEmploi)
          this.dataSource.paginator = this.paginatorPageSize;          
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
          this.dataSourceAppel = new MatTableDataSource(this.listAppelOffre)
          this.dataSourceAppel.paginator = this.paginatorPageSizeAppel;
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
          this._notificationSvc.success("succès","effre supprimer avec succès !")
          this.ngOnInit()
          this.AllOffreEmploi()
        }, error => this._notificationSvc.error('ERREUR', "erreur lors de la suppression de l'offre"))
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
          this._notificationSvc.success("SUCCES","appel offre supprimer avec succès !")
          this.ngOnInit()
          this.AllAppelOffre();
        }, error => this._notificationSvc.error('ERREUR', "erreur lors de la suppression de l'appel d'offre"))      
      }
    })
  }
  
  ConfirmerOffreEmploiToTrue(id :any, titre: string){
    this.confirmationService
    .confirmDialog({
      title: titre,
      message: `êtes vous sûr de ${titre} ?`,
      confirmCaption: `${titre}`,
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {   
      if (yes) {
        this.service.ConfirmerOffreEmploiToTrue(id).subscribe((data)=>{
          this._notificationSvc.success("SUCCES",`Offre ${titre} avec succès !`)
          this.ngOnInit()
          this.AllOffreEmploi()
        }, error => this._notificationSvc.error('ERREUR', `erreur lors de l'operation de ${titre}`))    
      }
    })
  }

  ConfirmerAppelOffreToTrue(id :any, titre: string){
    this.confirmationService
    .confirmDialog({
      title: `${titre}`,
      message: `êtes vous sûr de ${titre} ?`,
      confirmCaption: `${titre}`,
      cancelCaption: 'Annuler',
    })
    .subscribe((yes: boolean) => {   
      if (yes) {
        this.service.ConfirmerAppelOffreToTrue(id).subscribe((data)=>{
          this._notificationSvc.success("SUCCES",`Appel d'offre ${titre} avec succès !`)
          this.ngOnInit()
          this.AllAppelOffre();  
        }, error => this._notificationSvc.error('ERREUR', `erreur lors de l'operation de ${titre}`))    
    }
  })
 }

 cleanHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
}
export interface Element {
  logo: string;
  nomOffre: number;
  localisation: number;
  dateCreation: string;
  nomEntreprise: number;
  confirmer: string;
}
