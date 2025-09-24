# 🔐 API de Autenticação - MoneyMap Backend

## Endpoints Disponíveis

### 1. Registrar Usuário
**POST** `/auth/register`

**Descrição**: Cria uma nova conta de usuário

**Body (JSON)**:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta de Sucesso (201)**:
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-09-18T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respostas de Erro**:
- `400`: Campos obrigatórios faltando ou usuário já existe
- `500`: Erro interno do servidor

---

### 2. Login
**POST** `/auth/login`

**Descrição**: Autentica um usuário existente

**Body (JSON)**:
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-09-18T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respostas de Erro**:
- `400`: Campos obrigatórios faltando
- `401`: Credenciais inválidas
- `500`: Erro interno do servidor

---

### 3. Perfil do Usuário
**GET** `/auth/profile`

**Descrição**: Obtém informações do usuário logado (rota protegida)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso (200)**:
```json
{
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-09-18T10:30:00.000Z"
  }
}
```

**Respostas de Erro**:
- `401`: Token não fornecido ou inválido
- `404`: Usuário não encontrado
- `500`: Erro interno do servidor

---

## 🔧 Como Testar

### 1. Iniciar o servidor
```bash
cd backend
npm start
```

### 2. Testar com curl

**Registrar usuário**:
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","senha":"123456"}'
```

**Fazer login**:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"123456"}'
```

**Acessar perfil** (substitua YOUR_TOKEN pelo token recebido):
```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 Notas Importantes

- **Armazenamento**: Atualmente usando array em memória (dados perdidos ao reiniciar)
- **JWT Secret**: Usando chave padrão (configurar via .env em produção)
- **Expiração**: Tokens válidos por 7 dias
- **Segurança**: Senhas criptografadas com bcrypt (salt rounds: 10)

## 🚀 Próximos Passos

Para integração com banco de dados:
1. Conectar com Prisma/PostgreSQL existente
2. Substituir array `users` por queries do banco
3. Configurar variáveis de ambiente (.env)
4. Implementar refresh tokens
5. Adicionar validação de dados mais robusta