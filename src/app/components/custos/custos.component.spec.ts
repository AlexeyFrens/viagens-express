import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustosComponent } from './custos.component';

describe('CustosComponent', () => {
  let component: CustosComponent;
  let fixture: ComponentFixture<CustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
