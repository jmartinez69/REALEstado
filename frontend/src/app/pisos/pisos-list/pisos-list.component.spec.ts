import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisosListComponent } from './pisos-list.component';

describe('PisosListComponent', () => {
  let component: PisosListComponent;
  let fixture: ComponentFixture<PisosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
