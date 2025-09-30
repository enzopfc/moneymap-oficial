# 🎨 Guia para Enzo - Desenvolvimento Frontend
**Responsável:** Enzo  
**Prioridade:** 🟡 MÉDIA (Aguardando backend do João)  
**Tempo estimado:** 4-5 semanas

---

## 🎯 **Sua Missão, Enzo:**

Você é responsável por criar toda a interface do usuário do MoneyMapp. Vai transformar a API do João em uma aplicação visual bonita e fácil de usar. **Você é a cara do projeto!**

---

## 📋 **Checklist do que você precisa fazer:**

### **✅ ETAPA 1: Preparação e Estudo (Semana 1)**
- [ ] Entender a estrutura Next.js que já existe
- [ ] Estudar os componentes shadcn/ui disponíveis
- [ ] Testar a autenticação que o João já fez
- [ ] Criar mockups simples das páginas principais

### **✅ ETAPA 2: Páginas de Autenticação (Semana 2)**
- [ ] Página de Login funcionando
- [ ] Página de Cadastro funcionando
- [ ] Integração com JWT do João
- [ ] Redirecionamentos corretos

### **✅ ETAPA 3: Dashboard Principal (Semana 3-4)**
- [ ] Layout do dashboard com sidebar
- [ ] Resumo financeiro (saldo, receitas, despesas)
- [ ] Gráficos básicos
- [ ] Lista de transações recentes

### **✅ ETAPA 4: Gestão Financeira (Semana 5)**
- [ ] Páginas de Transações com filtros
- [ ] Páginas de Categorias
- [ ] Páginas de Orçamentos
- [ ] Responsividade mobile

---

## 🚀 **Como Começar (HOJE MESMO!)**

### **1. Entender o que já existe**
```bash
# Abrir o projeto
cd c:\Users\Debora\Documents\moneymap-oficial

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

### **2. Testar no navegador**
- Frontend: http://localhost:3000
- Backend: http://localhost:3333/docs (Swagger da API do João)

### **3. Explorar a estrutura atual**
```
apps/web/src/
├── app/                    # Páginas Next.js 14
│   ├── page.tsx           # Página inicial
│   ├── dashboard/         # Área logada (já existe!)
│   └── auth/              # Login e cadastro (já existe!)
├── components/            # Componentes reutilizáveis
│   ├── ui/                # Componentes shadcn/ui
│   └── dashboard-layout.tsx # Layout principal
└── lib/                   # Utilitários
```

---

## 🎨 **PRIORIDADE 1: Páginas de Login e Cadastro**

### **O que você precisa fazer:**

#### **1. Página de Login (`apps/web/src/app/auth/login/page.tsx`)**
```typescript
// Exemplo do que implementar:
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1>Entrar no MoneyMapp</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <Input 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

#### **2. Integração com API do João**
```typescript
// Função para fazer login
async function login(email: string, password: string) {
  const response = await fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  const data = await response.json()
  
  if (data.token) {
    // Salvar token no localStorage
    localStorage.setItem('token', data.token)
    // Redirecionar para dashboard
    router.push('/dashboard')
  }
}
```

---

## 🏠 **PRIORIDADE 2: Dashboard Principal**

### **Layout que você precisa criar:**

```
┌─────────────────────────────────────────┐
│ [Logo] MoneyMapp              [Profile] │ ← Header
├─────────────────────────────────────────┤
│ [Sidebar]  │ [Main Content]             │
│ • Dashboard│ ┌─────────────────────────┐ │
│ • Trans.   │ │ Resumo Financeiro       │ │
│ • Categ.   │ │ Saldo: R$ 1.234,56     │ │
│ • Orçam.   │ │ Receitas: R$ 2.000     │ │
│ • Metas    │ │ Despesas: R$ 765,44    │ │
│            │ └─────────────────────────┘ │
│            │ ┌─────────────────────────┐ │
│            │ │ Gráfico de Gastos       │ │
│            │ │     [Gráfico Pizza]     │ │
│            │ └─────────────────────────┘ │
│            │ ┌─────────────────────────┐ │
│            │ │ Transações Recentes     │ │
│            │ │ • Mercado -R$ 85,30    │ │
│            │ │ • Salário +R$ 2.000    │ │
│            │ └─────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **Componentes que precisa criar:**

#### **1. DashboardHeader.tsx**
```typescript
export function DashboardHeader() {
  return (
    <header className="border-b bg-white p-4">
      <div className="flex justify-between items-center">
        <Logo />
        <UserMenu />
      </div>
    </header>
  )
}
```

#### **2. FinancialSummary.tsx**
```typescript
export function FinancialSummary() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent>
          <h3>Saldo Atual</h3>
          <p className="text-2xl font-bold text-green-600">
            R$ 1.234,56
          </p>
        </CardContent>
      </Card>
      {/* Receitas e Despesas similares */}
    </div>
  )
}
```

---

## 📱 **Responsividade (IMPORTANTE!)**

### **Design Mobile-First:**
```css
/* Exemplo de CSS responsivo */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;        /* Mobile: 1 coluna */
  gap: 1rem;
}

@media (md) {
  .dashboard-grid {
    grid-template-columns: 250px 1fr; /* Desktop: sidebar + conteúdo */
  }
}
```

---

## 🎯 **Integração com API do João**

### **Dados que você vai receber da API:**

#### **1. Usuário logado (GET /users/me)**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### **2. Transações (GET /transactions)**
```json
{
  "data": [
    {
      "id": "uuid",
      "description": "Supermercado",
      "amount": -85.30,
      "date": "2024-01-15",
      "category": "Alimentação"
    }
  ],
  "total": 150,
  "page": 1
}
```

### **Como fazer requisições autenticadas:**
```typescript
// Hook personalizado para API
function useApi() {
  const token = localStorage.getItem('token')
  
  const api = {
    get: (url: string) => 
      fetch(`http://localhost:3333${url}`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      }),
    
    post: (url: string, data: any) =>
      fetch(`http://localhost:3333${url}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      })
  }
  
  return api
}
```

---

## 🆘 **Problemas Comuns e Soluções**

### **❌ "CORS Error"**
```typescript
// O João já configurou CORS, mas se der erro:
// Verificar se a API está rodando em localhost:3333
```

### **❌ "Component not found"**
```bash
# Instalar componente shadcn/ui que está faltando:
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

### **❌ "Token expired"**
```typescript
// Implementar renovação automática:
if (response.status === 401) {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
```

---

## 📚 **Recursos para Aprender**

### **Next.js (Essencial):**
- [Next.js Learn](https://nextjs.org/learn) - Tutorial oficial
- [App Router](https://nextjs.org/docs/app) - Nova arquitetura

### **React Hooks:**
- [React Hooks](https://react.dev/reference/react) - useState, useEffect
- [SWR](https://swr.vercel.app/) - Para buscar dados da API

### **Tailwind CSS:**
- [Tailwind Docs](https://tailwindcss.com/docs) - Classes CSS
- [Tailwind UI](https://tailwindui.com/components) - Exemplos

### **shadcn/ui:**
- [shadcn/ui](https://ui.shadcn.com/) - Componentes prontos
- [Storybook](http://localhost:6006) - Componentes existentes

---

## ⏰ **Cronograma Sugerido**

### **Semana 1: Preparação**
- Estudar Next.js e estrutura atual
- Implementar páginas de login/cadastro básicas
- Testar integração com API do João

### **Semana 2: Autenticação**
- Login/cadastro funcionando 100%
- Proteção de rotas privadas
- Gerenciamento de estado do usuário

### **Semana 3: Dashboard**
- Layout principal com sidebar
- Resumo financeiro (mesmo com dados fake)
- Navegação entre páginas

### **Semana 4: Páginas principais**
- Lista de transações
- Formulários de cadastro
- Filtros e busca

### **Semana 5: Polimento**
- Responsividade mobile
- Loading states
- Tratamento de erros

---

## 🤝 **Comunicação com a Equipe**

### **Quando avisar o João:**
- ❓ Dúvidas sobre formato dos dados da API
- 🐛 Erros de CORS ou autenticação
- 💡 Sugestões de melhorias na API

### **Quando avisar o Roberto:**
- 🔍 Precisar de dados específicos para testar
- 📊 Dados para gráficos e relatórios

### **O que compartilhar no grupo:**
- 📸 Screenshots do progresso
- 🌐 Links para páginas funcionando
- ❓ Dúvidas sobre UX/design

---

## 🎨 **Dicas de Design**

### **Cores sugeridas (MoneyMapp):**
```css
:root {
  --primary: #22c55e;      /* Verde para receitas */
  --danger: #ef4444;       /* Vermelho para despesas */
  --secondary: #6b7280;    /* Cinza para neutro */
  --background: #f8fafc;   /* Fundo claro */
}
```

### **Ícones:**
- Use [Lucide Icons](https://lucide.dev/) (já incluído)
- Ícones sugeridos: Wallet, TrendingUp, TrendingDown, PieChart

---

**🎯 Enzo, você é o responsável por fazer o projeto ficar bonito e fácil de usar! 🚀**

**Comece com login/cadastro e depois evolua para o dashboard. Não tente fazer tudo de uma vez!**

**Em caso de dúvidas, chame João ou Roberto - somos uma equipe! 💪**