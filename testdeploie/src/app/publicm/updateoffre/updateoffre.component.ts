import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-updateoffre',
  templateUrl: './updateoffre.component.html',
  styleUrls: ['./updateoffre.component.scss']
})
export class UpdateoffreComponent implements OnInit {
  user: any;
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  public imgfile : any = File;
  listCategorie: any;
  listoffre: any;
  path :any
  constructor(
    private service : ServiceService,
    private storage: AngularFireStorage,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected _notificationSvc: NotificationService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.loginData=this.user
    }
    this.service.OffreEmploiById(this.id).subscribe((data)=>{
     this.listoffre=data;
    })

    this.GetCategorie()
    this.formgroup = this.formBuilder.group({

      nomOffre: ['', [Validators.required,]],
      email: ['', Validators.required],
      localisation: ['', Validators.required],
      typeOffre: ['', Validators.required],
      description: ['',[Validators.required,]],
      urlCandidature: ['', Validators.required],
      dateFonction: ['', []],
    
      dateLimite: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      site: ['',[ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')] ],
      urlFacebook: ['', [ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')]],
      urlTwitter: ['', [ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')]],
      urlLinkdin: ['', [ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')]],
      logo: ['', []],
      categorie: ['', Validators.required]
  },);
  }
  moi(){
    this.uploadSave(this.imgfile).then(() =>{})
  }
  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
  }
  async deletePhotoFromFirebaseStorage(url: string) {
    const ref = this.storage.refFromURL(url);
    try {
      await ref.getMetadata().toPromise();
      await ref.delete().toPromise();
    } catch (error) {
    }
  }
  async uploadSave(file1: any){
    if(file1){
      this.path = `offreEmploi/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      await this.deletePhotoFromFirebaseStorage(this.listoffre.logo);
    }
  }

  UpdateOffreEmploi(){
    if (this.formgroup.get('nomOffre').valid && this.formgroup.get('email').valid && this.formgroup.get('localisation').valid 
    && this.formgroup.get('typeOffre').valid && this.formgroup.get('description').valid && this.formgroup.get('urlCandidature').valid 
    && this.formgroup.get('dateLimite').valid && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('categorie').valid
    && this.formgroup.get('site').valid && this.formgroup.get('urlFacebook').valid && this.formgroup.get('urlTwitter').valid && this.formgroup.get('urlLinkdin').valid) {
    this.uploadSave(this.imgfile).then(() =>{
      this.listoffre.logo=this.stringl
    this.service.UpdateOffreEmploi(this.listoffre.id,this.listoffre).subscribe((data)=>{
       if(data){
        this._notificationSvc.success("succès","offre d'emploi modifier avec succès !")        
      }
    })
    
  })
}else{
    this._notificationSvc.error("Erreur","merci de renseigner les champs obligatoire !")        
  }
}
  GetCategorie(){
    this.service.getCategorie().subscribe((data)=>{
      this.listCategorie=data
    })
  }

}
