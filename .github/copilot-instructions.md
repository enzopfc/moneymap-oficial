# MoneyMapp Development Instructions

MoneyMapp é uma aplicação completa de gestão financeira pessoal construída com:

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Fastify, Prisma, PostgreSQL, Redis
- **Monorepo**: PNPM Workspaces + Turborepo
- **Testing**: Vitest, Playwright (TDD approach)
- **Observability**: OpenTelemetry, Sentry, Pino

## Architecture

- `apps/web`: Next.js frontend application
- `apps/api`: Fastify backend API
- `packages/ui`: Design system with Storybook
- `packages/types`: Shared TypeScript types and Zod schemas
- `packages/config`: Shared configuration files
- `packages/eslint`: ESLint configuration

## Development Principles

1. **TDD**: Write tests before implementation
2. **Type Safety**: Strict TypeScript with Zod validation
3. **Security**: OWASP ASVS compliance, rate limiting, CSRF protection
4. **Accessibility**: WCAG 2.1 AA compliance
5. **LGPD**: Privacy by design with data minimization

## Key Features

- Transaction management with CSV/OFX import
- Budget planning and tracking
- Financial goals and debt management
- Comprehensive reporting with export
- Financial education content
- Real-time notifications

## Progress

✅ Project requirements clarified
✅ Monorepo structure scaffolded with Turborepo + PNPM
✅ Base configurations created (TypeScript, ESLint, Prettier, Tailwind)
✅ Package structure defined (ui, types, config, eslint)
✅ Apps structure created (web with Next.js, api with Fastify)
✅ Database schema designed with Prisma
✅ Dependencies installed successfully
✅ Environment configuration set up
✅ Basic API routes and plugins configured
✅ Development workflow operational

## Current Status

The MoneyMapp monorepo is successfully scaffolded and ready for development:

- ⚡ **Turbo build system** configured and working
- 📦 **PNPM workspaces** managing dependencies
- 🎯 **TypeScript strict mode** enabled across all packages
- 🎨 **Design system foundation** with shadcn/ui components
- 🔧 **Development servers** can be started with `pnpm dev`
- 🗄️ **Database schema** designed following specification
- 🔒 **Security plugins** configured (CORS, Helmet, Rate Limiting)
- 📝 **API documentation** available at /docs endpoint

## Next Implementation Steps

Following the specified execution order:

1. **Database Setup**: Configure PostgreSQL and run Prisma migrations
2. **Authentication**: Implement JWT auth with NextAuth.js integration  
3. **Core API Routes**: Build transaction, category, and account endpoints with TDD
4. **UI Components**: Complete the design system with Storybook documentation
5. **Frontend Pages**: Implement dashboard, transaction management, and forms
6. **File Import System**: Build CSV/OFX parser with deduplication
7. **Budget & Goals**: Implement financial planning features
8. **Reporting System**: Create analytics and export functionality
9. **Testing Suite**: Comprehensive unit, integration, and E2E tests
10. **Observability**: Add monitoring, logging, and error tracking

## Ready to Continue

The foundation is solid and follows all architectural decisions from the specification. The project is ready for iterative development using TDD methodology.