import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailannComponent } from './detailann.component';

describe('DetailannComponent', () => {
  let component: DetailannComponent;
  let fixture: ComponentFixture<DetailannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailannComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
