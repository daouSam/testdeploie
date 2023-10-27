import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  listOffreRecent: any;
  listAppelRecent: any;


  constructor(private service : ServiceService) { }

  ngOnInit(): void {

  }
  AllOffreEmploi(){
    this.service.getAllOffreEmploi().subscribe({
      next : (data)=>{
        this.listOffreRecent = data
      
        
      }
    })
  }
  
  AllAppelOffre(){
    this.service.getAllAppelOffre().subscribe({
      next : (data)=>{
       
        this.listAppelRecent = data
      }
    })
  }
  
  @Input()
  stars!: number;

  @Input()
  size: number = 1;

  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    }
  }

  getStarImage(current: number): string{
    const previousHalf = current - 0.5;
    const imageName =
    this.stars >= current
    ? 'star-full'
    : this.stars >= previousHalf
    ? 'star-half'
    : 'star-empty';
    return `/assets/img/${imageName}.svg`;
  }
}
