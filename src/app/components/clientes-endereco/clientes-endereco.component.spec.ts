import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEnderecoComponent } from './clientes-endereco.component';

describe('ClientesEnderecoComponent', () => {
  let component: ClientesEnderecoComponent;
  let fixture: ComponentFixture<ClientesEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesEnderecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
