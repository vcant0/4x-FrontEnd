import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Servicio de seguridad para proteger la aplicación contra manipulaciones
 * desde la consola del navegador
 */
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly document = inject(DOCUMENT);
  private devToolsOpen = false;
  private readonly isProduction = !this.document.location.hostname.includes('localhost');

  constructor() {
    if (this.isProduction) {
      this.initializeProtection();
    }
  }

  private initializeProtection(): void {
    // Deshabilitar console en producción
    this.disableConsole();

    // Detectar y prevenir DevTools
    this.detectDevTools();

    // Proteger contra manipulación del DOM
    this.protectDOM();

    // Proteger contra modificaciones de propiedades críticas
    this.protectCriticalProperties();
  }

  /**
   * Deshabilita los métodos de consola en producción
   */
  private disableConsole(): void {
    const noop = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'group', 'groupEnd', 'groupCollapsed'];

    methods.forEach(method => {
      try {
        (this.document.defaultView as any).console[method] = noop;
        (this.document.defaultView as any).console[method] = function() {};
      } catch (e) {
        // Ignorar errores
      }
    });

    // Sobrescribir console.log de forma más robusta
    try {
      const originalLog = console.log;
      (this.document.defaultView as any).console.log = function() {
        // No hacer nada en producción
      };
    } catch (e) {
      // Ignorar errores
    }
  }

  /**
   * Detecta si DevTools está abierto
   */
  private detectDevTools(): void {
    let devtools = { open: false, orientation: null as any };
    const threshold = 160;

    setInterval(() => {
      if (
        (this.document.defaultView as any)?.outerHeight - (this.document.defaultView as any)?.innerHeight > threshold ||
        (this.document.defaultView as any)?.outerWidth - (this.document.defaultView as any)?.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          this.onDevToolsDetected();
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
        }
      }
    }, 500);
  }

  /**
   * Acción a ejecutar cuando se detecta DevTools
   */
  private onDevToolsDetected(): void {
    // Opcional: mostrar advertencia o redirigir
    // this.document.body.innerHTML = '<h1>No está permitido usar herramientas de desarrollador</h1>';
    
    // En lugar de bloquear completamente, podemos limpiar contenido sensible
    // y registrar el evento (si tienes analytics)
    try {
      // Limpiar datos sensibles del localStorage/sessionStorage si es necesario
      // localStorage.clear();
    } catch (e) {
      // Ignorar errores
    }
  }

  /**
   * Protege el DOM contra manipulaciones
   */
  private protectDOM(): void {
    // Proteger contra modificación de atributos críticos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          
          // Prevenir cambios en atributos críticos
          const protectedAttributes = ['data-protected', 'data-secure'];
          
          protectedAttributes.forEach(attr => {
            if (mutation.attributeName === attr && !target.hasAttribute(attr)) {
              // Restaurar valor original si fue removido
              target.setAttribute(attr, 'true');
            }
          });
        }
      });
    });

    observer.observe(this.document.body, {
      attributes: true,
      attributeFilter: ['data-protected', 'data-secure'],
      subtree: true
    });
  }

  /**
   * Protege propiedades críticas del window
   */
  private protectCriticalProperties(): void {
    try {
      const window = this.document.defaultView as any;
      
      // Hacer propiedades críticas no configurables
      const criticalProps = ['localStorage', 'sessionStorage'];
      
      criticalProps.forEach(prop => {
        try {
          Object.defineProperty(window, prop, {
            writable: false,
            configurable: false
          });
        } catch (e) {
          // Algunos navegadores pueden bloquear esto, ignorar
        }
      });
    } catch (e) {
      // Ignorar errores
    }
  }

  /**
   * Valida que los datos del formulario no han sido manipulados
   */
  validateFormData(formData: any): boolean {
    // Validar que los campos requeridos existen y tienen el formato correcto
    if (!formData || typeof formData !== 'object') {
      return false;
    }

    // Verificar que no hay scripts inyectados
    const stringified = JSON.stringify(formData);
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onload=/i,
      /onclick=/i,
      /eval\(/i,
      /expression\(/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(stringified));
  }

  /**
   * Sanitiza el input del usuario
   */
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }

    // Remover tags HTML peligrosos
    const div = this.document.createElement('div');
    div.textContent = input;
    let sanitized = div.innerHTML;

    // Escapar caracteres especiales adicionales
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    return sanitized;
  }
}

