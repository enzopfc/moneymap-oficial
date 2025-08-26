# 🚀 MoneyMapp - Setup Rápido

## 📋 Pré-requisitos

- **Node.js 20+** 
- **PNPM 9+**
- **Docker & Docker Compose** (para infra local)

## ⚡ Setup em 3 Passos

### 1. **Clone e Instale**
```bash
git clone https://github.com/enzopfc/moneymap-oficial.git
cd moneymap-oficial
pnpm install
```

### 2. **Configure Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite as variáveis se necessário (valores padrão funcionam para dev)
# Para desenvolvimento local, as configurações padrão estão OK
```

### 3. **Inicie Tudo**
```bash
# Comando mágico - sobe infra + instala + roda aplicação
pnpm setup:dev

# OU manualmente:
pnpm docker:up     # PostgreSQL + Redis + Mailhog
pnpm db:push       # Aplica schema do banco
pnpm dev           # Inicia apps
```

## 🌐 URLs de Desenvolvimento

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3333
- **API Docs**: http://localhost:3333/docs
- **Health Check**: http://localhost:3000/health
- **Storybook**: http://localhost:6006 (quando rodando)
- **Mailhog UI**: http://localhost:8025 (emails de desenvolvimento)

## 📦 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Inicia todos os apps
pnpm storybook        # Inicia design system

# Database
pnpm db:push          # Aplica schema (desenvolvimento)
pnpm db:migrate       # Roda migrações (produção)
pnpm db:seed          # Popular dados de teste

# Docker
pnpm docker:up        # Sobe PostgreSQL, Redis e Mailhog
pnpm docker:down      # Para serviços
pnpm docker:logs      # Ver logs dos containers
pnpm docker:clean     # Para e remove volumes

# Qualidade
pnpm lint             # Linting
pnpm typecheck        # Verificação de tipos
pnpm test             # Testes unitários
pnpm test:e2e         # Testes E2E

# Utilidades
pnpm health           # Testa conectividade da API
pnpm clean            # Limpa builds
pnpm install:clean    # Reinstala dependências do zero
```

## 🐳 Serviços Docker

O `docker-compose.dev.yml` inclui:

- **PostgreSQL 15** na porta 5432
- **Redis 7** na porta 6379  
- **Mailhog** nas portas 1025 (SMTP) e 8025 (Web UI)

## 🔧 Troubleshooting

### Porta já está em uso
```bash
# Se alguma porta estiver ocupada, mate os processos:
npx kill-port 3000 3333 3001 6006

# Ou mude a porta no .env.local:
PORT=3334  # para API
```

### Problemas com banco
```bash
# Recrie o banco:
pnpm docker:clean
pnpm docker:up
pnpm db:push
```

### Problemas com dependências
```bash
# Reinstalação limpa:
pnpm install:clean
```

### API não conecta
```bash
# Verifique se os serviços estão rodando:
pnpm health

# Verifique logs:
pnpm docker:logs
```

## 📝 Desenvolvimento

### Estrutura do Monorepo
- `apps/web/` - Frontend Next.js
- `apps/api/` - Backend Fastify  
- `packages/ui/` - Design system
- `packages/types/` - Types compartilhados

### Workflow Recomendado
1. **Frontend**: Abra http://localhost:3000
2. **API**: Teste endpoints em http://localhost:3333/docs
3. **Components**: Desenvolva no Storybook (http://localhost:6006)
4. **E-mail**: Visualize em http://localhost:8025

### Próximos Passos
1. Implemente autenticação (`apps/api/src/routes/auth/`)
2. Conecte páginas com a API (React Query)
3. Complete o design system (`packages/ui/`)
4. Adicione testes

---

**🎯 Tudo funcionando? Comece desenvolvendo em http://localhost:3000**
