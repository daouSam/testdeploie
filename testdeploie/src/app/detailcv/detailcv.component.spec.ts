import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcvComponent } from './detailcv.component';

describe('DetailcvComponent', () => {
  let component: DetailcvComponent;
  let fixture: ComponentFixture<DetailcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
