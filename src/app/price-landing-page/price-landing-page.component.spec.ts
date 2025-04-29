import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLandingPageComponent } from './price-landing-page.component';

describe('PriceLandingPageComponent', () => {
  let component: PriceLandingPageComponent;
  let fixture: ComponentFixture<PriceLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
