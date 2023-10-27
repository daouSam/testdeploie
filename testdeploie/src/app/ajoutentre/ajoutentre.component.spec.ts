import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutentreComponent } from './ajoutentre.component';

describe('AjoutentreComponent', () => {
  let component: AjoutentreComponent;
  let fixture: ComponentFixture<AjoutentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
