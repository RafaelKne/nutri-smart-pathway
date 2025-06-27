# NutriPlan - Nutrition Planning Platform

## Overview

NutriPlan is a full-stack nutrition planning application built with React, Express, and PostgreSQL. The application helps users create personalized meal plans, track their nutritional intake, and monitor their fitness goals. It features a modern UI built with shadcn/ui components and Tailwind CSS, with multilingual support and dark mode functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence for authentication and meal data
- **Routing**: React Router for client-side navigation
- **Data Fetching**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful API with `/api` prefix

### Design System
- **Theme**: Custom health-focused color palette with green primary colors
- **Dark Mode**: CSS variables-based theming system
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Components**: Comprehensive UI component library with consistent styling

## Key Components

### Authentication System
- **Local Storage**: User credentials stored in browser localStorage via Zustand persist
- **User Management**: In-memory user storage with profile support
- **Password Recovery**: Email-based password reset flow
- **Profile Management**: Comprehensive user profiles with health metrics

### Meal Planning Engine
- **Algorithm**: BMR/TDEE calculations using Harris-Benedict formula
- **Meal Generation**: Smart meal plan generation based on user preferences
- **Dietary Preferences**: Support for various dietary restrictions (vegetarian, vegan, etc.)
- **Meal Substitution**: Dynamic meal replacement with alternative options
- **Tracking**: Meal consumption tracking with nutritional summaries

### User Profile System
- **Health Metrics**: Weight, height, age, activity level tracking
- **Goal Setting**: Weight loss, muscle gain, or maintenance goals
- **Calorie Calculation**: Automatic daily calorie and macro calculation
- **Water Tracking**: Daily water consumption monitoring

### Data Storage
- **Meal Database**: Extensive meal library with categorized options
  - Default meals for general users
  - Vegetarian and vegan meal options
  - Basic meals for simple preferences
  - Alternative meals for substitutions
- **User Profiles**: Comprehensive health and preference data
- **Session Management**: Persistent user sessions

## Data Flow

1. **User Registration/Login**: Users authenticate and their data is stored locally
2. **Profile Setup**: Users input health metrics and dietary preferences
3. **Meal Plan Generation**: System calculates nutritional needs and generates personalized meal plans
4. **Daily Tracking**: Users mark meals as consumed and track water intake
5. **Plan Adjustment**: Users can generate new plans or substitute individual meals
6. **Settings Management**: Users can update preferences and regenerate plans accordingly

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **zustand**: Lightweight state management
- **react-router-dom**: Client-side routing
- **react-hook-form**: Form handling and validation
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for component variants
- **clsx**: Conditional className utility
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with HMR
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: DATABASE_URL for database connection
- **Port Configuration**: Express server with Vite middleware integration

### Production Build
- **Frontend**: Vite build with optimized bundles
- **Backend**: esbuild compilation of TypeScript server code
- **Database Migration**: Drizzle Kit for schema management
- **Static Assets**: Served through Express in production

### Database Schema
- **Users Table**: Core user information with authentication
- **PostgreSQL**: Relational database with proper indexing
- **Migrations**: Version-controlled schema changes via Drizzle

## Changelog
- June 27, 2025. Initial setup
- June 27, 2025. Fixed meal generation for 5 meals per day - resolved string/number type conversion issue and added missing "Lanche da Manhã" meal options for all dietary preferences

## User Preferences

Preferred communication style: Simple, everyday language.