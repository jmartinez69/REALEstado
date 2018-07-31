import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisoDetalleComponent } from './piso-detalle.component';

describe('PisoDetalleComponent', () => {
  let component: PisoDetalleComponent;
  let fixture: ComponentFixture<PisoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
