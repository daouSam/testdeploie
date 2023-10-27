import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreadminComponent } from './entreadmin.component';

describe('EntreadminComponent', () => {
  let component: EntreadminComponent;
  let fixture: ComponentFixture<EntreadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
