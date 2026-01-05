import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ContactoFormComponent, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  tematica: string = 'General';
  loading = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  private securityService = inject(SecurityService);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Obtener la temática de la URL si está presente
    const urlParams = new URLSearchParams(window.location.search);
    const tematicaParam = urlParams.get('tematica');
    
    if (tematicaParam) {
      this.tematica = tematicaParam;
    }
  }

  closeMessage(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  async onFormSubmit(formData: any) {
    // Validar que los datos no han sido manipulados
    if (!this.securityService.validateFormData(formData)) {
      this.mensajeError = 'Error: Los datos del formulario no son válidos. Por favor, recarga la página e intenta nuevamente.';
      setTimeout(() => {
        this.closeMessage();
      }, 8000);
      return;
    }
    
    const datosEnvio = {
      PersonFullName: formData.name,
      EmailName: formData.email,
      Telephone: formData.phone,
      Subject: `Nuevo mensaje de contacto de ${formData.name}`,
      Body: formData.message || '',
      Entity: formData.entity,
      Location: formData.location,
      Members: formData.members
    };

    this.loading = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    try {
      const url = `${environment.apiUrl}/api/Email/SendEmails`;
      
      const response = await this.http.post<any>(url, datosEnvio).toPromise();
      
      if (response?.success) {
        this.mensajeExito = response.message || '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.';
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.closeMessage();
        }, 5000);
      } else {
        throw new Error(response?.message || 'Error al enviar el formulario');
      }
    } catch (error: any) {
      if (error?.error) {
        if (error.error.errors) {
          // Mostrar errores de validación
          const errorMessages = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              errorMessages.push(...error.error.errors[key]);
            }
          }
          this.mensajeError = errorMessages.join('\n');
        } else if (error.error.message) {
          this.mensajeError = error.error.message;
        } else {
          this.mensajeError = 'Error en el servidor. Por favor, inténtalo de nuevo.';
        }
      } else if (error?.message) {
        this.mensajeError = error.message;
      } else {
        this.mensajeError = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.';
      }
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        this.closeMessage();
      }, 8000);
    } finally {
      this.loading = false;
    }
  }
}
