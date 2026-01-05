# 4x Web Software - Frontend

Frontend de la aplicación web 4x, desarrollado con Angular. Sistema moderno pensado para clubes deportivos, bomberos, ONGs, academias y otras entidades de cobros.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Seguridad**: Protección contra manipulaciones desde la consola del navegador
- **PWA Ready**: Preparado para funcionar como Progressive Web App
- **Performance**: Optimizado para velocidad y rendimiento
- **Accesibilidad**: Mejores prácticas de accesibilidad web

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior) o yarn
- Angular CLI (se instala con `npm install -g @angular/cli`)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd 4x-frontend
```

2. Instala las dependencias:
```bash
cd ClientApp
npm install
```

## 🏃 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
cd ClientApp
ng serve
```

La aplicación estará disponible en `http://localhost:4200/` y se recargará automáticamente cuando modifiques los archivos.

## 🌐 Configuración de la API

Antes de ejecutar la aplicación, asegúrate de configurar la URL de tu API backend:

1. Edita `ClientApp/src/environments/environment.ts` para desarrollo:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://tu-api-desarrollo.com/api'
};
```

2. Edita `ClientApp/src/environments/environment.prod.ts` para producción:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-produccion.com/api'
};
```

## 📦 Construcción

Para crear una build de producción:

```bash
cd ClientApp
ng build --configuration production
```

Los archivos compilados estarán en `ClientApp/dist/`.

## 🧪 Testing

Para ejecutar los tests unitarios:

```bash
cd ClientApp
ng test
```

## 📁 Estructura del Proyecto

```
ClientApp/
├── src/
│   ├── app/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── services/        # Servicios (HTTP, seguridad, etc.)
│   │   ├── app.ts           # Componente principal
│   │   └── ...
│   ├── assets/              # Imágenes, iconos, etc.
│   ├── environments/        # Configuración de entornos
│   └── ...
├── angular.json             # Configuración de Angular
├── package.json             # Dependencias del proyecto
└── tsconfig.json            # Configuración de TypeScript
```

## 🔒 Seguridad

El proyecto incluye medidas de seguridad:

- **SecurityService**: Protección contra manipulaciones desde la consola
- **Sanitización de inputs**: Prevención de XSS
- **Validación de formularios**: Validación tanto en cliente como preparado para servidor
- **Content Security Policy**: Configurado en el servidor de producción

## 🎨 Tecnologías Utilizadas

- Angular 20.3
- TypeScript
- SCSS
- RxJS
- Angular Router
- Angular Forms (Reactive Forms)

## 📝 Notas

- Este proyecto solo contiene el frontend. El backend debe estar en un repositorio separado.
- Asegúrate de configurar correctamente las variables de entorno antes de desplegar.
- El proyecto está configurado para SSR (Server-Side Rendering) con Angular Universal.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

[Especificar licencia si aplica]

## 👥 Autores

[Información de los autores]

---

Desarrollado con ❤️ por el equipo de 4x

