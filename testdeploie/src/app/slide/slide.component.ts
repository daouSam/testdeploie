import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  images: string[] = ['assets/img/Appel.png','assets/img/Group 19.png'];
 
  currentImage: string = 'assets/img/Group 19.png';
  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
   }
   
   startCarousel() {
    let index = 0;
    setInterval(() => {
      this.currentImage = this.images[index];
      index = (index + 1) % this.images.length;
    }, 3000);
  }
}
