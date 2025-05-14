import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesViagemComponent } from './clientes-viagem.component';

describe('ClientesViagemComponent', () => {
  let component: ClientesViagemComponent;
  let fixture: ComponentFixture<ClientesViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
