# Condaty Marketplace Mobile App

Aplicación móvil del marketplace para la plataforma de administración de condominios Condaty.

## Estructura del Proyecto

```
condaty-marketplace/
├── app/                # Rutas y navegación con Expo Router
│   ├── (tabs)/        # Pestañas principales
│   │   ├── _layout.tsx     # Layout principal y navegación
│   │   ├── index.tsx       # Home/Productos destacados
│   │   ├── products.tsx    # Lista de productos
│   │   ├── cart.tsx       # Carrito de compras
│   │   ├── order.tsx      # Historial de órdenes
│   │   └── profile.tsx    # Perfil de usuario
│   ├── product/      # Rutas de producto
│   │   └── [id].tsx  # Detalles de producto
│   ├── login.tsx     # Pantalla de login
│   └── _layout.tsx   # Layout principal
├── src/
│   ├── api/          # Configuración y llamadas a la API
│   ├── components/   # Componentes reutilizables
│   ├── store/       # Estado global (Zustand)
│   └── types/       # Tipos TypeScript
└── assets/          # Recursos estáticos
```

## Configuración e Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Expo CLI
- Docker y Docker Compose (para el backend)

### Iniciar el Backend

1. Navega al directorio del backend:
```bash
cd api
```

2. Inicia los servicios con Docker:
```bash
# Construir e iniciar
docker-compose up --build

# O en segundo plano
docker-compose up -d
```

El backend estará disponible en `http://localhost:5000`

### Iniciar la Aplicación Móvil

1. Instala las dependencias:
```bash
npm install
```

2. Inicia la aplicación:
```bash
npx expo start
```

3. Escanea el código QR con la app Expo Go o ejecuta en un emulador

## Características Implementadas

### 1. Autenticación
- Login/Logout con JWT
- Manejo de sesión
- Protección de rutas
- Persistencia del token

### 2. Productos
- Listado con búsqueda
- Filtrado por categorías
- Detalles de producto
- Loading states

### 3. Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia con Zustand
- Proceso de checkout

### 4. Órdenes
- Crear órdenes
- Ver historial
- Estados de orden

### 5. Perfil
- Información del usuario
- Datos del condominio
- Logout

## Arquitectura y Decisiones Técnicas

### Tecnologías Principales
- **Expo**: Framework para desarrollo móvil
- **Expo Router**: Sistema de navegación basado en archivos
- **TypeScript**: Para tipado estático
- **Zustand**: Manejo de estado global
- **AsyncStorage**: Persistencia local

### Estructura de Datos
- Persistencia del carrito con Zustand + AsyncStorage
- Estado global para autenticación
- Tipos TypeScript compartidos con el backend

### Patrones Implementados
- Componentes reutilizables
- Custom hooks para lógica común
- Servicios API centralizados
- Manejo de errores consistente

## Mejoras Futuras

### 1. Rendimiento
- [ ] Implementar react-query para cache y manejo de datos
- [ ] Optimizar renderizado de listas grandes
- [ ] Mejorar manejo de imágenes
- [ ] Implementar skeleton loading

### 2. Funcionalidades
- [ ] Sistema de reseñas para productos
- [ ] Chat entre compradores y vendedores
- [ ] Notificaciones push
- [ ] Favoritos y lista de deseos
- [ ] Filtros avanzados de búsqueda

### 3. UX/UI
- [ ] Tema oscuro
- [ ] Animaciones y transiciones
- [ ] Mejor feedback visual
- [ ] Mejoras en accesibilidad

### 4. Técnicas
- [ ] Tests unitarios y de integración
- [ ] Manejo offline
- [ ] Mejora en manejo de errores
- [ ] Sistema de logs

## Credenciales de Prueba

```
Email: test@example.com
Password: password123
```

## Notas Adicionales

- La app requiere que el backend esté corriendo para funcionar
- Las imágenes de productos usan placeholders por defecto
- El backend incluye datos de prueba al iniciar

## Contacto

Para información o soporte:
- cussi.angel.benjamin@gmail.com
