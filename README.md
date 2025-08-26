# MoneyMapp

Uma aplicação completa para gestão financeira pessoal, construída com Next.js, React, TypeScript e Node.js.

## 🚀 Features

- **Transações**: Controle completo de receitas e despesas
- **Importação**: Suporte a CSV/OFX com deduplicação automática
- **Orçamento**: Planejamento e acompanhamento de gastos por categoria
- **Metas**: Simuladores para objetivos financeiros
- **Dívidas**: Estratégias bola de neve e avalanche
- **Relatórios**: Dashboards e exportação PDF/CSV
- **Educação**: Conteúdos e calculadoras financeiras
- **Notificações**: Alertas inteligentes por e-mail e in-app

## 🏗️ Arquitetura

Este é um monorepo organizado com:

### Apps
- `apps/web`: Frontend Next.js com App Router
- `apps/api`: Backend Fastify com Prisma

### Packages
- `packages/ui`: Design system com Storybook
- `packages/types`: Tipos e schemas Zod compartilhados
- `packages/config`: Configurações compartilhadas
- `packages/eslint`: Regras de lint personalizadas

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: App Router, Server Components
- **React 18**: Hooks, Context, Suspense
- **TypeScript**: Tipagem estrita
- **Tailwind CSS**: Styling utility-first
- **shadcn/ui**: Componentes base
- **Framer Motion**: Animações
- **React Hook Form + Zod**: Formulários
- **TanStack Query**: State management
- **Recharts**: Visualização de dados

### Backend
- **Node.js**: Runtime
- **Fastify**: Web framework
- **Prisma**: ORM e migrações
- **PostgreSQL**: Database
- **Redis**: Cache e filas
- **JWT**: Autenticação
- **Zod**: Validação

### DevOps & Quality
- **Turborepo**: Monorepo management
- **PNPM**: Package manager
- **Vitest**: Unit testing
- **Playwright**: E2E testing
- **ESLint + Prettier**: Code quality
- **Husky**: Git hooks
- **GitHub Actions**: CI/CD

## 📋 Pré-requisitos

- Node.js 20+
- PNPM 9+
- PostgreSQL 14+
- Redis 6+

## 🚀 Quick Start

1. **Clone e instale dependências:**
```bash
git clone <repository>
cd moneymap
pnpm install
```

2. **Configure o ambiente:**
```bash
# Database
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Ajuste as variáveis no .env
```

3. **Setup do database:**
```bash
pnpm db:push
pnpm db:seed
```

4. **Inicie o desenvolvimento:**
```bash
pnpm dev
```

Acesse:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3333
- **API Docs**: http://localhost:3333/docs

## 📦 Scripts Principais

```bash
# Desenvolvimento
pnpm dev          # Inicia todos os apps
pnpm build        # Build de produção
pnpm test         # Executa todos os testes
pnpm test:e2e     # Testes end-to-end
pnpm lint         # Verifica código
pnpm typecheck    # Verifica tipagem

# Database
pnpm db:push      # Push schema para DB
pnpm db:migrate   # Executa migrações
pnpm db:seed      # Popula dados iniciais
pnpm db:studio    # Interface do Prisma

# Específicos
pnpm storybook    # Design system
```

## 🗃️ Estrutura do Projeto

```
moneymap/
├── apps/
│   ├── web/                 # Next.js app
│   │   ├── src/app/         # App router pages
│   │   ├── src/components/  # React components
│   │   ├── src/hooks/       # Custom hooks
│   │   └── src/lib/         # Utilities
│   └── api/                 # Fastify API
│       ├── src/routes/      # API routes
│       ├── src/services/    # Business logic
│       └── src/lib/         # Shared utilities
├── packages/
│   ├── ui/                  # Design system
│   │   ├── src/components/  # Reusable components
│   │   └── stories/         # Storybook stories
│   ├── types/               # Shared types
│   ├── config/              # Shared configs
│   └── eslint/              # Lint rules
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # DB migrations
└── .github/
    └── workflows/           # CI/CD pipelines
```

## 🧪 Testing

### Estratégia TDD
1. Escrever testes antes da implementação
2. Vermelho → Verde → Refatoração
3. Cobertura ≥ 80% em módulos críticos

### Tipos de Teste
- **Unit**: `vitest` para lógica de negócio
- **Integration**: APIs e database
- **E2E**: `playwright` para fluxos completos
- **Visual**: `storybook` para componentes

## 🔒 Segurança

- **OWASP ASVS**: Checklist de segurança
- **Rate Limiting**: Proteção contra abuse
- **CSRF Protection**: Rotas sensíveis
- **JWT**: Autenticação stateless
- **Validation**: Zod em todas as boundaries
- **LGPD**: Privacy by design

## 🎨 Design System

O design system está no `packages/ui` com:
- Componentes base (shadcn/ui)
- Tokens de design (cores, tipografia, spacing)
- Dark mode support
- Acessibilidade WCAG 2.1 AA
- Documentação no Storybook

## 📊 Observabilidade

- **Logs**: Pino (JSON structured)
- **Metrics**: Prometheus format
- **Tracing**: OpenTelemetry
- **Errors**: Sentry integration
- **Health checks**: /health endpoint

## 🚀 Deploy

### Staging/Produção
1. **Build**: `pnpm build`
2. **Tests**: `pnpm test && pnpm test:e2e`
3. **Database**: `pnpm db:deploy`
4. **Deploy**: Apps podem ser deployadas separadamente

### Ambientes
- **Development**: localhost
- **Staging**: ambiente de homologação
- **Production**: ambiente final

## 📝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Convenções
- **Commits**: Conventional Commits
- **Branches**: `feat/`, `fix/`, `chore/`
- **Code Style**: ESLint + Prettier
- **Tests**: TDD approach

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Turborepo](https://turbo.build/)

---

**MoneyMapp** - Transformando a gestão financeira pessoal 💰
