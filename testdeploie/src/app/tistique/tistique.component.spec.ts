import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TistiqueComponent } from './tistique.component';

describe('TistiqueComponent', () => {
  let component: TistiqueComponent;
  let fixture: ComponentFixture<TistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
