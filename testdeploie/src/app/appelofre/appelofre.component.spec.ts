import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelofreComponent } from './appelofre.component';

describe('AppelofreComponent', () => {
  let component: AppelofreComponent;
  let fixture: ComponentFixture<AppelofreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelofreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelofreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
