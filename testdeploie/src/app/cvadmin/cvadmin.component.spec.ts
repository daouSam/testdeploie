import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvadminComponent } from './cvadmin.component';

describe('CvadminComponent', () => {
  let component: CvadminComponent;
  let fixture: ComponentFixture<CvadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
