import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'importer 'jwt_decode' depuis une bibliothèque JWT
import { ServiceService } from "./service.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private service : ServiceService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const storage: any | null = sessionStorage.getItem('TOKEN');
        const accessToken = JSON.parse(storage);
        let authReq = req;

        if (accessToken !== null) {
            // Vérifier si le token est expiré
            const decodedToken: { exp: number } = jwtDecode(accessToken) as { exp: number };
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                // Le token est expiré, supprimer le token du sessionStorage
                sessionStorage.removeItem('isLogin');
                sessionStorage.removeItem('TOKEN');
                // this.service.presentToastError("Votre session a expiré, veuillez vous reconnecter.")
            } else {
                // Le token est valide, ajouter l'en-tête d'autorisation
                authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
            }
        }

        return next.handle(authReq);
    }
}