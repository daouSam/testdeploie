import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutaffComponent } from './ajoutaff.component';

describe('AjoutaffComponent', () => {
  let component: AjoutaffComponent;
  let fixture: ComponentFixture<AjoutaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
