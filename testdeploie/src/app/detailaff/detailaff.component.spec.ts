import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailaffComponent } from './detailaff.component';

describe('DetailaffComponent', () => {
  let component: DetailaffComponent;
  let fixture: ComponentFixture<DetailaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
