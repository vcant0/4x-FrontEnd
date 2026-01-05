import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { PlanCardComponent } from '../../components/plan-card/plan-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FeatureCardComponent, PlanCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {}

