import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() iconId!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() text!: string;
}
