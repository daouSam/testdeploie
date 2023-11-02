import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss'],
  animations: [
  ],
})
export class CarousselComponent {
 
  slides: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.slides.push({
      id: 0,
      src: 'assets/img/cytonn-photography-l3MMvRYdPhc-unsplash.jpg',
      title: 'Naviguez Vers Votre Futur Professionnel',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    });
    this.slides.push({
      id: 1,
      src: 'assets/img/luis-villasmil-4V8uMZx8FYA-unsplash.jpg',
      title: 'Cherchez, Trouvez, Évoluez',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });
    this.slides.push({
      id: 2,
      src: 'assets/img/cytonn-photography-n95VMLxqM2I-unsplash.jpg',
      title: 'Lancez la Prochaine Étape de Votre Carrière',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    });
  }
}
