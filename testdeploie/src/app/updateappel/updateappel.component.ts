import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateappel',
  templateUrl: './updateappel.component.html',
  styleUrls: ['./updateappel.component.scss']
})
export class UpdateappelComponent implements OnInit {
  user: any;
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  public imgfile : any = File;
  listCategorie: any;
  path : any
  listCategorieAppel: any;
  listoffre: any;
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage,private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.GetCategorieAppel()
   this.id = this.route.snapshot.params['id'];
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.loginData=this.user
    }
    this.service.AppelOffreById(this.id).subscribe((data)=>{
     this.listoffre=data;
    })
    this.formgroup = this.formBuilder.group({

      titre: ['', [Validators.required,]],
      ville: ['', Validators.required],
      courrier: ['', Validators.required],
      description: ['',[Validators.required,]],
      nomPersonne: ['', Validators.required],
      dateLimite: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      site: ['',[ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')] ],
      telephone: ['', [Validators.required,]],
      categorieAppel: ['', [Validators.required,]],
      logo: ['', Validators.required] 
  },);
  
  }
  moi(){
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
      this.path = `appelOffre/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      await this.deletePhotoFromFirebaseStorage(this.listoffre.logo);
    }
  }
  
  UpdateAppelOffre(){
    if (this.formgroup.get('titre').valid && this.formgroup.get('ville').valid && this.formgroup.get('courrier').valid 
    && this.formgroup.get('description').valid && this.formgroup.get('nomPersonne').valid && this.formgroup.get('dateLimite').valid 
    && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('telephone').valid && this.formgroup.get('categorieAppel').valid
    && this.formgroup.get('site').valid ) {
    this.uploadSave(this.imgfile).then(() =>{
      this.listoffre.logo=this.stringl
    this.service.UpdateAppelOffre(this.listoffre.id,this.listoffre).subscribe((data)=>{
       if(data){
        this.service.presentToast("Appel offres modifier avec succès")       
       }
    }, err => {
      this.service.presentToastError(err.error.message);
    })
    
  })
    } else{
      this.service.presentToastError("merci de renseigner les champs obligatoire")
    }
  }
  get registerFormControl() {
    return this.formgroup.controls;
  }

  GetCategorieAppel(){
    this.service.getCategorieAppel().subscribe((data)=>{
      this.listCategorieAppel=data
    })
  }

}
