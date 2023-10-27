import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutannonceComponent } from './ajoutannonce.component';

describe('AjoutannonceComponent', () => {
  let component: AjoutannonceComponent;
  let fixture: ComponentFixture<AjoutannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutannonceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
