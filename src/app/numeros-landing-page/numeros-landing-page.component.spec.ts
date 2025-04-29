import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosLandingPageComponent } from './numeros-landing-page.component';

describe('NumerosLandingPageComponent', () => {
  let component: NumerosLandingPageComponent;
  let fixture: ComponentFixture<NumerosLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumerosLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumerosLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
