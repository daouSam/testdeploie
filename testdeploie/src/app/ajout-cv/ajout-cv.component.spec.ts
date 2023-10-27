import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCVComponent } from './ajout-cv.component';

describe('AjoutCVComponent', () => {
  let component: AjoutCVComponent;
  let fixture: ComponentFixture<AjoutCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutCVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
