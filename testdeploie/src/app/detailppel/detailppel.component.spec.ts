import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailppelComponent } from './detailppel.component';

describe('DetailppelComponent', () => {
  let component: DetailppelComponent;
  let fixture: ComponentFixture<DetailppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
