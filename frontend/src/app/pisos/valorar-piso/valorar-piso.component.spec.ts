import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorarPisoComponent } from './valorar-piso.component';

describe('ValorarPisoComponent', () => {
  let component: ValorarPisoComponent;
  let fixture: ComponentFixture<ValorarPisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorarPisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
