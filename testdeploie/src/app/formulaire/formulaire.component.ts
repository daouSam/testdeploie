import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from '../notifications/notification.service';
declare var tinymce: any;

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {


  editorContent: string = '';
  user: any;
  loading : boolean=false
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  path : any;
  public imgfile : any = File;
  listCategorie: any;
  role: any;
  donne: any;
  minDate: string;
  user1 :any | null
  constructor(
    private service : ServiceService,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    protected _notificationSvc: NotificationService
    ) {this.minDate = new Date().toISOString().split('T')[0]; }

  ngOnInit(): void {
    tinymce.init({
      selector: 'textarea#mytextarea', // Sélecteur de l'élément textarea
      plugins: 'autolink lists link', // Plugins que vous souhaitez activer
      toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | removeformat | subscript superscript | forecolor backcolor | fontsizeselect | code',
      height: 300,
      content_style: 'body { font-family: Arial, sans-serif; text-align: justify; }'
    });
   this.GetCategorie()
   this.user1 = sessionStorage.getItem('isLogin');
   this.user = JSON.parse(this.user1);
   if(this.user !== null){
    this.loginData=this.user
    this.role=this.loginData.roles
      this.role.forEach((role: any) => {
        this.donne=role        
      });  
  }

   this.id=this.loginData?.id;
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
      site: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlFacebook: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlTwitter: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlLinkdin: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      logo: ['', []],
      categorie: ['', Validators.required],
      utilisateur: ['', Validators.required] 
  },);
  this.formgroup.patchValue({
    email: this.user?.email
  });
 
  }
  moi(){
    this.uploadSave(this.imgfile).then(() =>{})
  }

  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
  }

  async uploadSave(file1: any){
    if(file1){
       this.path = `offreEmploi/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
    }
  }

  get registerFormControl() {
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
      console.log(fg.value);
      if (this.formgroup.get('nomOffre').valid && this.formgroup.get('email').valid && this.formgroup.get('localisation').valid 
      && this.formgroup.get('typeOffre').valid && this.formgroup.get('description').valid && this.formgroup.get('urlCandidature').valid 
      && this.formgroup.get('dateLimite').valid && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('categorie').valid
      && this.formgroup.get('site').valid && this.formgroup.get('urlFacebook').valid && this.formgroup.get('urlTwitter').valid && this.formgroup.get('urlLinkdin').valid) {
        
      this.uploadSave(this.imgfile).then(() =>{
          fg.value.logo = this.stringl
          fg.value.path=this.path
        this.service.addOffreEmploi(fg.value).subscribe((data)=>{
          if(data){           
           this.loading=false
            this._notificationSvc.success("succès","Offre ajouter avec succès !")
            location.replace("/formulaire")
          }else{
            
          }
        }, err => {
          this._notificationSvc.error("Erreur", `${err.error.message} !`)
          this.loading=false
        })
      }, err => {
        this._notificationSvc.error("Erreur", "Erreur image !")
        this.loading=false
      }
      )
    }else{
      this._notificationSvc.error("Erreur", "merci de renseigner les champs obligatoire !")
      this.loading=false
    }
  }

  GetCategorie(){
    this.service.getCategorie().subscribe((data)=>{
      this.listCategorie=data
    })
  }
  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
