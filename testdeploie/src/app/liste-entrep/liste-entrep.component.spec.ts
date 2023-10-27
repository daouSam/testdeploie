import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEntrepComponent } from './liste-entrep.component';

describe('ListeEntrepComponent', () => {
  let component: ListeEntrepComponent;
  let fixture: ComponentFixture<ListeEntrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEntrepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEntrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
