# Virtual Mosquito Pet

## Overview

This is an interactive web application that simulates virtual mosquito pets flying around the user's screen. Users can watch mosquitoes move autonomously with realistic flight patterns and interact with them by clicking to multiply their population. The application features a real-time canvas-based simulation engine with performance monitoring, sound effects, and customizable controls for speed adjustment and mosquito management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern functional component architecture using hooks for state management
- **Canvas-based Rendering**: Custom mosquito engine built on HTML5 Canvas for high-performance real-time animation
- **Component Structure**: Modular design with dedicated components for game canvas, controls, stats, and UI panels
- **Shadcn/ui Design System**: Comprehensive UI component library with Radix UI primitives for accessibility
- **Tailwind CSS**: Utility-first styling with custom CSS variables for theming

### Game Engine Design
- **MosquitoEngine Class**: Core simulation engine managing mosquito entities, physics, and behaviors
- **Entity System**: Each mosquito has position, velocity, acceleration, and behavioral properties
- **Physics Simulation**: Vector-based movement with realistic flight patterns and mouse interaction
- **Performance Optimization**: RequestAnimationFrame-based animation loop with FPS monitoring

### State Management
- **React State**: Local component state for UI interactions and game statistics
- **TanStack Query**: Server state management and caching (prepared for future API integration)
- **Custom Hooks**: Reusable logic for mobile detection, toast notifications, and form handling

### Audio System
- **Web Audio API**: Custom SoundManager class for generating procedural sound effects
- **Dynamic Audio**: Mosquito buzzing sounds and interaction feedback using oscillators
- **User Controls**: Audio enable/disable toggle with persistent preferences

### Build System
- **Vite**: Fast development server and build tool with hot module replacement
- **ESBuild**: Production bundling for server-side code
- **TypeScript**: Full type safety across client and server with shared schema types

### Database Schema (Prepared)
- **Drizzle ORM**: Type-safe database interactions with PostgreSQL
- **User Management**: Basic user schema with username/password authentication
- **Migration System**: Database schema versioning and deployment automation

### Development Experience
- **Path Mapping**: Absolute imports with @ aliases for clean module resolution
- **Error Handling**: Runtime error overlay in development with Replit integration
- **Hot Reload**: Instant feedback during development with Vite's HMR

### Deployment Architecture
- **Static Frontend**: Client builds to dist/public for CDN deployment
- **Express Server**: Node.js backend with middleware for API routes and static serving
- **Environment Management**: DATABASE_URL configuration for PostgreSQL connection
- **Production Optimization**: Separate build processes for client and server code

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Icon library for consistent visual elements
- **class-variance-authority**: Type-safe component variant management

### Database and ORM
- **Drizzle ORM**: Type-safe database queries and schema management
- **Neon Database**: Serverless PostgreSQL database provider (@neondatabase/serverless)
- **PostgreSQL**: Production database with connection pooling support

### Development Tools
- **Vite**: Frontend build tool with plugin ecosystem
- **TypeScript**: Static type checking and development experience
- **ESLint/Prettier**: Code formatting and linting (configured via Vite)

### Runtime Libraries
- **React Router (Wouter)**: Lightweight client-side routing
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form validation and submission handling
- **Date-fns**: Date manipulation and formatting utilities

### Canvas and Animation
- **HTML5 Canvas API**: Direct browser graphics rendering
- **RequestAnimationFrame**: Smooth 60fps animation loops
- **Web Audio API**: Procedural sound generation and playback

### Server Infrastructure
- **Express.js**: Web application framework with middleware support
- **Connect-pg-simple**: PostgreSQL session store for Express
- **Compression and Security**: Production middleware for optimization