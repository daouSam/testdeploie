import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from '../../notifications/notification.service';
import { TinymceService } from 'src/app/services/tinymce.service';
declare var tinymce: any;
@Component({
  selector: 'app-ajoutappel',
  templateUrl: './ajoutappel.component.html',
  styleUrls: ['./ajoutappel.component.scss']
})
export class AjoutappelComponent implements OnInit, OnDestroy {
  user: any;
  loginData: any;
  id: any;
  loading : boolean=false
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  public imgfile : any = File;
  listCategorie: any;
  path : any
  minDate: string;
  constructor(
    private service : ServiceService,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    protected _notificationSvc: NotificationService,
    private tinymceService: TinymceService
    ) {
      this.minDate = new Date().toISOString().split('T')[0];
    }
    fields: any[] = [];

  

  ngOnInit(): void {
    // this.tinymceService.destroyEditor();
    // this.tinymceService.initializeEditor('textarea#mytextarea')
   this.GetCategorie()
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if(this.user !== null){
      this.loginData=this.user
    }
   this.id=this.loginData?.id;
    this.formgroup = this.formBuilder.group({

      titre: ['', [Validators.required,]],
      ville: ['', Validators.required],
      courrier: ['', Validators.required],
      description: ['',[Validators.required,]],
      nomPersonne: ['', Validators.required],
      dateLimite: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      site: ['',[Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')] ],
      telephone: ['', [Validators.required,]],
      categorieAppel: ['', [Validators.required,]],
      logo: ['', Validators.required]
    },);
    this.formgroup.patchValue({
      courrier: this.user?.email
    });
    this.registerFormControl()
  }

  ngOnDestroy() {
  }
  
  moi(){

  }

  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
  }

  async uploadSave(file1: any){
    if(file1){
      this.path = `appelOffre/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
    }
  }
  registerFormControl() {
    return this.formgroup.controls;
  }

  ajouterOffre(fg : FormGroup){
    this.loading=true
    this.submitted=true;
    const descriptionEditor = tinymce.get('mytextarea');
    if (descriptionEditor) {
       const descriptionValue = descriptionEditor.getContent(); // Contenu HTML complet
       this.formgroup.get('description').setValue(descriptionValue.trim());
    }
    
    fg.value.utilisateur={
      "id": this.id,
 
    };
      if (this.formgroup.get('titre').valid && this.formgroup.get('ville').valid && this.formgroup.get('courrier').valid 
      && this.formgroup.get('description').valid && this.formgroup.get('nomPersonne').valid && this.formgroup.get('dateLimite').valid 
      && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('telephone').valid && this.formgroup.get('categorieAppel').valid
      && this.formgroup.get('site').valid ) {
        if(this.user !== null){ 
        this.uploadSave(this.imgfile).then(() =>{
          fg.value.logo = this.stringl
          fg.value.path = this.path
        this.service.addOffreAppel(fg.value).subscribe((data)=>{
          if(data){
            this.loading=false
            this._notificationSvc.success("succès","Offre ajouter avec succès")
            location.replace("/Ajoutappel")
          }else{
            console.log("probleme image") 
            this.loading=false
          }
        }, err => {
          this._notificationSvc.error("Erreur",`${err.error.message} !`)
          this.loading=false
        })
      }, err => {
        this._notificationSvc.error("Erreur","Erreur image")
        this.loading=false
      }
      )
    }else{
      this._notificationSvc.error("Erreur","merci de vous connecter")
      this.loading=false
    }
  }else{
      this._notificationSvc.error("Erreur","merci de renseigner les champs obligatoire")
      this.loading=false
    }

  }

  GetCategorie(){
    this.service.getCategorieAppel().subscribe((data)=>{
      this.listCategorie=data
    })
  }
}
