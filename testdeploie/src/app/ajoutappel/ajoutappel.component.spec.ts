import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutappelComponent } from './ajoutappel.component';

describe('AjoutappelComponent', () => {
  let component: AjoutappelComponent;
  let fixture: ComponentFixture<AjoutappelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutappelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutappelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
