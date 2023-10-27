import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceadminComponent } from './annonceadmin.component';

describe('AnnonceadminComponent', () => {
  let component: AnnonceadminComponent;
  let fixture: ComponentFixture<AnnonceadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
