import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../notifications/notification.service';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';
import { ActivatedRoute } from '@angular/router';


interface OffreEmploi {
  id: number;
  nomOffre: string;
  averageRating: number;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {
  product: any;
  loading : boolean=false
  user: any;
  loginData: any;
  data :any
  starsArray = Array;
  form: any;
  images: string[] = ['assets/img/OFFRES-EMPLOI.jpg','assets/img/Group 15.png'];
  ra :any
  currentImage: string = 'assets/img/Group 15.png';
  config: { currentPage: number; itemsPerPage: number; };
    constructor(private fb: FormBuilder,
    private route : ActivatedRoute,
    private confirmationService: ConfirmetionService,
    protected _notificationSvc: NotificationService
    ) {
      
     }

     

  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.startCarousel();    
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if(this.user !== null){
      this.loginData=this.user
    }
    this.ra =2
    this.form = this.fb.group({
      rating: ['', Validators.required]     
    });
  }

 
  startCarousel() {
    let index = 0;
    setInterval(() => {
      this.currentImage = this.images[index];
      index = (index + 1) % this.images.length;
    }, 3000);
  }

logOut(){
  this.confirmationService
    .confirmDialog({
      title: 'Déconnexion',
      message: 'êtes-vous sûr de vouloir vous déconnecter ?',
      confirmCaption: 'Oui',
      cancelCaption: 'Non',
    })
    .subscribe((yes: boolean) => {   
      if (yes) {
        sessionStorage.removeItem('isLogin');
        sessionStorage.removeItem('TOKEN');
      }
    })
  
  }


}
