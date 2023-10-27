import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailappelComponent } from './detailappel.component';

describe('DetailappelComponent', () => {
  let component: DetailappelComponent;
  let fixture: ComponentFixture<DetailappelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailappelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailappelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
