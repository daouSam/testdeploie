import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeur',
  templateUrl: './employeur.component.html',
  styleUrls: ['./employeur.component.scss']
})
export class EmployeurComponent implements OnInit {
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
  userForm: any;
   constructor(private service : ServiceService,private formBuilder: FormBuilder) { }
 
   ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      users: this.formBuilder.array([]) ,
      titre: ['', [Validators.required,]]// Utilisé pour stocker les utilisateurs ajoutés dynamiquement
    });
   
   }
   
 

   
 
   // Méthode pour ajouter un nouvel utilisateur
   ajouterUtilisateur(): void {
     const users = this.userForm.get('users') as FormArray;
     users.push(this.createUtilisateur());
   }
 
   // Méthode pour supprimer un utilisateur
   supprimerUtilisateur(index: number): void {
     const users = this.userForm.get('users') as FormArray;
     users.removeAt(index);
   }
 
   // Créer un groupe de formulaire pour chaque utilisateur
   createUtilisateur(): FormGroup {
     return this.formBuilder.group({
       telephone: ['', Validators.required],
       nomEntreprise: ['', Validators.required]
     });
   }

   ajouter(fg : FormGroup){
      
   }

}
