# Backend Mínimo - 4x

Este backend proporciona una API REST mínima para que la aplicación Angular funcione correctamente.

## 🚀 Inicio Rápido

### 1. Instalar dependencias del backend

```bash
cd server
npm install
```

### 2. Iniciar el servidor backend

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### 3. Iniciar el frontend Angular (en otra terminal)

```bash
cd ClientApp
npm start
```

El frontend se ejecutará en `http://localhost:4200` y se conectará automáticamente al backend.

## 📡 Endpoints Disponibles

### Health Check
- `GET /api/health` - Verificar estado del servidor

### FAQs (Preguntas Frecuentes)
- `GET /api/FrequentlyQuestions` - Obtener todas las FAQs
- `GET /api/FrequentlyQuestions/Category/:category` - Obtener FAQs por categoría
- `GET /api/FrequentlyQuestions/:id` - Obtener una FAQ por ID
- `POST /api/FrequentlyQuestions` - Crear una nueva FAQ
- `PUT /api/FrequentlyQuestions/:id` - Actualizar una FAQ
- `DELETE /api/FrequentlyQuestions/:id` - Eliminar una FAQ

### Contacto/Email
- `POST /api/Email/SendEmails` - Enviar mensaje de contacto

## 📝 Notas

- Los datos se almacenan en memoria (se pierden al reiniciar el servidor)
- Para producción, deberías conectar una base de datos real
- El endpoint de email solo simula el envío (imprime en consola)
- Para producción, configura el envío real de emails con nodemailer o similar

## 🔧 Configuración

El puerto se puede cambiar mediante la variable de entorno `PORT`:

```bash
PORT=4000 npm start
```

