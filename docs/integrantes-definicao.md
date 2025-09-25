# Definição de Integrantes - TCC MoneyMapp
**✅ EQUIPE DEFINIDA - Estudantes de Técnico em TI**

---

## 👥 **Integrantes do Grupo**

### **João - Backend** ✅ *LÍDER TÉCNICO*
**Tecnologias:** Node.js, Fastify, TypeScript, Prisma, PostgreSQL
**Experiência:** Técnico em TI (em andamento)
**Status:** Implementação em andamento (60% Etapa 1 concluída)

**Responsabilidades:**
- ✅ API REST completa com autenticação JWT
- ✅ Regras de negócio e validações  
- ✅ Middleware de segurança (CORS, Rate Limiting)
- ✅ Documentação técnica (OpenAPI/Swagger)
- ✅ Testes unitários e integração
- ✅ Deploy e CI/CD

**Entregas já realizadas:**
- ✅ Estrutura completa da API
- ✅ Sistema de autenticação JWT funcionando
- ✅ Schemas de validação com Zod
- ✅ Documentação Swagger em /docs

---

### **Enzo - Frontend** 🎨 *INTERFACE E EXPERIÊNCIA*
**Tecnologias:** Next.js, React, TypeScript, Tailwind CSS
**Experiência:** Técnico em TI (em andamento)
**Status:** Estrutura criada, aguardando desenvolvimento

**Responsabilidades:**
- [ ] Interface de usuário completa e responsiva
- [ ] Dashboard financeiro com gráficos e métricas
- [ ] Formulários de cadastro e transações
- [ ] Integração com API REST do João
- [ ] Componentes reutilizáveis (Design System)
- [ ] Experiência do usuário (UX/UI)

**Entregas esperadas:**
- [ ] **Páginas principais:** Login, Cadastro, Dashboard
- [ ] **Gestão financeira:** Transações, Categorias, Orçamentos
- [ ] **Visualizações:** Gráficos, relatórios, métricas
- [ ] **Responsividade:** Mobile-first design
- [ ] **Integração:** Consumo completo da API

---

### **Roberto - Banco de Dados** 🗄️ *DADOS E PERSISTÊNCIA*
**Tecnologias:** PostgreSQL, Prisma ORM, SQL, Docker
**Experiência:** Técnico em TI (em andamento)
**Status:** Schema projetado, configuração pendente

**Responsabilidades:**
- [ ] Configuração e administração do PostgreSQL
- [ ] Modelagem de dados e relacionamentos
- [ ] Migrations e seeds do banco
- [ ] Otimização de consultas e índices
- [ ] Backup e segurança dos dados
- [ ] Monitoramento de performance

**Entregas esperadas:**
- [ ] **Configuração:** PostgreSQL local/Docker funcionando
- [ ] **Schema:** Tabelas de users, accounts, transactions, budgets
- [ ] **Dados:** Seeds para desenvolvimento e testes
- [ ] **Performance:** Índices e otimizações
- [ ] **Segurança:** Backup e políticas de acesso

---

## 🎯 **Cronograma Integrado da Equipe**

### **ETAPA 1 - MVP Básico (4-6 semanas)**

#### **Semana 1-2: Fundação**
- **Roberto:** Configurar PostgreSQL e executar migrations do Prisma
- **João:** Implementar CRUD de categorias
- **Enzo:** Começar estrutura do dashboard e componentes básicos

#### **Semana 3-4: Funcionalidades Core**
- **Roberto:** Popular banco com dados seed e otimizar consultas
- **João:** Implementar CRUD de transações com filtros
- **Enzo:** Páginas de login, cadastro e dashboard

#### **Semana 5-6: Integração e Testes**
- **Roberto:** Backup, segurança e monitoramento
- **João:** Sistema de orçamentos e notificações
- **Enzo:** Integração completa com API e responsividade

---

## 🤝 **Dependências Entre Áreas**

### **Roberto → João (Database → Backend)**
- ✅ **Bloqueador:** PostgreSQL configurado
- ⏳ **Aguardando:** Migrations executadas
- 📋 **Próximo:** Seeds para desenvolvimento

### **João → Enzo (Backend → Frontend)**
- ✅ **Disponível:** Autenticação JWT
- ⏳ **Em breve:** CRUD de categorias (dependente do Roberto)
- 📋 **Pendente:** CRUD de transações e orçamentos

### **Todos → Documentação Final**
- Cada um documenta sua área
- Integração para apresentação final
- Manual do usuário (responsabilidade compartilhada)

---

## � **Recursos de Aprendizado para Iniciantes**

### **Para Roberto (Banco de Dados):**
- 📖 [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- 🎥 [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- 🛠️ [Docker para PostgreSQL](https://hub.docker.com/_/postgres)

### **Para Enzo (Frontend):**
- 📖 [Next.js Learn](https://nextjs.org/learn)
- 🎥 [React Basics](https://react.dev/learn)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)

### **Para João (Backend):**
- 📖 [Fastify Documentation](https://www.fastify.io/docs/latest/)
- 🔐 [JWT Authentication](https://jwt.io/introduction)
- 🧪 [Testing with Vitest](https://vitest.dev/guide/)

---

## 🚀 **Próximos Passos Imediatos**

### **1. Roberto - Configurar Banco (URGENTE - BLOQUEADOR)**
```bash
# Instalar PostgreSQL localmente ou via Docker
docker run --name postgres-moneymap -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres

# Executar migrations
cd apps/api
npx prisma migrate dev --name init
npx prisma db seed
```

### **2. João - Aguardar Roberto e implementar Categories**
- Aguardar banco configurado
- Implementar service e controller de categorias
- Testar endpoints com dados reais

### **3. Enzo - Começar com componentes básicos**
- Estudar estrutura Next.js existente
- Implementar componentes de UI (botões, inputs)
- Começar página de login

### **4. Todos - Comunicação diária**
- Daily stand-up (mesmo que por WhatsApp)
- Reportar bloqueadores imediatamente
- Compartilhar progresso e dúvidas

---

**✅ Equipe definida e pronta para colaborar!**