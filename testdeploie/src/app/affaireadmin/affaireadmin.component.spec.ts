import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireadminComponent } from './affaireadmin.component';

describe('AffaireadminComponent', () => {
  let component: AffaireadminComponent;
  let fixture: ComponentFixture<AffaireadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffaireadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffaireadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
