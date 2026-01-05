const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos en memoria (simulando base de datos)
let faqs = [
  {
    id: 1,
    question: "¿Qué es esta plataforma?",
    answer: "Esta es una plataforma diseñada para ayudarte con tus necesidades.",
    category: "General",
    keywords: "plataforma, ayuda",
    usersRole: "Usuario",
    frequently: 10,
    updateDate: new Date().toISOString()
  },
  {
    id: 2,
    question: "¿Cómo puedo contactar con soporte?",
    answer: "Puedes contactarnos a través del formulario de contacto en la página de contacto.",
    category: "Soporte",
    keywords: "contacto, soporte, ayuda",
    usersRole: "Usuario",
    frequently: 8,
    updateDate: new Date().toISOString()
  },
  {
    id: 3,
    question: "¿Cuáles son los planes disponibles?",
    answer: "Tenemos diferentes planes disponibles. Consulta la sección de planes para más información.",
    category: "Planes",
    keywords: "planes, precios",
    usersRole: "Usuario",
    frequently: 5,
    updateDate: new Date().toISOString()
  }
];

let nextFaqId = 4;

// ========== API Routes ==========

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando correctamente' });
});

// ========== FAQ Endpoints ==========

// GET /api/FrequentlyQuestions - Obtener todas las FAQs
app.get('/api/FrequentlyQuestions', (req, res) => {
  res.json(faqs);
});

// GET /api/FrequentlyQuestions/Category/:category - Obtener FAQs por categoría
app.get('/api/FrequentlyQuestions/Category/:category', (req, res) => {
  const category = req.params.category;
  const filteredFaqs = faqs.filter(faq => 
    faq.category.toLowerCase() === category.toLowerCase()
  );
  res.json(filteredFaqs);
});

// GET /api/FrequentlyQuestions/:id - Obtener una FAQ por ID
app.get('/api/FrequentlyQuestions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const faq = faqs.find(f => f.id === id);
  
  if (!faq) {
    return res.status(404).json({ message: 'FAQ no encontrada' });
  }
  
  res.json(faq);
});

// POST /api/FrequentlyQuestions - Crear una nueva FAQ
app.post('/api/FrequentlyQuestions', (req, res) => {
  const newFaq = {
    id: nextFaqId++,
    question: req.body.question || '',
    answer: req.body.answer || '',
    category: req.body.category || 'General',
    keywords: req.body.keywords || '',
    usersRole: req.body.usersRole || 'Usuario',
    frequently: req.body.frequently || 0,
    updateDate: new Date().toISOString()
  };
  
  faqs.push(newFaq);
  res.status(201).json(newFaq);
});

// PUT /api/FrequentlyQuestions/:id - Actualizar una FAQ
app.put('/api/FrequentlyQuestions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = faqs.findIndex(f => f.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'FAQ no encontrada' });
  }
  
  faqs[index] = {
    ...faqs[index],
    ...req.body,
    id: id, // Asegurar que el ID no cambie
    updateDate: new Date().toISOString()
  };
  
  res.json(faqs[index]);
});

// DELETE /api/FrequentlyQuestions/:id - Eliminar una FAQ
app.delete('/api/FrequentlyQuestions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = faqs.findIndex(f => f.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'FAQ no encontrada' });
  }
  
  faqs.splice(index, 1);
  res.status(204).send();
});

// ========== Email/Contact Endpoints ==========

// POST /api/Email/SendEmails - Enviar email de contacto
app.post('/api/Email/SendEmails', (req, res) => {
  const { PersonFullName, EmailName, Telephone, Subject, Body, Entity, Location, Members } = req.body;
  
  // Validación básica
  if (!PersonFullName || !EmailName || !Telephone) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: nombre, email o teléfono'
    });
  }
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EmailName)) {
    return res.status(400).json({
      success: false,
      message: 'El formato del email no es válido'
    });
  }
  
  // Simular envío de email (en producción aquí iría la lógica real de envío)
  console.log('📧 Nuevo mensaje de contacto recibido:');
  console.log('   Nombre:', PersonFullName);
  console.log('   Email:', EmailName);
  console.log('   Teléfono:', Telephone);
  console.log('   Entidad:', Entity);
  console.log('   Ubicación:', Location);
  console.log('   Miembros:', Members);
  console.log('   Asunto:', Subject);
  console.log('   Mensaje:', Body);
  
  // Simular éxito
  res.json({
    success: true,
    message: '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.',
    data: {
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
  });
});

// Servir archivos estáticos de Angular en producción
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../ClientApp/dist/clientapp/browser');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
});

