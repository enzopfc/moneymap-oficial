# 🗄️ Guia para Roberto - Configuração do Banco de Dados
**Responsável:** Roberto  
**Prioridade:** 🔴 CRÍTICA (Bloqueador para João e Enzo)  
**Tempo estimado:** 2-3 dias

---

## 🎯 **Sua Missão, Roberto:**

Você é responsável por configurar e gerenciar todo o banco de dados do MoneyMapp. Sem o banco funcionando, nem o João pode continuar a API, nem o Enzo pode testar o frontend. **Você é peça fundamental!**

---

## 📋 **Checklist do que você precisa fazer:**

### **✅ ETAPA 1: Instalar PostgreSQL**
- [ ] Escolher entre instalação local ou Docker
- [ ] Configurar usuário e senha
- [ ] Testar conexão básica
- [ ] Anotar dados de conexão (host, porta, user, password)

### **✅ ETAPA 2: Configurar Prisma**
- [ ] Executar migrations para criar tabelas
- [ ] Verificar se todas as tabelas foram criadas
- [ ] Popular com dados iniciais (seed)
- [ ] Testar consultas básicas

### **✅ ETAPA 3: Validar com a equipe**
- [ ] Confirmar que João consegue conectar da API
- [ ] Testar endpoints de autenticação com dados reais
- [ ] Documentar credenciais para a equipe

---

## 🐘 **OPÇÃO 1: PostgreSQL com Docker (RECOMENDADO)**

### **Por que Docker?**
- ✅ Mais fácil de instalar
- ✅ Não "suja" seu Windows
- ✅ Mesmo ambiente para toda equipe
- ✅ Fácil de resetar se algo der errado

### **Passo a passo:**

#### **1. Instalar Docker Desktop**
```bash
# Baixe e instale o Docker Desktop para Windows
# https://www.docker.com/products/docker-desktop/
```

#### **2. Criar container PostgreSQL**
```bash
# Abrir PowerShell/CMD e executar:
docker run --name postgres-moneymap ^
  -e POSTGRES_USER=moneymap ^
  -e POSTGRES_PASSWORD=123456 ^
  -e POSTGRES_DB=moneymap ^
  -p 5432:5432 ^
  -d postgres:15

# Verificar se está rodando:
docker ps
```

#### **3. Testar conexão**
```bash
# Entrar no container para testar:
docker exec -it postgres-moneymap psql -U moneymap -d moneymap

# Dentro do PostgreSQL, testar:
\l                    # Listar databases
\dt                   # Listar tabelas (vai estar vazio ainda)
\q                    # Sair
```

---

## 🖥️ **OPÇÃO 2: PostgreSQL Instalação Local**

### **Se preferir instalar direto no Windows:**

#### **1. Download e Instalação**
- Baixar: https://www.postgresql.org/download/windows/
- Instalar com usuário `postgres` e senha `123456`
- Anotar a porta (padrão: 5432)

#### **2. Criar Database**
```sql
-- Abrir pgAdmin ou psql e executar:
CREATE USER moneymap WITH PASSWORD '123456';
CREATE DATABASE moneymap OWNER moneymap;
GRANT ALL PRIVILEGES ON DATABASE moneymap TO moneymap;
```

---

## 🔧 **ETAPA 2: Configurar Prisma (OBRIGATÓRIO)**

### **1. Configurar variáveis de ambiente**
```bash
# No arquivo apps/api/.env, adicionar:
DATABASE_URL="postgresql://moneymap:123456@localhost:5432/moneymap"
```

### **2. Executar migrations**
```bash
# Navegar para pasta da API
cd c:\Users\Debora\Documents\moneymap-oficial\apps\api

# Executar migrations (criar tabelas)
npx prisma migrate dev --name init

# Gerar cliente Prisma
npx prisma generate
```

### **3. Popular com dados iniciais**
```bash
# Executar seed (dados de exemplo)
npx prisma db seed
```

### **4. Verificar se funcionou**
```bash
# Visualizar banco no navegador
npx prisma studio
# Vai abrir http://localhost:5555
```

---

## 📊 **ETAPA 3: Validar Schema**

### **Tabelas que devem existir após migrations:**

1. **User** - Usuários do sistema
2. **Account** - Contas bancárias
3. **Category** - Categorias de transações
4. **Transaction** - Transações financeiras
5. **Budget** - Orçamentos mensais
6. **Goal** - Metas financeiras

### **Como verificar:**
```sql
-- No psql ou pgAdmin:
\dt                     # Listar todas as tabelas
SELECT * FROM "User";   # Ver usuários
SELECT * FROM "Category"; # Ver categorias
```

---

## 🆘 **Problemas Comuns e Soluções**

### **❌ "Prisma schema file is corrupted"**
```bash
# Fazer backup e recriar:
cd prisma
copy schema.prisma schema.prisma.backup
# Recriar schema limpo baseado no original
```

### **❌ "Connection refused"**
```bash
# Verificar se PostgreSQL está rodando:
docker ps                    # Para Docker
netstat -an | findstr 5432  # Para instalação local
```

### **❌ "Migration failed"**
```bash
# Resetar database:
npx prisma migrate reset
npx prisma migrate dev --name init
```

### **❌ "Permission denied"**
```bash
# Verificar usuário e permissões:
GRANT ALL PRIVILEGES ON DATABASE moneymap TO moneymap;
```

---

## 📞 **Comunicação com a Equipe**

### **Quando avisar o João:**
- ✅ PostgreSQL instalado e rodando
- ✅ Migrations executadas com sucesso  
- ✅ Dados seed populados
- ✅ Prisma Studio abrindo corretamente

### **Informações para compartilhar:**
```
🎉 BANCO CONFIGURADO!

Conexão:
- Host: localhost
- Porta: 5432
- Database: moneymap
- User: moneymap
- Password: 123456

DATABASE_URL="postgresql://moneymap:123456@localhost:5432/moneymap"

✅ Tabelas criadas: User, Account, Category, Transaction, Budget, Goal
✅ Dados seed populados
✅ Prisma Studio funcionando em http://localhost:5555

João, pode conectar a API! 🚀
```

---

## 🎓 **Recursos para Aprender**

### **PostgreSQL Básico:**
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [W3Schools SQL](https://www.w3schools.com/sql/)

### **Prisma ORM:**
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### **Docker (se escolher essa opção):**
- [Docker Getting Started](https://docs.docker.com/get-started/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

---

## ⏰ **Cronograma Sugerido**

### **Dia 1: Instalação**
- Instalar PostgreSQL (Docker ou local)
- Testar conexão básica
- Configurar .env

### **Dia 2: Prisma**
- Executar migrations
- Popular dados seed
- Testar Prisma Studio

### **Dia 3: Validação**
- Testar com João
- Resolver problemas
- Documentar para equipe

---

**🎯 Roberto, você consegue! É mais simples do que parece, e com PostgreSQL funcionando, o projeto todo decola! 🚀**

**Em caso de dúvidas, chame João imediatamente - não fique travado!**