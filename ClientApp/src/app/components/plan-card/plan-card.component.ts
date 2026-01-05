import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent {
  @Input() title!: string;
  @Input() features: { label: string; included: boolean }[] = [];
}
