import { Component } from '@angular/core';
import {AvaliacaoLandingPageComponent} from "../avaliacao-landing-page/avaliacao-landing-page.component";
import {BigImageComponent} from "../big-image/big-image.component";
import {FooterLandingPageComponent} from "../footer-landing-page/footer-landing-page.component";
import {HeaderLandingPageComponent} from "../header-landing-page/header-landing-page.component";
import {MotivoLandingPageComponent} from "../motivo-landing-page/motivo-landing-page.component";
import {NumerosLandingPageComponent} from "../numeros-landing-page/numeros-landing-page.component";
import {PriceLandingPageComponent} from "../price-landing-page/price-landing-page.component";

@Component({
  selector: 'app-landing-page',
    imports: [
        AvaliacaoLandingPageComponent,
        BigImageComponent,
        FooterLandingPageComponent,
        HeaderLandingPageComponent,
        MotivoLandingPageComponent,
        NumerosLandingPageComponent,
        PriceLandingPageComponent
    ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
