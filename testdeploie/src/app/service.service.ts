import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Changpassd } from './models/Changpassd';
import { Offresemploi } from './models/offre';

@Injectable({
  providedIn: 'root',
 
})
export class ServiceService {
  //locale
  // url='http://localhost:8082/api/';
  // apiAuth='http://localhost:8082/';

  //nouveau
  url='https://offre-back-end-f9e5deb17b73.herokuapp.com/api/';
  apiAuth='https://offre-back-end-f9e5deb17b73.herokuapp.com/';

  constructor(private http : HttpClient) { }
  

  public login(user: any): Observable<any> {
    return this.http.post(this.apiAuth+"authentication", user);
  }
  addUtilisateur(data:any){
    return this.http.post(this.url+"user/AddUtilisateur",data);
  }

  addOffreEmploi(data:any){
    return this.http.post(this.url+"AddOffremploi",data);
  }
  
  addOffreAppel(data:any){
    return this.http.post(this.url+"AddAppelOffre",data);
  }
  getCategorie(){
    return this.http.get(this.url+"user/AllCategorie");
  }
  getCategorieAppel(){
    return this.http.get<any[]>(this.url+"user/AllCategorieAppel");
  }
  getCategorieEntreprise(){
    return this.http.get(this.url+"user/AllCategorieEntreprise");
  }
  getCategorieAffaire(){
    return this.http.get(this.url+"user/AllCategorieAffaire");
  }
  getCategorieAnnonce(){
    return this.http.get(this.url+"user/AllCategorieAnnonce");
  }
  // suppe categore
  delCategorieOffre(id: any){
    return this.http.delete(this.url+"DeleteCategorie/"+id);
  }
  delCategorieAppel(id: any){
    return this.http.delete(this.url+"DeleteCategorieAppel/"+id);
  }
  delCategorieEntreprise(id: any){
    return this.http.delete(this.url+"DeleteCategorieEntreprise/"+id);
  }
  delCategorieAffaire(id: any){
    return this.http.delete(this.url+"DeleteCategorieAffaire/"+id);
  }
  delCategorieAnnonce(id: any){
    return this.http.delete(this.url+"DeleteCategorieAnnonce/"+id);
  }
  //end delete cate
  
  // add categore
  addCategorieOffre(data: any){
    return this.http.post(this.url+"user/AddCategorie", data);
  }
  addCategorieAppel(data: any){
    return this.http.post(this.url+"user/AddCategorieAppel", data);
  }
  addCategorieEntreprise(data: any){
    return this.http.post(this.url+"user/AddCategorieEntreprise", data);
  }
  addCategorieAffaire(data: any){
    return this.http.post(this.url+"user/AddCategorieAffaire", data);
  }
  addCategorieAnnonce(data: any){
    return this.http.post(this.url+"user/AddCategorieAnnonce", data);
  }
  //end add cate

  getAllOffreEmploi(){
    return this.http.get(this.url+"AllOffremploi");
  }
  getAllOffreEmploiConfirmerFalse(){
    return this.http.get(this.url+"AllOffremploiByConfirmerFalse");
  }
  getAllOffreEmploiConfirmerTrue(): Observable <Offresemploi[]>{
    return this.http.get<Offresemploi[]>(this.url+"user/AllOffremploiByConfirmerTrue");
  }
  getAllAppelOffre(){
    return this.http.get(this.url+"AllAppelOffre");
  }
  getAllAppelOffreConfirmerFalse(){
    return this.http.get(this.url+"AllAppelOffreByConfirmerFalse");
  }
  getAllAppelOffreConfirmerTrue(){
    return this.http.get<any[]>(this.url+"user/AllAppelOffreByConfirmerTrue");
  }
  getAllOffreEmploiByCategorie(idCategorie : any){
    return this.http.get(this.url+"user/AllOffremploiByCategorie/"+idCategorie);
    
  }
  getAllOffreEmploiByCategorieTrue(idCategorie : any){
    return this.http.get<any[]>(this.url+"user/AllOffremploiByCategorieTrue/"+idCategorie);
    
  }
  getAllAppelOffreByCategorie(idCategorieAppel : any){
    return this.http.get(this.url+"user/findAppelOffreByCategorie/"+idCategorieAppel);
  }
  getAllAppelOffreByCategorieTrue(idCategorieAppel : any){
    return this.http.get<any[]>(this.url+"user/findAppelOffreByCategorieTrue/"+idCategorieAppel);
  }
  OffreEmploiById(idOffre : any){
    return this.http.get(this.url+"user/OffremploiById/"+idOffre);
    
  }
  AppelOffreById(idOffre : any){
    return this.http.get(this.url+"user/AppelOffreById/"+idOffre);
    
  }
  OffreEmploiByUtilisateur(idUtilisateur : any){
    return this.http.get(this.url+"AllOffremploiByUtilisateur/"+idUtilisateur);
  }
  AppelOffreByUtilisateur(idUtilisateur : any){
    return this.http.get(this.url+"AllAppelOffreByUtilisateur/"+idUtilisateur);
  }
  deleteOffreEmploi(id:any){
    return this.http.delete(this.url+"DeleteOfrre/"+id);
}
UpdateOffreEmploi(id :number,data:any){
  return this.http.put(this.url +"UpdateOffremploi/"+id,data);
}
deleteAppelOffre(id:any){
  return this.http.delete(this.url+"DeleteAppelOfrre/"+id);
}
UpdateAppelOffre(id :number,data:any){
return this.http.put(this.url +"UpdateAppel/"+id,data);
}
Contacter(body : any){
  return this.http.post(this.url+"user/Addcontact",body);
  
}
UtilisateurById(id : any){
  return this.http.get(this.url+"user/UtilisateurById/"+id);
}
UpdateEmployeur(id :number,data:any){
  return this.http.put(this.url +"UpdateEmployeur/"+id,data);
}
UpdateCandidat(id :number,data:any){
  return this.http.put(this.url +"UpdateCandidat/"+id,data);
}
AddCv(data:any){
  return this.http.post(this.url+"user/AddCv",data);
}
AddListFormatio(id : any,data:any){
  return this.http.post(this.url+"user/ajoutlistCvFormation/"+id,data);
}
AddListExperience(id : any,data:any){
  return this.http.post(this.url+"user/ajoutlistCvexperience/"+id,data);
}
AllCv(){
  return this.http.get(this.url+"AllCv");
}
CvById(id : any){
  return this.http.get(this.url+"user/CvById/"+id);
}
addEntreprise(data:any){
  return this.http.post(this.url+"user/AddEntreprise",data);
}
AllEntreprise(){
  return this.http.get(this.url+"AllEntreprise");
}
AllEntrepriseByConfirmerTrue(){
  return this.http.get(this.url+"user/AllEntrepriseByConfirmerTrue");
}
EntrepriseById(id : any){
  return this.http.get(this.url+"user/EntrepriseById/"+id);
}
getAllOffreEntrepriseByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllEntrepriseByCategorie/"+idCategorie);
  
}
getAllOffreEntrepriseByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllEntrepriseByCategorieTrue/"+idCategorie);
  
}
getCvByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllCvByCategorieTrue/"+idCategorie);
  
}
getCvByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllCvByCategorie/"+idCategorie);
  
}
CVByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllCvByUtilisateur/"+idUtilisateur);
  
}
AllCvByConfirmerTrue(){
  return this.http.get(this.url+"user/AllCvByConfirmerTrue");
}
EntrepriseByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllEntrepriseByUtilisateur/"+idUtilisateur);
  
}
AllAffaire(){
  return this.http.get(this.url+"AllAffaire");
}
AllAffaireByConfirmerTrue(){
  return this.http.get(this.url+"user/AllAffaireByConfirmerTrue");
}
addAffaire(data:any){
  return this.http.post(this.url+"user/AddAffaire",data);
}
AffaireById(id : any){
  return this.http.get(this.url+"user/AffaireById/"+id);
}
getAffaireByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllAffaireByCategorie/"+idCategorie);
  
}
getAffaireByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllAffaireByCategorieTrue/"+idCategorie);
  
}
AffaireByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllAffaireByUtilisateur/"+idUtilisateur);
  
}
AllAnnonce(){
  return this.http.get(this.url+"AllAnnonce");
}
AllAnnonceByConfirmerTrue(){
  return this.http.get(this.url+"user/AllAnnonceByConfirmerTrue");
}
addAnnonce(data:any){
  return this.http.post(this.url+"user/AddAnnonce",data);
}
AnnonceById(id : any){
  return this.http.get(this.url+"user/AnnonceById/"+id);
}
getAnnonceByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllAnnonceByCategorie/"+idCategorie);
  
}
AnnonceByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllAnnonceByUtilisateur/"+idUtilisateur);
}
ConfirmerOffreEmploiToTrue(id :any){
return this.http.delete(this.url +"confirmeToTrue/"+id);
}
ConfirmerAppelOffreToTrue(id :any){
  return this.http.delete(this.url +"confirmeAppelToTrue/"+id);
  }

  ConfirmerEntrepriseToTrue(id :any){
    return this.http.delete(this.url +"confirmeEntrepriseToTrue/"+id);
    }
  ConfirmerCvToTrue(id :any){
      return this.http.delete(this.url +"confirmeCvToTrue/"+id);
   }
  ConfirmerAffaireToTrue(id :any){
    return this.http.delete(this.url +"confirmeAffaireToTrue/"+id);
  }
  ConfirmerAnnonceToTrue(id :any){
    return this.http.delete(this.url +"confirmeAnnonceToTrue/"+id);
  }
  confirmerAffaire(id :any){
    return this.http.delete(this.url +"confirmeAffaireToTrue/"+id);
  }
  
  getAllUtilisateur(){
    return this.http.get(this.url+"AllUtilisateur");
  }

  banniUtilisateur(idU: any){
    return this.http.put(this.url+"bannirUtilisateur", idU);
  }

  deleteUtilisateur(idU: any){
    return this.http.delete(this.url+"DeleteUtilisateur/"+idU);
  }

  addRating(productId: number, stars: number) {
    const ratingData = { stars };
    return this.http.post(this.url +"user/ratings/"+productId,ratingData);
  }

  updateProductRating(productId: number, userRating: number): Observable<any> {
    return this.http.post(this.url +"user/"+productId+"/ratings",userRating);
  }
  calculateAverageRating(idOffre : any){
    return this.http.get(this.url +"user/"+idOffre+"/average-rating");
  }
  submitEvaluation(offreEmploiId: number, rating: any) {
    return this.http.post(this.url +"user/"+offreEmploiId+"/evaluations",rating);
  }
  addEvaluationAppelOffre(appelOffreId: number, rating: any) {
    return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAppelOffre",rating);
  }
  addEvaluationAffaire(appelOffreId: number, rating: any) {
    return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAffaire",rating);
  }
  addEvaluationAnnonce(appelOffreId: number, rating: any) {
    return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAnnonce", rating);
  }

  getCatOffreById(id: any){
    return this.http.get(this.url+"user/CategorieById/" + id)
  }

  getCatAppelById(id: any){
    return this.http.get(this.url+"user/CategorieAppelById/" + id)
    
  }

  getCatEntrepriseById(id: any){
    return this.http.get(this.url+"user/CategorieEntrepriseById/" + id)
    
  }
  
  getCatAnnonceById(id: any){
    return this.http.get(this.url+"user/CategorieAnnonceById/" + id)
    
  }
  
  getCatAffaireById(id: any){
    return this.http.get(this.url+"user/CategorieAffaireById/" + id)
    
  }

  // update all categorie
  updateCatOffreById(id: any, data: any){
    return this.http.put(this.url+"user/UpdateCategorie/"+ id, data)
    
  }
  
  updateCatAppelById(id: any, data: any){
    return this.http.put(this.url+"UpdateCategorieAppel/"+ id, data)
    
  }
  
  updateCatEntrepriseById(id: any, data: any){
    return this.http.put(this.url+"user/UpdateCategorieEntreprise/"+ id, data)
    
  }
  
  updateCatAnnonceById(id: any, data: any){
    return this.http.put(this.url+"user/UpdateCategorieAnnonce/"+ id, data)
    
  }
  
  updateCatAffaireById(id: any, data: any){
    return this.http.put(this.url+"user/UpdateCategorieAffaire/"+ id, data)

  }

  forgotPassd(email: any){
    return this.http.post(this.url+"user/forgotPassword", email);
  }

  changePassword(changePassd: Changpassd){
    return this.http.post(this.url+"user/changePassword", changePassd);
  }
}
