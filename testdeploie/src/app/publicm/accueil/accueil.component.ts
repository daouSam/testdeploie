import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../notifications/notification.service';
import { ConfirmetionService } from 'src/app/confirmation/confirmation.service';


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
 
  selectedStars: number =0;
  selectedStarsAppelOffre: number =0;
  loading : boolean=false
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
  stars: number = 0;
  data :any
  p: number = 1;
  pt: number = 1;
  starsArray = Array;
  form: any;
  images: string[] = ['assets/img/OFFRES-EMPLOI.jpg','assets/img/Group 15.png'];
  ra :any
  currentImage: string = 'assets/img/Group 15.png';
    constructor(private fb: FormBuilder,
    private service : ServiceService,
    private confirmationService: ConfirmetionService,
    protected _notificationSvc: NotificationService
    ) { }

  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.startCarousel();
    this.AllOffreEmploi()
    this.AllAppelOffre()
    this.GetCategorie()
    this.GetCategorieAppel()
     
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if(this.user !== null){
      this.loginData=this.user
    }
    this.ra =2
    this.form = this.fb.group({
      rating: ['', Validators.required],
     
    });
  }

 
  startCarousel() {
    let index = 0;
    setInterval(() => {
      this.currentImage = this.images[index];
      index = (index + 1) % this.images.length;
    }, 3000);
  }

AllOffreEmploi(){
  this.service.getAllOffreEmploiConfirmerTrue().subscribe({
    next : (data)=>{
      this.listOffreEmploi = data
      this.listOffreEmploi = this.listOffreEmploi.slice().reverse()
      this.listOffreRecent = data
      this.listOffreRecent = (this.listOffreRecent || []).slice().reverse().slice(0, 3);
    }
  })
}

AllAppelOffre(){
  this.service.getAllAppelOffreConfirmerTrue().subscribe({
    next : (data)=>{
      this.listAppelOffre =data
      this.listAppelOffre = this.listAppelOffre.slice().reverse()
      this.listAppelRecent = data
      this.listAppelRecent = (this.listAppelRecent || []).slice().reverse().slice(0, 3);
    }
  })
}

onCategoryChange(event: any) {
  this.selectedCategory = event.target.value;
  if(this.selectedCategory==this.tout){
    this.AllOffreEmploi();
  }else{
    this.service.getAllOffreEmploiByCategorieTrue(this.selectedCategory).subscribe({
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
    this.service.getAllAppelOffreByCategorieTrue(this.selectedCategoryAppel).subscribe({
      next :(data)=>{
        this.listAppelOffre  = data        
        this.listAppelOffre  = this.listAppelOffre.slice().reverse()        
      }
    })
  }
  

  
}
GetCategorie(){
  this.service.getCategorie().subscribe((data)=>{
    this.listCategorie = data
    this.listCategorie = this.listCategorie.slice().reverse()
  })
}
GetCategorieAppel(){
  this.service.getCategorieAppel().subscribe((data)=>{
    this.listCategorieAppel = data
    this.listCategorieAppel = this.listCategorieAppel.slice().reverse()
  })
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
onStarClick(rating: number) {
  this.selectedStars = rating;
}


getYellowStars(averageRating: number): number[] {
  const fullStars = Math.floor(averageRating);
  const decimalPart = averageRating - fullStars;
  let result: number[] = Array(fullStars).fill(1);

  if (decimalPart > 0) {
    if (decimalPart >= 0.5) {
      result.push(0.5);
    } else {
      result.push(0);
    }
  }

  const remainingStars = 5 - result.length;
  result = result.concat(Array(remainingStars).fill(0));

  return result;
}    
cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
addRating(offreEmploiId: number) {
  if (this.selectedStars !== 0) {
    const newRating = { stars: this.selectedStars };
    this.service.submitEvaluation(offreEmploiId, newRating).subscribe({
      next: (response) => {
        this.AllOffreEmploi();
        this.selectedStars = 0;
      },
      error: (error) => {
      }
    });
  }
}
addRatingAppelOffre(appelOffreId: number) {
  if (this.selectedStarsAppelOffre !== 0) {
    const newRating = { stars: this.selectedStarsAppelOffre };
    this.service.addEvaluationAppelOffre(appelOffreId, newRating).subscribe({
      next: (response) => {
        this.AllAppelOffre()
        this._notificationSvc.success("succès","c'est noté !")
        this.selectedStarsAppelOffre = 0; // Réinitialiser à "0" après l'ajout
      },
      error: (error) => {
        this._notificationSvc.error("échec","Erreur de notation !")
      }
    });
  }
}
succes(){
  this._notificationSvc.error("échec","Erreur de notation !")
}

}
