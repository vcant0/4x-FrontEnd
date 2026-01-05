import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class App implements OnInit {
  protected readonly title = signal('clientapp');
  private securityService = inject(SecurityService);

  ngOnInit(): void {
    // El servicio de seguridad se inicializa automáticamente en su constructor
    // Esto asegura que las protecciones estén activas desde el inicio
  }
}
