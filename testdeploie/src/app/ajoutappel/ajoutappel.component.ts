import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
declare var tinymce: any;
@Component({
  selector: 'app-ajoutappel',
  templateUrl: './ajoutappel.component.html',
  styleUrls: ['./ajoutappel.component.scss']
})
export class AjoutappelComponent implements OnInit {
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
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage) {this.minDate = new Date().toISOString().split('T')[0]; }
    fields: any[] = []; // Tableau pour stocker les champs

  

  ngOnInit(): void {
    tinymce.init({
      selector: 'textarea#mytextarea', // Sélecteur de l'élément textarea
      plugins: 'autolink lists link', // Plugins que vous souhaitez activer
      toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | removeformat | subscript superscript | forecolor backcolor | fontsizeselect | code',
      height: 300,
      content_style: 'body { font-family: Arial, sans-serif; text-align: justify; }'
    });
   this.GetCategorie()
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if(this.user !== null){
      this.loginData=this.user
      console.log(this.loginData)
    }
   this.id=this.loginData?.id;
  //   if(localStorage["loginStatus"]){
  //     this.loginStatus=JSON.parse(localStorage["loginStatus"]);
  //   }
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
      logo: ['', Validators.required],
      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
  this.formgroup.patchValue({
    courrier: this.user?.email
  });
  }
  
  moi(){
    console.log("moi")
  }

  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
  }

  async uploadSave(file1: any){
    if(file1){
      this.path = `appelOffre/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      // this.gerant.photo = stringl
      // console.log(this.gerant.photo);
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
    console.log(this.formgroup)
    // if (this.formgroup.valid) {
    
    fg.value.utilisateur={
      "id": this.id,
 
    };
      // fg.value.categorieAppel={
      //   "id": fg.value['categorieAppel'], 
      // }
      if (this.formgroup.get('titre').valid && this.formgroup.get('ville').valid && this.formgroup.get('courrier').valid 
      && this.formgroup.get('description').valid && this.formgroup.get('nomPersonne').valid && this.formgroup.get('dateLimite').valid 
      && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('telephone').valid && this.formgroup.get('categorieAppel').valid
      && this.formgroup.get('site').valid ) {
        if(this.user !== null){ 
      this.uploadSave(this.imgfile).then(() =>{
          fg.value.logo = this.stringl
          fg.value.path = this.path
      console.log(fg.value.logo)
        this.service.addOffreAppel(fg.value).subscribe((data)=>{
          if(data){
            console.log("bien")
            this.loading=false
            this.service.presentToast("Offre ajouter avec succès")
            location.replace("/Ajoutappel")
        }else{
          console.log("probleme image") 
          this.loading=false
        }
        }, err => {
          // this.errorMessage = err.error.message
          // console.log("Selectionné une image")
          this.service.presentToastError(err.error.message);
          this.loading=false
        })
      }, err => {
        // this.errorMessage = err.error.message
        console.log("Erreur image")
        this.service.presentToastError("Erreur image")
        this.loading=false
        // this.toast.error("Selectionné une image");
      }
      )
    }else{
      this.service.presentToastError("merci de vous connecter")
      this.loading=false
    }
    }else{
      this.service.presentToastError("merci de renseigner les champs obligatoire")
      this.loading=false
    }
  // }
  }

  GetCategorie(){
    this.service.getCategorieAppel().subscribe((data)=>{
      this.listCategorie=data
      console.log(this.listCategorie)
    })
  }
}
