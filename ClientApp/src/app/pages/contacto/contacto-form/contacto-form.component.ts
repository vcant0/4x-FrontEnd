import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.css']
})
export class ContactoFormComponent {
  @Input() loading: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();
  
  contactForm: FormGroup;
  submitted = false;
  private securityService = inject(SecurityService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      entity: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
      members: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(5000)
      ]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  async onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      let formData = { ...this.contactForm.value };
      
      // Sanitizar todos los campos de texto
      formData.name = this.securityService.sanitizeInput(formData.name || '');
      formData.email = this.securityService.sanitizeInput(formData.email || '');
      formData.phone = this.securityService.sanitizeInput(formData.phone || '');
      formData.entity = this.securityService.sanitizeInput(formData.entity || '');
      formData.location = this.securityService.sanitizeInput(formData.location || '');
      formData.message = this.securityService.sanitizeInput(formData.message || '');
      
      // Validar que los datos no han sido manipulados
      if (!this.securityService.validateFormData(formData)) {
        console.error('Formulario rechazado: datos inválidos o manipulados');
        return;
      }
      
      this.formSubmit.emit(formData);
    }
  }

  // Format phone number as user types
  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      value = value.match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
      value = !value[2] ? value[1] : `+${value[1]} (${value[2]}) ${value[3]}`.trim();
    }
    this.contactForm.patchValue({ phone: value });
  }
}
