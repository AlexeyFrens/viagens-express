import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoLandingPageComponent } from './avaliacao-landing-page.component';

describe('AvaliacaoLandingPageComponent', () => {
  let component: AvaliacaoLandingPageComponent;
  let fixture: ComponentFixture<AvaliacaoLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
