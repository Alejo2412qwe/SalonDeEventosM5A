import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosadminComponent } from './usuariosadmin.component';

describe('UsuariosadminComponent', () => {
  let component: UsuariosadminComponent;
  let fixture: ComponentFixture<UsuariosadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
