import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoLandingPageComponent } from './motivo-landing-page.component';

describe('MotivoLandingPageComponent', () => {
  let component: MotivoLandingPageComponent;
  let fixture: ComponentFixture<MotivoLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
